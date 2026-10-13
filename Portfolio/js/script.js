// ====================== //
// MOBILE MENU (FIXED)
// ====================== //
function initMobileMenu() {
    // Insert hamburger before logo if not already present
    if (!document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('div');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle navigation');
        const headerContainer = document.querySelector('header .container');
        headerContainer.insertBefore(menuToggle, headerContainer.firstChild);

        menuToggle.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close menu when a nav link is clicked
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('.mobile-menu-toggle i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
}

// ====================== //
// NOTIFICATIONS
// ====================== //
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 90px; right: 20px; z-index: 9999;
        padding: 14px 22px; border-radius: 8px; color: white;
        font-weight: 600; box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        background: ${type === 'success' ? '#3498db' : '#e91e63'};
        animation: slideIn 0.4s ease;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ====================== //
// FORM RESPONSE
// ====================== //
function showFormResponse(form, type, message) {
    const responseEl = form.querySelector('.form-response-message');
    if (responseEl) {
        responseEl.textContent = message;
        responseEl.className = `form-response-message ${type}`;
    }
}

// ====================== //
// NETLIFY FORM HANDLER
// ====================== //
async function handleNetlifyForm(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    const formName = form.getAttribute('name') || 'form';

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-text">Sending...</span>
            <i class="fas fa-spinner fa-spin"></i>
        `;

        const formData = new FormData(form);
        const urlEncoded = new URLSearchParams(formData).toString();

        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlEncoded
        });

        if (response.ok) {
            const successMsg = form.dataset.successMessage || 'Thank you! Your submission was received.';
            showFormResponse(form, 'success', successMsg);
            showNotification('success', successMsg);
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        const errorMsg = 'Submission failed. Please try again.';
        showFormResponse(form, 'error', errorMsg);
        showNotification('error', errorMsg);
        console.error(`${formName} error:`, error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalContent;
    }
}

// ====================== //
// INIT
// ====================== //
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();

    const netlifyForms = document.querySelectorAll('form[netlify]');
    netlifyForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNetlifyForm(form);
        });
    });
});
