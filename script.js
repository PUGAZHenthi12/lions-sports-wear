// Smooth Scroll
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Hero Animation
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');

    hero.style.opacity = "0";
    hero.style.transition = "opacity 1.5s ease";

    setTimeout(() => {
        hero.style.opacity = "1";
    }, 100);
});
