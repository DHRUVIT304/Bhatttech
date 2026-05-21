const emailJsConfig = {
  publicKey: "qO1nVKI9_kb4fUBFi",
  serviceId: "dhruvitpatel.com",
  templateId: "template_34bijjd"
};

const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#contact-form-status");
const inquiryEmail = "sarthaksalot@gmail.com";

function setFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

function buildInquiryMailLink(form) {
  const formData = new FormData(form);
  const senderName = formData.get("from_name");
  const senderEmail = formData.get("reply_to");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const mailSubject = `Bhatttech inquiry: ${subject}`;
  const mailBody = [
    "New inquiry from Bhatttech website",
    "",
    `Name: ${senderName}`,
    `Email: ${senderEmail}`,
    `Phone: ${phone}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message
  ].join("\n");

  return `mailto:${inquiryEmail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
}

if (contactForm && formStatus) {
  emailjs.init({ publicKey: emailJsConfig.publicKey });

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".send-btn");
    const fallbackMailLink = buildInquiryMailLink(contactForm);
    submitButton.disabled = true;
    setFormStatus("Sending your inquiry...", "");

    try {
      await emailjs.sendForm(emailJsConfig.serviceId, emailJsConfig.templateId, contactForm);
      contactForm.reset();
      setFormStatus("Your inquiry has been sent successfully.", "success");
    } catch (error) {
      console.error("EmailJS inquiry failed:", error);
      setFormStatus("Direct send failed. Opening your email app with the inquiry details.", "error");
      window.location.href = fallbackMailLink;
    } finally {
      submitButton.disabled = false;
    }
  });
}
