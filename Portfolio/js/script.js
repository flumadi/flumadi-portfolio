// Mobile Navigation
function initMobileMenu() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header .container').prepend(menuToggle);
    
    menuToggle.addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('active');
    });
}

// Form Handling
async function handleFormSubmit(form, endpoint, successMessage) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(form)))
        });
        const data = await response.json();
        showNotification(data.success ? 'success' : 'error', data.message);
        if (data.success) form.reset();
    } catch (error) {
        showNotification('error', 'Network error. Please try again.');
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Form submissions
    document.querySelectorAll('.contact-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(e.target, 'contact-form.php', 'Message sent successfully!');
        });
    });
    
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(e.target, 'newsletter.php', 'Subscribed successfully!');
        });
    });
});