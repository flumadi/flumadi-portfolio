// Scroll animations
function initScrollAnimations() {
    const animateOnScroll = (elements) => {
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add('animate');
            }
        });
    };

    // Initialize observers
    const animatedElements = document.querySelectorAll('[data-animate]');
    window.addEventListener('scroll', () => animateOnScroll(animatedElements));
    animateOnScroll(animatedElements);
}

// Page transitions
function initPageTransitions() {
    document.querySelectorAll('a:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.href.includes(window.location.hostname)) {
                e.preventDefault();
                document.body.classList.add('page-exit');
                setTimeout(() => window.location.href = link.href, 500);
            }
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initPageTransitions();
});