// ====================== //
// MOBILE MENU
// ====================== //
function initMobileMenu() {
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
// PROJECT DATA (for modal)
// ====================== //
const PROJECT_DATA = {
    ticketing: {
        title: "Customer Service Ticketing System",
        tag: "Python • Flask • MySQL • Sage 300",
        image: "images/project1.jpg",
        body: `
            <h3>Overview</h3>
            <p>The Customer Service Ticketing System was built during my internship at ACCFIN E.A LTD to solve a very real operational gap: the company had no structured way to track client support requests. Before this tool existed, support queries were handled informally through phone calls, emails, and walk-ins, which meant tickets were frequently lost, duplicated, or left unresolved without anyone noticing.</p>

            <h3>The Problem</h3>
            <p>ACCFIN runs Sage 300 ERP for its clients, and support requests range from minor configuration issues to full-blown module failures. Without a ticketing system, the support team had no visibility into which issues were open, which were pending customer feedback, or which had been resolved. Response times suffered, and there was no way to measure team performance or client satisfaction.</p>

            <h3>My Solution</h3>
            <p>I designed and built a standalone web application using <strong>Python (Flask)</strong> on the backend and <strong>MySQL</strong> for data storage. The system runs alongside Sage 300 ERP and pulls customer information directly from the ERP database so that agents don't have to re-enter data. Each ticket includes a unique ID, priority level, category, assigned agent, and a complete history of every comment and status change.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Ticket Creation & Management:</strong> Agents can create, assign, prioritize, and close tickets from a clean dashboard.</li>
                <li><strong>Customer Info Integration:</strong> Customer records are linked directly to Sage 300, so agents see full account context without switching systems.</li>
                <li><strong>Live Comments:</strong> Every ticket has a threaded comment section where agents and clients can communicate in real time.</li>
                <li><strong>Reporting Dashboard:</strong> A built-in analytics view shows open vs. closed tickets, average resolution time, agent workload, and common issue categories.</li>
                <li><strong>Role-Based Access:</strong> Separate views for agents, supervisors, and admins, with appropriate permissions at each level.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>The Flask backend uses SQLAlchemy for ORM-based database access, and the frontend is built with vanilla HTML, CSS, and JavaScript to keep it lightweight and fast. The reporting dashboard uses Chart.js to render dynamic graphs. I also wrote a small migration script that pulls existing customer records from Sage 300's MS SQL database into the ticketing system's MySQL database, keeping the two in sync.</p>

            <h3>Impact</h3>
            <p>By the end of my internship, the system had been used to log and resolve dozens of tickets, giving the support team their first-ever structured view of client issues. The reporting dashboard became a regular tool in weekly team meetings, and the company continues to use it as a foundation for their support operations. More importantly, this project taught me how to build software that solves a specific, real business problem rather than just a technical exercise.</p>

            <h3>Skills Applied</h3>
            <p>Python, Flask, MySQL, SQLAlchemy, RESTful routing, authentication, ERP integration, database design, UI/UX for internal tools, and working with real clients and stakeholders.</p>
        `
    },

    youthhub: {
        title: "Youth Skill Hub",
        tag: "HTML • CSS • TypeScript",
        image: "images/project2.jpg",
        body: `
            <h3>Overview</h3>
            <p>Youth Skill Hub is a web platform designed to bridge the gap between young people seeking practical skills and the resources, mentors, and opportunities that can help them get there. The idea came from a simple observation: many young people in Kenya have the drive to learn but lack a central place to discover free or low-cost training programs, mentorship opportunities, and job-ready skills.</p>

            <h3>The Problem</h3>
            <p>Information about skill-building opportunities is scattered across social media, WhatsApp groups, NGO websites, and word of mouth. There is no single, well-organized platform where a young person can browse available programs, filter by interest or location, and apply. This fragmentation leads to missed opportunities and wasted potential.</p>

            <h3>My Solution</h3>
            <p>I built Youth Skill Hub as a responsive web application using <strong>HTML</strong>, <strong>CSS</strong>, and <strong>TypeScript</strong>. TypeScript was a deliberate choice — it adds static typing on top of JavaScript, which made the codebase far more maintainable as the project grew and helped catch bugs early during development.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Program Directory:</strong> A searchable, filterable list of skill-building programs with details on duration, cost, and location.</li>
                <li><strong>Category Browsing:</strong> Programs are grouped by category — tech, business, creative arts, trades, and more.</li>
                <li><strong>User Accounts:</strong> Users can create a profile, save programs they're interested in, and track applications.</li>
                <li><strong>Mentor Profiles:</strong> A section where experienced professionals can list themselves as available mentors.</li>
                <li><strong>Responsive Design:</strong> Fully responsive layout that works seamlessly on mobile, tablet, and desktop.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>TypeScript provided strong typing across the application, which made refactoring safe and predictable. I organized the CSS using a component-based approach with reusable utility classes, keeping the styling consistent without a heavy framework. Data is currently stored in a structured JSON format for the prototype, with a clear path toward migrating to a real backend (likely Node.js + PostgreSQL) in the next phase.</p>

            <h3>Impact & Learning</h3>
            <p>Although Youth Skill Hub is currently a prototype, it has already been used as a case study in several conversations about youth empowerment in tech. Building it taught me the value of TypeScript in larger projects, how to design a clean information architecture, and how to think about user journeys — particularly for first-time users who may not be tech-savvy. It also reinforced my belief that technology is at its best when it amplifies access to opportunity.</p>

            <h3>Skills Applied</h3>
            <p>HTML5, CSS3, TypeScript, responsive web design, component-based architecture, user experience design, information architecture, and front-end prototyping.</p>
        `
    },

    wallet: {
        title: "Digital Wallet App",
        tag: "Flutter • Dart • Mobile",
        image: "images/project3.jpg",
        body: `
            <h3>Overview</h3>
            <p>The Digital Wallet App is a cross-platform mobile application built with <strong>Flutter</strong> and <strong>Dart</strong>, designed to make everyday financial transactions simple, fast, and secure. The app lets users top up their wallet, send and receive money, pay for goods and services, and track their spending — all from a single, beautifully designed interface.</p>

            <h3>The Motivation</h3>
            <p>Mobile money has transformed how people transact across Africa, but many existing apps are cluttered, unintuitive, or locked into a single provider's ecosystem. I wanted to build a wallet that feels clean and modern, works on both iOS and Android, and puts the user's needs first — whether they're sending money to family, splitting a bill with friends, or paying for a service.</p>

            <h3>My Solution</h3>
            <p>I used Flutter to build a single codebase that compiles natively to both iOS and Android, cutting development time in half and ensuring a consistent user experience across both platforms. The UI follows Material Design principles with custom styling, and the backend communicates with a REST API for authentication, transactions, and balance updates.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Quick Onboarding:</strong> A smooth sign-up flow with phone-number verification and PIN setup.</li>
                <li><strong>Send & Receive Money:</strong> Instant peer-to-peer transfers with confirmation screens and receipts.</li>
                <li><strong>Bill Payments:</strong> Support for paying utilities, airtime, and online merchants.</li>
                <li><strong>Transaction History:</strong> A clean, filterable list of all past transactions with search and date filters.</li>
                <li><strong>Spending Insights:</strong> Simple charts showing where money went during the month.</li>
                <li><strong>Security:</strong> PIN-protected login, encrypted local storage, and session timeouts.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>The app is structured using a clean architecture pattern, separating UI, business logic, and data layers. I used Flutter's Provider package for state management, and shared preferences with encryption for storing sensitive session data locally. Navigation between screens uses Flutter's modern routing system, and the entire app was tested on both Android and iOS simulators during development.</p>

            <h3>Impact & Learning</h3>
            <p>Building this wallet taught me the importance of handling state cleanly, designing user flows that minimize cognitive load, and thinking hard about security in fintech. It also gave me deep experience with Flutter's widget system, layout engine, and animations — skills I continue to build on. The app is still in active development, with future plans for biometric login and multi-currency support.</p>

            <h3>Skills Applied</h3>
            <p>Flutter, Dart, mobile UI/UX design, REST API integration, state management, secure storage, cross-platform development, and testing.</p>
        `
    },

    scheduler: {
        title: "AidAtlas Task Scheduler",
        tag: "PHP • MySQL • Web App",
        image: "images/project4.jpg",
        body: `
            <h3>Overview</h3>
            <p>AidAtlas Task Scheduler is a PHP-based web application that helps individuals and small teams organize their tasks, set deadlines, and track progress — all in one place. The project was born out of my own struggle with juggling coursework, internships, and personal projects without a reliable system to keep everything in check.</p>

            <h3>The Problem</h3>
            <p>Most task managers on the market are either too heavy (with features most people never use) or too simple (with no structure). For students and small teams, the sweet spot is somewhere in between: enough functionality to actually be useful, but simple enough that you actually use it every day.</p>

            <h3>My Solution</h3>
            <p>I built AidAtlas using <strong>PHP</strong> for the backend and <strong>MySQL</strong> for data storage, with a clean, minimal front-end. The application supports user accounts, task creation with due dates and priorities, and a dashboard that shows what needs attention right now.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Task Management:</strong> Create, edit, delete, and complete tasks with titles, descriptions, and deadlines.</li>
                <li><strong>Priority Levels:</strong> Tag tasks as Low, Medium, or High priority for quick visual sorting.</li>
                <li><strong>Status Tracking:</strong> Move tasks between "To Do," "In Progress," and "Done."</li>
                <li><strong>Deadline Reminders:</strong> Tasks due soon are highlighted on the dashboard.</li>
                <li><strong>User Accounts:</strong> Each user has their own private task list, protected by secure password hashing.</li>
                <li><strong>Simple Reports:</strong> Weekly completion stats to help users reflect on productivity.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>The backend is built with vanilla PHP using PDO for database interactions, which protects against SQL injection. Sessions handle authentication, and passwords are hashed using PHP's built-in password_hash function. The front-end uses HTML, CSS, and minimal JavaScript for interactivity, with a focus on speed and simplicity — the entire app loads in under a second on a basic connection.</p>

            <h3>Impact & Learning</h3>
            <p>AidAtlas has become my daily driver for task management, and a small group of friends started using it during the development phase. The project taught me how to design database schemas that scale, how to handle user authentication securely in a traditional server-rendered app, and how to build something focused rather than feature-bloated. It's a good reminder that simple, well-executed tools often beat complicated ones.</p>

            <h3>Skills Applied</h3>
            <p>PHP, MySQL, PDO, session management, secure password storage, CRUD operations, and web application architecture.</p>
        `
    },

    analytics: {
        title: "Predictive Analytics Dashboard",
        tag: "Python • ML • Power BI",
        image: "images/project5.jpg",
        body: `
            <h3>Overview</h3>
            <p>The Predictive Analytics Dashboard is a data science project that combines machine learning with interactive visualizations to help businesses anticipate trends instead of just reacting to them. The dashboard takes historical data, trains predictive models on it, and presents the results in a way that non-technical decision-makers can actually use.</p>

            <h3>The Problem</h3>
            <p>Most businesses sit on a goldmine of historical data — sales figures, customer behavior, seasonal patterns — but rarely use it to predict what's coming next. Existing analytics tools are often too focused on rear-view reporting ("here's what happened last quarter") rather than forward-looking insight ("here's what's likely to happen next month").</p>

            <h3>My Solution</h3>
            <p>I built a pipeline that ingests raw data, cleans and processes it with <strong>Python (pandas, scikit-learn)</strong>, trains predictive models (regression, time-series forecasting, and classification depending on the use case), and then feeds the predictions into an interactive <strong>Power BI</strong> dashboard.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Data Preprocessing Pipeline:</strong> Automated cleaning, missing-value handling, and feature engineering.</li>
                <li><strong>Multiple Models:</strong> Linear regression for trend forecasting, decision trees for classification, and ARIMA for time-series predictions.</li>
                <li><strong>Model Evaluation:</strong> Accuracy, precision, recall, and RMSE metrics displayed alongside every prediction.</li>
                <li><strong>Interactive Dashboard:</strong> Power BI visuals allow users to filter by date range, product category, region, and more.</li>
                <li><strong>Forecast vs. Actual:</strong> A side-by-side view showing predicted values against real outcomes to build trust in the model.</li>
                <li><strong>Exportable Reports:</strong> Users can download a PDF summary of key insights.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>The ML pipeline was built in Python with scikit-learn, and I used Jupyter notebooks for prototyping before moving everything into reusable scripts. Data is stored in a structured SQL database, and the Power BI dashboard connects directly to it via an automated refresh schedule. I also created a small Flask API so that predictions could be consumed by other applications if needed.</p>

            <h3>Impact & Learning</h3>
            <p>This project pushed me deep into practical machine learning — not just running models, but understanding why certain models work better for certain problems, how to evaluate them honestly, and how to communicate results to non-technical audiences. It reinforced that the hardest part of data science isn't the modeling; it's the storytelling around the numbers.</p>

            <h3>Skills Applied</h3>
            <p>Python, pandas, scikit-learn, statistical analysis, time-series forecasting, Power BI, data visualization, Flask, and translating technical findings into business insight.</p>
        `
    },

    homedesign: {
        title: "Home Designing Website",
        tag: "HTML • CSS • WordPress",
        image: "images/project6.jpg",
        body: `
            <h3>Overview</h3>
            <p>The Home Designing Website is a fully responsive marketing site built for a home interior and design brand. The goal was to create an elegant online presence that showcases the brand's portfolio, communicates its design philosophy, and makes it easy for potential clients to get in touch and request a consultation.</p>

            <h3>The Problem</h3>
            <p>The client had a growing portfolio of beautiful interior design work but no cohesive online presence. Their previous setup was a mix of scattered Instagram posts and a static one-page website that didn't reflect the quality of their work. They needed something polished, mobile-friendly, and easy for non-technical staff to update.</p>

            <h3>My Solution</h3>
            <p>I built the site on <strong>WordPress</strong> for easy content management, with custom <strong>HTML</strong> and <strong>CSS</strong> to give it a distinctive look that didn't feel like a generic template. Every design decision — from typography to color to layout — was made to reflect the brand's aesthetic of warmth, elegance, and modern minimalism.</p>

            <h3>Key Features</h3>
            <ul>
                <li><strong>Portfolio Gallery:</strong> A visually rich gallery showcasing completed projects, filterable by room type and style.</li>
                <li><strong>Services Section:</strong> Clear descriptions of what the client offers — from full home redesigns to single-room consultations.</li>
                <li><strong>Client Testimonials:</strong> Real quotes from past clients to build trust with new visitors.</li>
                <li><strong>Contact & Booking Form:</strong> A simple form that lets visitors request a consultation directly from the site.</li>
                <li><strong>Responsive Design:</strong> Fully optimized for mobile, tablet, and desktop viewing.</li>
                <li><strong>SEO-Ready:</strong> Clean semantic HTML, fast load times, and optimized images for better search visibility.</li>
            </ul>

            <h3>Technical Highlights</h3>
            <p>I customized a lightweight WordPress theme to match the client's brand guidelines, then built custom page templates with HTML and CSS. Images are lazy-loaded for performance, and the site uses a modular grid system that makes adding new portfolio items simple. The contact form integrates with the client's email and stores submissions in the WordPress dashboard.</p>

            <h3>Impact & Learning</h3>
            <p>The site gave the client a professional online home that matches the quality of their physical work. It also taught me how to balance design and function — making something that looks beautiful while remaining easy for a non-technical client to update. This was one of my first projects where I worked directly with a client, which taught me the importance of listening to their vision before making creative decisions.</p>

            <h3>Skills Applied</h3>
            <p>WordPress, HTML5, CSS3, responsive web design, UI/UX design, SEO fundamentals, client communication, and branding.</p>
        `
    }
};

// ====================== //
// AUTO-REVOLVING CAROUSEL
// ====================== //
function initAutoCarousel() {
    const carousel = document.getElementById('projectsCarousel');
    if (!carousel) return;

    let autoScrollId = null;
    let isPaused = false;
    let isModalOpen = false;
    const SCROLL_SPEED = 0.6;
    const SCROLL_INTERVAL = 16;

    // Duplicate the cards for a seamless loop
    const originalCards = Array.from(carousel.children);
    originalCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('data-clone', 'true');
        carousel.appendChild(clone);
    });

    function startAutoScroll() {
        if (autoScrollId) return;
        autoScrollId = setInterval(() => {
            if (isPaused || isModalOpen) return;
            carousel.scrollLeft += SCROLL_SPEED;

            const halfWidth = carousel.scrollWidth / 2;
            if (carousel.scrollLeft >= halfWidth) {
                carousel.scrollLeft -= halfWidth;
            }
        }, SCROLL_INTERVAL);
    }

    const pause = () => { isPaused = true; };
    const resume = () => { isPaused = false; };

    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', resume);
    carousel.addEventListener('touchstart', pause, { passive: true });
    carousel.addEventListener('touchend', resume, { passive: true });

    let wheelTimeout;
    carousel.addEventListener('wheel', () => {
        pause();
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(resume, 1200);
    }, { passive: true });

    window.addEventListener('project-modal-opened', () => { isModalOpen = true; });
    window.addEventListener('project-modal-closed', () => { isModalOpen = false; });

    startAutoScroll();
}

