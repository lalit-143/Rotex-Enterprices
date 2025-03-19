document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitContact");
  const thankYouModal = document.getElementById("thankYouModal");
  const snackbar = document.getElementById("snackbar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Menu toggle functionality
  const menuToggle = document.getElementById("menu-toggle");
  const navbg = document.getElementsByTagName("section");
  const footer = document.getElementById("footerbg");

  menuToggle.addEventListener("click", function () {
    const navLinks = document.getElementById("nav-links");
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
    footer.classList.toggle("bgblur");

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

  // Handle Form Submission
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const name = document.getElementById("name").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!email && !phone) {
        showSnackbar("Please provide either an email or a mobile number.");
        return;
      }

      submitBtn.classList.add("loading");

      // AJAX call to submit the form
      fetch("/enquiry/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": getCookie("csrftoken"),
        },
        body: new URLSearchParams({
          name: name,
          number: phone,
          email: email,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          submitBtn.classList.remove("loading");
          if (data.status === "success") {
            thankYouModal.style.display = "flex";
            setTimeout(() => thankYouModal.classList.add("show"), 300);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            document.querySelector("canvas").style.zIndex = "999999";

            setTimeout(() => {
              thankYouModal.classList.remove("show");
              setTimeout(() => (thankYouModal.style.display = "none"), 300);
            }, 3000);

            document.getElementById("contactForm").reset();
          } else {
            showSnackbar(data.message);
          }
        })
        .catch((error) => {
          submitBtn.classList.remove("loading");
          showSnackbar("An error occurred. Please try again.");
        });
    });

  // Close Thank You Modal when clicking on the background
  thankYouModal.addEventListener("click", function (event) {
    if (event.target === thankYouModal) {
      thankYouModal.classList.remove("show");
      setTimeout(() => (thankYouModal.style.display = "none"), 300);
    }
  });

  // Show Snackbar
  function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.classList.add("show");
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  }

  // Function to get CSRF token
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }
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
