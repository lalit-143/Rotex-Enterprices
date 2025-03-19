const modal = document.getElementById("productModal");
const modalContainer = document.querySelector(".modal-container");

const thankYouModal = document.getElementById("thankYouModal");
const thankYouContent = document.querySelector(".thank-you");

const modalTitle = document.getElementById("modalProductTitle");
const modalImage = document.getElementById("mainProductImage");
const modalDescription = document.getElementById("modalProductDescription");
const modalSpecs = document.getElementById("modalProductSpecs");

let product_id;

function openModal(productId, pid) {
  const productCard = document.getElementById(productId);
  if (productCard) {
    const title = productCard.querySelector(".card-title").textContent;
    const image = productCard.querySelector(".card-img").src;
    const description = productCard.querySelector(".card-text").textContent;
    const specsList = productCard.querySelector(".list-disc").innerHTML;
    product_id = pid;

    modalTitle.textContent = title;
    modalImage.src = image;
    modalDescription.textContent = description;
    modalSpecs.innerHTML = specsList;

    modal.classList.remove("hidden");
    setTimeout(() => modalContainer.classList.add("active"), 10);
  }
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

document.getElementById("closeModal").addEventListener("click", function () {
  modalContainer.classList.remove("active");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 10);
});

// Close modal when clicking outside of it
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    modalContainer.classList.remove("active");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 10);
  }
});

// Dynamically adjust content height on window resize
function adjustModalHeight() {
  if (!modal.classList.contains("hidden")) {
    const modalWrapper = document.querySelector(".modal-wrapper");
    const modalHeader = modalWrapper.querySelector(":scope > div:first-child");
    const modalFooter = modalWrapper.querySelector(":scope > div:last-child");
    const modalBody = document.querySelector(".modal-body");

    const viewportHeight = window.innerHeight;
    const maxModalHeight = viewportHeight * 0.9; // 90% of viewport height
    const headerHeight = modalHeader.offsetHeight;
    const footerHeight = modalFooter.offsetHeight;

    const availableBodyHeight = maxModalHeight - headerHeight - footerHeight;
    modalBody.style.maxHeight = `${availableBodyHeight}px`;
  }
}

// Call on initial load and whenever the window resizes
window.addEventListener("resize", adjustModalHeight);
document.getElementById("openModal").addEventListener("click", function () {
  // Allow a small delay for the modal to become visible
  setTimeout(adjustModalHeight, 50);
});

// Add animation to specification items with staggered delay
document.querySelectorAll(".specs-item").forEach((item, index) => {
  item.style.opacity = "1";
  item.style.transform = "translateX(20px)";

  setTimeout(() => {
    item.style.transition = "all 0.5s ease";
    item.style.opacity = "1";
    item.style.transform = "translateX(0)";
  }, 400 + index * 100);

});

// Function to change main image when clicking on thumbnails

// function changeImage(thumbnailElement, imageUrl) {
//   // Remove border from all thumbnails
//   document.querySelectorAll(".thumbnail").forEach((thumb) => {
//     thumb.classList.remove("border-blue-500");
//     thumb.classList.add("border-gray-200");
//   });

//   // Add border to selected thumbnail
//   thumbnailElement.classList.remove("border-gray-200");
//   thumbnailElement.classList.add("border-blue-500");

//   // Change main image with animation
//   const mainImage = document.getElementById("mainProductImage");
//   mainImage.style.opacity = "0";
//   mainImage.style.transform = "scale(0.95)";

//   setTimeout(() => {
//     mainImage.src = imageUrl;
//     mainImage.style.opacity = "1";
//     mainImage.style.transform = "scale(1)";
//   }, 300);
// }

document
  .getElementById("QuoteForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const contact = document.getElementById("contact").value.trim();
    const productId = product_id;

    const submitBtn = document.getElementById("submitQuote");
    submitBtn.classList.add("loading");

    fetch('/submit-quote/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: new URLSearchParams({
        'contact': contact,
        'product_id': productId
      })
    })
    .then(response => response.json())
    .then(data => {
      submitBtn.classList.remove("loading");

      if (data.status === 'success') {
        modalContainer.classList.remove("active");
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 10);

        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          document.querySelector("canvas").style.zIndex = "99991";
          thankYouModal.classList.remove("hidden");
          thankYouContent.classList.add("ty-active");
        }, 100);

        setTimeout(() => {
          thankYouContent.classList.remove("ty-active");
          setTimeout(() => thankYouModal.classList.add("hidden"), 300);
        }, 3000);

        // reset form
        this.reset();
      } else {
        showSnackbar(data.message);
      }
    })
    .catch(error => {
      submitBtn.classList.remove("loading");
      showSnackbar('An error occurred. Please try again.');
    });

    // Close Thank You Modal when clicking on the background
    thankYouModal.addEventListener("click", function (event) {
      if (event.target === thankYouModal) {
        thankYouModal.classList.remove("show");
        setTimeout(() => (thankYouModal.style.display = "none"), 300);
      }
    });

    function showSnackbar(message) {
      const snackbar = document.getElementById("snackbar");
      snackbar.textContent = message;
      snackbar.classList.add("show");
      setTimeout(() => {
        snackbar.classList.remove("show");
      }, 3000);
    }
  });
