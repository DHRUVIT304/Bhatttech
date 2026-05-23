document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".nav-toggle");
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(function (dropdown) {
    const trigger = dropdown.querySelector(".dropbtn");

    if (!trigger) {
      return;
    }

    trigger.addEventListener("click", function (event) {
      if (window.innerWidth > 900) {
        return;
      }

      event.preventDefault();

      dropdowns.forEach(function (item) {
        if (item !== dropdown) {
          item.classList.remove("open");
        }
      });

      dropdown.classList.toggle("open");
    });
  });

  if (menuToggle) {
    menuToggle.addEventListener("change", function () {
      if (!menuToggle.checked) {
        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("open");
        });
      }
    });
  }
});
