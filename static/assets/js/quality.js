document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in, .slide-up").forEach((element) => {
    observer.observe(element);
  });

  // Modal functionality
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementsByClassName("close")[0];

  document.querySelectorAll(".certificate-img").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImage.src = this.src;
    });
  });

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // Menu toggle functionality
  const menuToggle = document.getElementById("menu-toggle");
  const navbg = document.getElementsByTagName("section");
  const mainbg = document.getElementById("mainbg");

  menuToggle.addEventListener("click", function () {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    mainbg.classList.toggle("bgblur");

    for (i = 0; i < navbg.length; i++) {
      navbg[i].classList.toggle("bgblur");
    }

    // Change icon based on menu state
    if (navLinks.classList.contains("active")) {
      menuToggle.innerHTML = "✖"; // Change to cross icon
    } else {
      menuToggle.innerHTML = "☰"; // Change back to menu icon
    }
  });

  // Pdf Modal
  $(".pdf").modaal({
    type: "iframe",
  });
  
});


function smoothScrollTo(elementId, duration) {
  const target = document.getElementById(elementId);
  const targetPosition =
    target.getBoundingClientRect().top + window.pageYOffset - 50;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animation);
}