// ====================== //
// PROJECT MODAL
// ====================== //
function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalTag = document.getElementById('modalTag');
    const modalBody = document.getElementById('modalBody');
    const carousel = document.getElementById('projectsCarousel');

    if (!modal || !carousel) return;

    function openModal(projectKey) {
        const data = PROJECT_DATA[projectKey];
        if (!data) return;

        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalBody.innerHTML = data.body;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        window.dispatchEvent(new Event('project-modal-opened'));
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        window.dispatchEvent(new Event('project-modal-closed'));
    }

    carousel.addEventListener('click', (e) => {
        const card = e.target.closest('.project');
        if (!card) return;
        const key = card.getAttribute('data-project');
        if (key) openModal(key);
    });

    modal.addEventListener('click', (e) => {
        if (e.target.closest('[data-close-modal]')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ====================== //
// MANUAL CAROUSEL CONTROLS
// ====================== //
function scrollProjects(direction) {
    const carousel = document.getElementById('projectsCarousel');
    if (!carousel) return;
    const scrollAmount = 300;
    carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

// ====================== //
// INIT
// ====================== //
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initAutoCarousel();
    initProjectModal();

    const netlifyForms = document.querySelectorAll('form[netlify]');
    netlifyForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNetlifyForm(form);
        });
    });
});
