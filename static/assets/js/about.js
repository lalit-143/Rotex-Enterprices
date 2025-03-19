document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element);
  });

  // Menu toggle functionality
  const menuToggle = document.getElementById("menu-toggle");

  const sections = document.getElementsByTagName("section");
  const mains = document.getElementsByTagName("main");


  menuToggle.addEventListener("click", function () {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");

    mains[0].classList.toggle("bgblur");

    for (i = 0; i < sections.length; i++) {
      sections[i].classList.toggle("bgblur");
    }

    // Change icon based on menu state
    if (navLinks.classList.contains("active")) {
      menuToggle.innerHTML = "✖"; // Change to cross icon
    } else {
      menuToggle.innerHTML = "☰"; // Change back to menu icon
    }
  });
});
