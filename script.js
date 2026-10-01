/* =========================================================
   CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let ringX = mouseX;
let ringY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});


function animateCursor() {

    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* =========================================================
   CURSOR HOVER
========================================================= */

const hoverElements = document.querySelectorAll(
    "a, button, .service-card, .monitor"
);

hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("active");
    });

});


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0)";
    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(
    ".manifesto-content, .service-card, .process-item, .cta-content"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition =
        "opacity 1s ease, transform 1s cubic-bezier(.16,1,.3,1)";

    observer.observe(element);

});


/* =========================================================
   HERO PARALLAX
========================================================= */

const device = document.querySelector(".device-scene");

window.addEventListener("scroll", () => {

    if (!device) return;

    const scroll = window.scrollY;

    if (scroll < window.innerHeight) {

        const rotation = -14 + scroll * 0.015;
        const move = scroll * 0.25;

        device.style.transform =
            `translateY(calc(-50% + ${move}px))
             perspective(1200px)
             rotateY(${rotation}deg)
             rotateX(3deg)`;
    }

});


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {

    anchor.addEventListener("click", function (e) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   HERO TEXT
========================================================= */

window.addEventListener("load", () => {

    const lines = document.querySelectorAll(".hero-title .line");

    lines.forEach((line, index) => {

        line.style.opacity = "0";
        line.style.transform = "translateY(40px)";

        setTimeout(() => {

            line.style.transition =
                "opacity 1s ease, transform 1s cubic-bezier(.16,1,.3,1)";

            line.style.opacity = "1";
            line.style.transform = "translateY(0)";

        }, 250 + index * 180);

    });

});