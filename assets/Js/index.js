window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobile-nav");
  const closeNav = document.getElementById("close-mobile-nav");

  hamburger.addEventListener("click", function () {
    mobileNav.style.display = "flex";
  });

  closeNav.addEventListener("click", function () {
    mobileNav.style.display = "none";
  });
});


const swiper = new Swiper(".js-testimonials-slider", {
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
    el: ".js-testimonials-pagination",
    clickable: true,
  },
  breakpoints: {
    1024:{
      slidesPerView:3,
    },
    768: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1, // show 1 testimonial at ≤480px
    },
  },
});

emailjs.init("-vUxzdSb_yQlvbAX6");

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const btn = document.querySelector(".sendBtn");
  const mailTop = document.querySelector(".mail_top");
  const mailLetter = document.querySelector(".mail_letter");

  function setButtonState(state) {
    if (state === "sending") {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    } else if (state === "success") {
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      setTimeout(() => {
        btn.innerText = "Send Message";
        btn.disabled = false;
      }, 2500);
    } else {
      btn.innerText = "Send Message";
      btn.disabled = false;
    }
  }

  btn.addEventListener("click", function () {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      Toastify({
        text: "Please fill out all fields!",
        duration: 3000,
        style: { background: "#e74c3c" }, // red
      }).showToast();
      return;
    }

    setButtonState("sending");

    // Send form with EmailJS
    emailjs
      .sendForm("service_p2ty1in", "template_z2m82ir", form)
      .then(() => {
        // Toastify success
        Toastify({
          text: "Message sent successfully!",
          duration: 3000,
          style: { background: "#10b981" }, // green
        }).showToast();

        // Animate envelope
        mailTop?.classList.add("closed");
        mailLetter?.classList.add("move");

        // Reset form after delay
        setTimeout(() => {
          form.reset();
          setButtonState("success");
          mailTop?.classList.remove("closed");
          mailLetter?.classList.remove("move");
          btn.disabled = false;
        }, 2500);
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        Toastify({
          text: "Failed to send message. Please try again.",
          duration: 4000,
          style: { background: "#e67e22" }, // orange
        }).showToast();
        setButtonState();
      });
  });
});
