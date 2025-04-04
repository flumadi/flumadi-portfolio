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

// Notification function (for floating alerts)
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

// Form Response Handler (for inline messages)
function showFormResponse(form, type, message) {
    const responseEl = form.querySelector('.form-response-message');
    if (responseEl) {
        responseEl.textContent = message;
        responseEl.className = `form-response-message ${type}`;
        setTimeout(() => responseEl.classList.add('fade-out'), 3000);
    }
}

// Form Submission Handler (Netlify Optimized)
async function handleNetlifyForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    const formName = form.getAttribute('name') || 'form';

    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-text">${submitBtn.textContent.trim()}</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;
        // Button loading state
submitBtn.innerHTML = `
<span class="btn-text">${submitBtn.textContent.trim()}</span>
<i class="fas fa-spinner fa-spin"></i>
`;


        // Convert to FormData for Netlify
        const formData = new FormData(form);
        const urlEncoded = new URLSearchParams(formData).toString();

        // Submit to Netlify
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlEncoded
        });

        if (response.ok) {
            // Success handling
            const successMsg = form.dataset.successMessage || 'Thank you! Your submission was received.';
            showFormResponse(form, 'success', successMsg);
            showNotification('success', successMsg);
            form.reset();
            
            // Hide form if success element exists
            const successElement = form.nextElementSibling?.classList?.contains('form-success');
            if (successElement) form.style.display = 'none';
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Error handling
        const errorMsg = 'Submission failed. Please try again.';
        showFormResponse(form, 'error', errorMsg);
        showNotification('error', errorMsg);
        console.error(`${formName} error:`, error);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    // Netlify Form Handling
    const netlifyForms = document.querySelectorAll('form[netlify]');
    netlifyForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNetlifyForm(form);
        });
    });

    // Legacy fallback for non-Netlify forms
    const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
    if (contactForm && !contactForm.hasAttribute('netlify')) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('error', 'Form configuration error: Netlify attributes missing');
        });
    }
});