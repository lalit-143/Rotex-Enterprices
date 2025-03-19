document.addEventListener("DOMContentLoaded", function () {
  const enquiryModal = document.getElementById("enquiryModal");
  const thankYouModal = document.getElementById("thankYouModal");
  const snackbar = document.getElementById("snackbar");

  const modalLastShown = localStorage.getItem("modalLastShown");
  const now = new Date().getTime();

  // Open Enquiry Modal
  document.getElementById("showEnquiryBtn").addEventListener("click", function () {
      enquiryModal.style.display = "flex";
      setTimeout(() => enquiryModal.classList.add("show"), 100);
    });

  // Close Enquiry Modal
  document.querySelector(".close-enquiry")
    .addEventListener("click", function () {
      enquiryModal.classList.remove("show");
      setTimeout(() => (enquiryModal.style.display = "none"), 300);
    });

  // Close Enquiry Modal when clicking on the background
  enquiryModal.addEventListener("click", function (event) {
    if (event.target === enquiryModal) {
      enquiryModal.classList.remove("show");
      setTimeout(() => (enquiryModal.style.display = "none"), 300);
    }
  });

  // Handle Form Submission
  document
    .getElementById("enquiryForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!email && !phone) {
        showSnackbar("Please provide either an email or a mobile number.");
        return;
      }

      const submitBtn = document.getElementById("submitEnquiry");
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
            enquiryModal.classList.remove("show");
            setTimeout(() => {
              enquiryModal.style.display = "none";
              thankYouModal.style.display = "flex";
              setTimeout(() => thankYouModal.classList.add("show"), 300);
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
              });
              document.querySelector("canvas").style.zIndex = "999999";
            }, 300);

            setTimeout(() => {
              thankYouModal.classList.remove("show");
              setTimeout(() => (thankYouModal.style.display = "none"), 300);
            }, 3000);

            // Set modalLastShown to 24 hours from now
            localStorage.setItem("modalLastShown", new Date().getTime() + 24 * 60 * 60 * 1000);

            // reset form
            this.reset();
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

  const tenMinutes = 10 * 60 * 1000;
  if (!modalLastShown || now - modalLastShown > tenMinutes) {
    setTimeout(() => {
      enquiryModal.style.display = "flex";
      setTimeout(() => enquiryModal.classList.add("show"), 300);
      localStorage.setItem("modalLastShown", now);
    }, 10000);
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
