const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const closeNav = document.getElementById("close-mobile-nav");

hamburger.addEventListener("click", () => {
  mobileNav.classList.add("active");
});

closeNav.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});

const swiper = new Swiper(".js-testimonials-slider", {
  grabCursor: true,
  spaceBetween: 30,
  pagination: {
    el: ".js-testimonials-pagination",
    clickable: true,
  },
  breakpoints: {
    767: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 1, // show 1 testimonial at ≤480px
    },
  },
});

(function () {
  emailjs.init({
    publicKey: "nQ1fv-w8BLyrpfQtH",
  });
})();

function sendMail() {
  const parms = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    subject: document.getElementById("subject").value.trim(),
    message: document.getElementById("message").value.trim(),
  };

  emailjs
    .send("service_3kdjn5r", "template_z2m82ir", parms)
    .then(() => {
      console.log("Email sent successfully");
      // Optional: reset form or show success message
    })
    .catch((error) => {
      console.error("Email send failed:", error);
      // Optional: show error message to user
    });
}

$(document).ready(function () {
  // Handle send button click
  $(".sendBtn").on("click", function (e) {
    e.preventDefault(); // Prevent form reload
    sendMail();

    // Animate envelope
    $(".mail_letter").toggleClass("move");
    $(".mail_top").toggleClass("closed");
    $(".sendBtn--invisible").toggleClass("visible");
    $(".sendBtn--visible").toggleClass("invisible");
  });

  // Handle input focus and focusout
  $("input, textarea")
    .on("focus", function () {
      $(this).parent().addClass("active");
    })
    .on("blur", function () {
      if ($(this).val().trim() === "") {
        $(this).parent().removeClass("active");
      } else {
        $(this).parent().addClass("active");
      }
    });
});

// function sendMail() {
//   let parms = {
//     name: document.getElementById("name").value,
//     email: document.getElementById("email").value,
//     subject: document.getElementById("subject").value,
//     message: document.getElementById("message").value,
//   };

//   emailjs.send("service_3kdjn5r", "template_z2m82ir", parms).then();
// }
// $(".sendBtn").click(function () {
//   $(".mail_letter").toggleClass("move");
//   $(".mail_top").toggleClass("closed");
//   $(".sendBtn--invisible").toggleClass("visible");
//   $(".sendBtn--visible").toggleClass("invisible");
// });

// $("input").focus(function () {
//   $(this).parent().addClass("active");
//   $("input").focusout(function () {
//     if ($(this).val() == "") {
//       $(this).parent().removeClass("active");
//     } else {
//       $(this).parent().addClass("active");
//     }
//   });
// });
