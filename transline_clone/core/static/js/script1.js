// =============================
// 🔥 RUN AFTER DOM LOAD
// =============================
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // 🔥 STICKY NAVBAR
    // =========================
    window.addEventListener("scroll", function () {
        let navbar = document.getElementById("navbar");
        if (navbar) {
            navbar.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    // =========================
    // ✨ SCROLL ANIMATION (FADE + LEFT + RIGHT)
    // =========================
    const elements = document.querySelectorAll(".fade-in, .animate-left, .animate-right");

    function showOnScroll() {
        elements.forEach(el => {
            const position = el.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (position < screenHeight - 100) {
                // el.classList.add("show");
                el.classList.add("animate-show");
            }
        });
    }

    window.addEventListener("scroll", showOnScroll);
    showOnScroll(); // run on load

    // =========================
    // 📩 AJAX CONTACT FORM
    // =========================
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", function(e){
            e.preventDefault();

            let formData = new FormData(this);

            fetch("/contact/", {
                method: "POST",
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                let msg = document.getElementById("successMsg");
                if (msg) {
                    msg.innerText = "Message Sent Successfully!";
                    msg.style.color = "green";
                }
                form.reset();
            })
            .catch(() => {
                let msg = document.getElementById("successMsg");
                if (msg) {
                    msg.innerText = "Something went wrong!";
                    msg.style.color = "red";
                }
            });
        });
    }

    // =========================
    // 🔥 HERO SLIDER
    // =========================
    const slides = document.querySelectorAll(".hero-slide");
    let index = 0;

    function showSlide(i) {
        if (slides.length === 0) return;

        index = (i + slides.length) % slides.length;

        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    // auto slide (4 sec)
    setInterval(() => {
        showSlide(index + 1);
    }, 4000);

    // initial load
    showSlide(index);

    // =========================
    // 🔥 ARROW CONTROLS
    // =========================
    window.nextSlide = function () {
        showSlide(index + 1);
    };

    window.prevSlide = function () {
        showSlide(index - 1);
    };

});