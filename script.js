// ===============================
// LION'S SPORTS WEAR V3
// ===============================

// Mobile Menu
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

menuBtn.addEventListener("click", () => {
    navbar.classList.toggle("active");

    menuBtn.innerHTML = navbar.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a navigation link
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("active");
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Sticky Header
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.background = "#000";
        header.style.boxShadow = "0 8px 20px rgba(0,0,0,.4)";
    } else {
        header.style.background = "#000";
        header.style.boxShadow = "0 3px 20px rgba(0,0,0,.5)";
    }
});

// Smooth Fade-in Animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll(
    ".why-box, .product-card, .category-box, .review-card, .faq-item, .counter-box"
).forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// Back to Top Button
const topBtn = document.createElement("button");

topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
topBtn.className = "top-btn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        topBtn.classList.add("visible");
    } else {
        topBtn.classList.remove("visible");
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Gallery Lightbox
const galleryImages = document.querySelectorAll(".gallery-grid img");

const lightbox = document.createElement("div");
lightbox.className = "lightbox";

const lightboxImg = document.createElement("img");
lightbox.appendChild(lightboxImg);

document.body.appendChild(lightbox);

galleryImages.forEach(img => {

    img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
    });

});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

// Footer Year
const yearElement = document.querySelector(".footer p:last-child");

if (yearElement) {
    yearElement.innerHTML =
        `© ${new Date().getFullYear()} Lion's Sports Wear. All Rights Reserved.`;
}

// ===============================
// Loader
// ===============================

window.addEventListener("load", () => {

setTimeout(() => {

const loader = document.getElementById("loader");

loader.style.opacity = "0";

loader.style.visibility = "hidden";

},2000);

});
