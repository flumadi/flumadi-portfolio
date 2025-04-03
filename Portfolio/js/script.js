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

// Notification function
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Form Handling
async function handleFormSubmit(form, endpoint) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const successElement = form.nextElementSibling?.classList?.contains('form-success') 
        ? form.nextElementSibling : null;

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification('success', result.message);
            if (successElement) {
                successElement.style.display = 'flex';
                form.style.display = 'none';
            } else {
                form.reset();
            }
        } else {
            showNotification('error', result.message);
        }
    } catch (error) {
        showNotification('error', 'Network error. Please try again.');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Contact form
    const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(e.target, 'contact-form.php');
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm') || document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmit(e.target, 'newsletter.php');
        });
    }
});