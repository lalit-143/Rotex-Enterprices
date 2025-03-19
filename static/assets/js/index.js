document.addEventListener("DOMContentLoaded", function () {
  const counters = document.querySelectorAll(".counter");
  const speed = 500; // The lower the value, the slower the count

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = counter.getAttribute("data-target");
        const count = parseInt(counter.innerText, 10); // Parse as integer, ignoring non-numeric characters

        // Check if target is a valid integer
        if (!isNaN(target) && Number.isInteger(+target)) {
          const increment = target / speed;

          if (count < target) {
            counter.innerText = Math.ceil(count + increment) + "+"; // Append "+" sign
            setTimeout(updateCount, 5);
          } else {
            counter.innerText = target + "+"; // Finally set the target with "+"
          }
        } else {
          // If target is not a valid integer, set it directly without "+"
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // Navigation bar toggle
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

  // Slider

  new Swiper(".card-wrapper", {
    loop: true,
    speed: 2500,
    spaceBetween: 25,
    autoplay:{
      delay: 0,
    },


    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      
    },

  });
  
});
