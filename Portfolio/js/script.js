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
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('nav');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = document.querySelector('.mobile-menu-toggle i');
                if (icon) icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    });
}

// ====================== //
// NOTIFICATIONS
// ====================== //
function showNotification(type, message) {
    const n = document.createElement('div');
    n.textContent = message;
    n.style.cssText = `
        position: fixed; top: 90px; right: 20px; z-index: 9999;
        padding: 14px 22px; border-radius: 8px; color: white;
        font-weight: 600; box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        background: ${type === 'success' ? '#3498db' : '#e91e63'};
        animation: slideIn 0.4s ease;
    `;
    document.body.appendChild(n);
    setTimeout(() => {
        n.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => n.remove(), 300);
    }, 3000);
}

// ====================== //
// FORM RESPONSE + NETLIFY
// ====================== //
function showFormResponse(form, type, message) {
    const el = form.querySelector('.form-response-message');
    if (el) {
        el.textContent = message;
        el.className = `form-response-message ${type}`;
    }
}

async function handleNetlifyForm(form) {
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    try {
        btn.disabled = true;
        btn.innerHTML = `<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>`;

        const urlEncoded = new URLSearchParams(new FormData(form)).toString();
        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: urlEncoded
        });

        if (res.ok) {
            const msg = form.dataset.successMessage || 'Thank you! Your submission was received.';
            showFormResponse(form, 'success', msg);
            showNotification('success', msg);
            form.reset();
        } else {
            throw new Error('Failed');
        }
    } catch (err) {
        const msg = 'Submission failed. Please try again.';
        showFormResponse(form, 'error', msg);
        showNotification('error', msg);
        console.error(err);
    } finally {
        btn.disabled = false;
        btn.innerHTML = original;
    }
}

// ====================== //
// PROJECT DATA
// ====================== //
const PROJECT_DATA = {
    ticketing: {
        title: "Customer Service Ticketing System",
        tag: "Python • Flask • MySQL • Sage 300",
        image: "images/project1.jpg",
        repo: "https://github.com/flumadi",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>The Customer Service Ticketing System was built during my internship at ACCFIN E.A LTD to solve a very real operational gap: the company had no structured way to track client support requests. Before this tool existed, support queries were handled informally through phone calls, emails, and walk-ins, which meant tickets were frequently lost, duplicated, or left unresolved without anyone noticing.</p>
            <h3>The Problem</h3>
            <p>ACCFIN runs Sage 300 ERP for its clients, and support requests range from minor configuration issues to full-blown module failures. Without a ticketing system, the support team had no visibility into which issues were open, which were pending customer feedback, or which had been resolved.</p>
            <h3>My Solution</h3>
            <p>I designed and built a standalone web application using <strong>Python (Flask)</strong> on the backend and <strong>MySQL</strong> for data storage. The system runs alongside Sage 300 ERP and pulls customer information directly from the ERP database so that agents don't have to re-enter data.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Ticket Creation & Management:</strong> Agents can create, assign, prioritize, and close tickets from a clean dashboard.</li>
                <li><strong>Customer Info Integration:</strong> Customer records are linked directly to Sage 300.</li>
                <li><strong>Live Comments:</strong> Every ticket has a threaded comment section for real-time communication.</li>
                <li><strong>Reporting Dashboard:</strong> Analytics view showing open vs. closed tickets and agent workload.</li>
                <li><strong>Role-Based Access:</strong> Separate views for agents, supervisors, and admins.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>The Flask backend uses SQLAlchemy for ORM-based database access, and the frontend is built with vanilla HTML, CSS, and JavaScript. The reporting dashboard uses Chart.js. I also wrote a migration script that pulls customer records from Sage 300's MS SQL database into the ticketing system's MySQL database.</p>
            <h3>Impact</h3>
            <p>By the end of my internship, the system had been used to log and resolve dozens of tickets, giving the support team their first structured view of client issues. The reporting dashboard became a regular tool in weekly team meetings.</p>
            <h3>Skills Applied</h3>
            <p>Python, Flask, MySQL, SQLAlchemy, RESTful routing, authentication, ERP integration, database design, and UI/UX for internal tools.</p>
        `
    },
    youthhub: {
        title: "Youth Skill Hub",
        tag: "HTML • CSS • TypeScript",
        image: "images/project2.jpg",
        repo: "https://github.com/flumadi",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>Youth Skill Hub is a web platform designed to bridge the gap between young people seeking practical skills and the resources, mentors, and opportunities that can help them get there. Many young people in Kenya have the drive to learn but lack a central place to discover free or low-cost training programs.</p>
            <h3>The Problem</h3>
            <p>Information about skill-building opportunities is scattered across social media, WhatsApp groups, NGO websites, and word of mouth. There is no single, well-organized platform where a young person can browse available programs, filter by interest or location, and apply.</p>
            <h3>My Solution</h3>
            <p>I built Youth Skill Hub as a responsive web application using <strong>HTML</strong>, <strong>CSS</strong>, and <strong>TypeScript</strong>. TypeScript adds static typing on top of JavaScript, which made the codebase far more maintainable.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Program Directory:</strong> A searchable, filterable list of skill-building programs.</li>
                <li><strong>Category Browsing:</strong> Programs grouped by tech, business, creative arts, trades, and more.</li>
                <li><strong>User Accounts:</strong> Users can create a profile and save programs.</li>
                <li><strong>Mentor Profiles:</strong> Experienced professionals can list themselves as available mentors.</li>
                <li><strong>Responsive Design:</strong> Works on mobile, tablet, and desktop.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>TypeScript provided strong typing across the application. I organized the CSS using a component-based approach with reusable utility classes. Data is currently stored in JSON format for the prototype, with a path toward migrating to a Node.js + PostgreSQL backend.</p>
            <h3>Impact & Learning</h3>
            <p>Youth Skill Hub has been used as a case study in youth-empowerment conversations. Building it taught me the value of TypeScript in larger projects and how to design a clean information architecture.</p>
            <h3>Skills Applied</h3>
            <p>HTML5, CSS3, TypeScript, responsive web design, component-based architecture, UX design, and front-end prototyping.</p>
        `
    },
    wallet: {
        title: "Digital Wallet App",
        tag: "Flutter • Dart • Mobile",
        image: "images/project3.jpg",
        repo: "https://github.com/flumadi",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>The Digital Wallet App is a cross-platform mobile application built with <strong>Flutter</strong> and <strong>Dart</strong>, designed to make everyday financial transactions simple, fast, and secure. Users can top up their wallet, send and receive money, pay for goods and services, and track spending.</p>
            <h3>The Motivation</h3>
            <p>Mobile money has transformed how people transact across Africa, but many existing apps are cluttered or locked into a single provider's ecosystem. I wanted to build a wallet that feels clean and modern, works on both iOS and Android, and puts the user first.</p>
            <h3>My Solution</h3>
            <p>I used Flutter to build a single codebase that compiles natively to both iOS and Android. The UI follows Material Design with custom styling, and the backend communicates with a REST API for authentication, transactions, and balance updates.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Quick Onboarding:</strong> Sign-up flow with phone verification and PIN setup.</li>
                <li><strong>Send & Receive Money:</strong> Instant peer-to-peer transfers.</li>
                <li><strong>Bill Payments:</strong> Utilities, airtime, and online merchants.</li>
                <li><strong>Transaction History:</strong> Filterable list with search and date filters.</li>
                <li><strong>Spending Insights:</strong> Charts showing monthly spending.</li>
                <li><strong>Security:</strong> PIN login, encrypted storage, session timeouts.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>The app uses clean architecture, separating UI, business logic, and data layers. Provider handles state management, and shared preferences with encryption store session data locally. Tested on Android and iOS simulators.</p>
            <h3>Impact & Learning</h3>
            <p>Building this wallet taught me state management, user flow design, and fintech security. It also gave me deep experience with Flutter's widget system and layout engine.</p>
            <h3>Skills Applied</h3>
            <p>Flutter, Dart, mobile UI/UX, REST API integration, state management, secure storage, cross-platform development, testing.</p>
        `
    },
    scheduler: {
        title: "AidAtlas Task Scheduler",
        tag: "PHP • MySQL • Web App",
        image: "images/project4.jpg",
        repo: "https://github.com/flumadi/AidAtlas_tasksheduler",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>AidAtlas Task Scheduler is a PHP-based web application that helps individuals and small teams organize their tasks, set deadlines, and track progress. The project was born out of my own struggle with juggling coursework, internships, and personal projects.</p>
            <h3>The Problem</h3>
            <p>Most task managers are either too heavy or too simple. For students and small teams, the sweet spot is somewhere in between: enough functionality to be useful, but simple enough to use every day.</p>
            <h3>My Solution</h3>
            <p>I built AidAtlas using <strong>PHP</strong> for the backend and <strong>MySQL</strong> for data storage, with a clean, minimal front-end. It supports user accounts, task creation with due dates and priorities, and a dashboard.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Task Management:</strong> Create, edit, delete, and complete tasks.</li>
                <li><strong>Priority Levels:</strong> Low, Medium, or High priority tags.</li>
                <li><strong>Status Tracking:</strong> "To Do," "In Progress," and "Done."</li>
                <li><strong>Deadline Reminders:</strong> Tasks due soon are highlighted.</li>
                <li><strong>User Accounts:</strong> Private task lists with secure password hashing.</li>
                <li><strong>Simple Reports:</strong> Weekly completion stats.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>Vanilla PHP with PDO for database interactions (protects against SQL injection). Sessions handle authentication and passwords use PHP's built-in password_hash. The whole app loads in under a second.</p>
            <h3>Impact & Learning</h3>
            <p>AidAtlas has become my daily task manager. The project taught me database schema design, secure authentication in a server-rendered app, and building focused, well-scoped tools.</p>
            <h3>Skills Applied</h3>
            <p>PHP, MySQL, PDO, session management, secure password storage, CRUD operations, and web app architecture.</p>
        `
    },
    analytics: {
        title: "Predictive Analytics Dashboard",
        tag: "Python • ML • Power BI",
        image: "images/project5.jpg",
        repo: "https://github.com/flumadi",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>The Predictive Analytics Dashboard combines machine learning with interactive visualizations to help businesses anticipate trends instead of just reacting to them.</p>
            <h3>The Problem</h3>
            <p>Most businesses sit on a goldmine of historical data but rarely use it to predict what's coming next. Existing analytics tools are often too focused on rear-view reporting.</p>
            <h3>My Solution</h3>
            <p>I built a pipeline that ingests raw data, cleans and processes it with <strong>Python (pandas, scikit-learn)</strong>, trains predictive models, and feeds the predictions into an interactive <strong>Power BI</strong> dashboard.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Data Preprocessing Pipeline:</strong> Cleaning, missing-value handling, feature engineering.</li>
                <li><strong>Multiple Models:</strong> Linear regression, decision trees, and ARIMA.</li>
                <li><strong>Model Evaluation:</strong> Accuracy, precision, recall, RMSE metrics.</li>
                <li><strong>Interactive Dashboard:</strong> Power BI visuals with filters.</li>
                <li><strong>Forecast vs. Actual:</strong> Side-by-side comparison to build trust.</li>
                <li><strong>Exportable Reports:</strong> PDF summaries of key insights.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>The ML pipeline uses scikit-learn. Jupyter notebooks were used for prototyping. Data is stored in SQL and Power BI connects with an automated refresh. A small Flask API exposes predictions if needed.</p>
            <h3>Impact & Learning</h3>
            <p>This project pushed me deep into practical ML — not just running models, but understanding model choice, honest evaluation, and communicating results to non-technical audiences.</p>
            <h3>Skills Applied</h3>
            <p>Python, pandas, scikit-learn, statistical analysis, time-series forecasting, Power BI, visualization, Flask.</p>
        `
    },
    homedesign: {
        title: "Home Designing Website",
        tag: "HTML • CSS • WordPress",
        image: "images/project6.jpg",
        repo: "https://github.com/flumadi/homedesigning",
        demo: "",
        body: `
            <h3>Overview</h3>
            <p>The Home Designing Website is a fully responsive marketing site built for a home interior and design brand. The goal was to create an elegant online presence that showcases the portfolio and communicates the brand's philosophy.</p>
            <h3>The Problem</h3>
            <p>The client had a growing portfolio but no cohesive online presence — just scattered Instagram posts and a static one-page site. They needed something polished, mobile-friendly, and easy for non-technical staff to update.</p>
            <h3>My Solution</h3>
            <p>I built the site on <strong>WordPress</strong> for easy content management, with custom <strong>HTML</strong> and <strong>CSS</strong> for a distinctive look that didn't feel like a generic template.</p>
            <h3>Key Features</h3>
            <ul>
                <li><strong>Portfolio Gallery:</strong> Filterable by room type and style.</li>
                <li><strong>Services Section:</strong> Full home redesigns to single-room consultations.</li>
                <li><strong>Client Testimonials:</strong> Real quotes to build trust.</li>
                <li><strong>Contact & Booking Form:</strong> Simple consultation request form.</li>
                <li><strong>Responsive Design:</strong> Optimized for mobile, tablet, and desktop.</li>
                <li><strong>SEO-Ready:</strong> Semantic HTML, fast load times, optimized images.</li>
            </ul>
            <h3>Technical Highlights</h3>
            <p>Customized a lightweight WordPress theme, built custom templates with HTML/CSS, lazy-loaded images, and used a modular grid for portfolio items. Contact form integrates with the client's email.</p>
            <h3>Impact & Learning</h3>
            <p>The site gave the client a professional online home. It taught me to balance design and function — beautiful but easy for a non-technical client to update. It was one of my first real client projects.</p>
            <h3>Skills Applied</h3>
            <p>WordPress, HTML5, CSS3, responsive web design, UI/UX design, SEO fundamentals, client communication, branding.</p>
        `
    }
};

// ====================== //
// CREDENTIAL DATA
// ====================== //
const CREDENTIAL_DATA = {
    plp: {
        title: "Power Learn Project Program",
        subtitle: "Software Development – Mobile App Development • Feb 2025 – June 2025",
        image: "images/plp-cert.png"
    },
    alx: {
        title: "ALX AI Starter Kit Program",
        subtitle: "Completed June 2025",
        image: "images/alx-cert.png"
    },
    ieee: {
        title: "IEEE Student & Computer Society Member",
        subtitle: "IEEE Computer Society • Kenyan Section Region 8",
        image: "images/ieee-badge.jpg"
    },
    dataanalytics: {
        title: "Data Analytics Training",
        subtitle: "ICT Authority Kenya × Data Breed Africa • March 2026",
        image: "images/dataanalytics-cert.png"
    },
    ibm: {
        title: "IBM SkillsBuild – Data Fundamentals",
        subtitle: "Completed March 2026",
        image: "images/ibm-cert.png"
    },
    plphack: {
        title: "PLP Web Development Hackathons",
        subtitle: "Power Learn Project",
        image: "images/plp-hackathon.png"
    },
    sekuhack: {
        title: "Seku Data Science Regional Hackathon",
        subtitle: "Hack4dev",
        image: "images/seku-hackathon.png"
    },
    designhack: {
        title: "Design Thinking Hackathon",
        subtitle: "Riarra University × Anza Village",
        image: "images/design-hackathon.png"
    },
    athack: {
        title: "Africa's Talking Open Hackathon",
        subtitle: "Africa's Talking",
        image: "images/at-hackathon.png"
    }
};

// ====================== //
// CAROUSEL — AUTO MARQUEE
// ====================== //
function initCarousel() {
    const track = document.getElementById('projectsTrack');
    if (!track) return;

    track.innerHTML = track.innerHTML + track.innerHTML;

    const cards = Array.from(track.children);
    const halfCount = cards.length / 2;

    let offset = 0;
    const SPEED = 0.23;
    let paused = false;
    let modalOpen = false;
    let dragging = false;
    let wasDragged = false;

    function setWidth() {
        const first = cards[0];
        const mid = cards[halfCount];
        return mid.offsetLeft - first.offsetLeft;
    }

    function tick() {
        if (!paused && !modalOpen && !dragging) {
            offset -= SPEED;
            const w = setWidth();
            if (Math.abs(offset) >= w) offset += w;
            track.style.transform = `translateX(${offset}px)`;
        }
        requestAnimationFrame(tick);
    }

    track.addEventListener('mouseenter', () => paused = true);
    track.addEventListener('mouseleave', () => paused = false);
    track.addEventListener('touchstart', () => paused = true, { passive: true });
    track.addEventListener('touchend',   () => paused = false, { passive: true });

    let wheelT;
    track.addEventListener('wheel', () => {
        paused = true;
        clearTimeout(wheelT);
        wheelT = setTimeout(() => paused = false, 1200);
    }, { passive: true });

    window.addEventListener('project-modal-opened', () => modalOpen = true);
    window.addEventListener('project-modal-closed', () => modalOpen = false);

    let dragStartX = 0;
    let dragStartOffset = 0;

    track.addEventListener('mousedown', (e) => {
        dragging = true;
        wasDragged = false;
        dragStartX = e.pageX;
        dragStartOffset = offset;
    });

    document.addEventListener('mousemove', (e) => {
        if (!dragging) return;
        e.preventDefault();
        const dx = e.pageX - dragStartX;
        offset = dragStartOffset + dx;
        track.style.transform = `translateX(${offset}px)`;
        if (Math.abs(dx) > 5) wasDragged = true;
    });

    document.addEventListener('mouseup', () => {
        if (!dragging) return;
        dragging = false;
        track.dataset.dragged = wasDragged ? 'true' : 'false';
    });

    requestAnimationFrame(tick);
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
    const track = document.getElementById('projectsTrack');

    if (!modal || !track) return;

    function openModal(key) {
        const data = PROJECT_DATA[key];
        if (!data) return;

        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalTitle.textContent = data.title;
        modalTag.textContent = data.tag;
        modalBody.innerHTML = data.body;

        let linksHTML = '<div class="modal-links">';
        if (data.repo) linksHTML += `<a href="${data.repo}" target="_blank" rel="noopener" class="modal-link repo-link"><i class="fab fa-github"></i> View Repository</a>`;
        if (data.demo) linksHTML += `<a href="${data.demo}" target="_blank" rel="noopener" class="modal-link demo-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>`;
        linksHTML += '</div>';
        if (data.repo || data.demo) modalBody.insertAdjacentHTML('beforeend', linksHTML);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        window.dispatchEvent(new Event('project-modal-opened'));
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        window.dispatchEvent(new Event('project-modal-closed'));
    }

    track.addEventListener('click', (e) => {
        if (track.dataset.dragged === 'true') {
            track.dataset.dragged = 'false';
            return;
        }
        const card = e.target.closest('.project');
        if (!card) return;
        const key = card.getAttribute('data-project');
        if (key) openModal(key);
    });

    modal.addEventListener('click', (e) => {
        if (e.target.closest('[data-close-modal]')) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

// ====================== //
// CREDENTIAL MODAL — whole card is the trigger
// ====================== //
function initCredentialModal() {
    const modal = document.getElementById('credentialModal');
    if (!modal) {
        console.warn('[credential] modal markup missing from page');
        return;
    }

    const modalTitle    = document.getElementById('credModalTitle');
    const modalSubtitle = document.getElementById('credModalSubtitle');
    const modalImage    = document.getElementById('credModalImage');
    const modalLink     = document.getElementById('credModalLink');

    function openModal(key) {
        const data = CREDENTIAL_DATA[key];
        if (!data) {
            console.warn('[credential] no data for key:', key);
            return;
        }
        modalTitle.textContent = data.title;
        modalSubtitle.textContent = data.subtitle;
        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalLink.href = data.image;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event delegation — any click on a cert / hackathon card opens the modal
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.cert-card, .hackathon-card');
        if (card) {
            const key = card.getAttribute('data-cert');
            if (key) {
                e.preventDefault();
                openModal(key);
                return;
            }
        }
        if (e.target.closest('[data-close-cred]')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // Expose for manual debugging in DevTools
    window.openCredential = openModal;
    console.log('[credential] ready ✅');
}

// ====================== //
// INIT
// ====================== //
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initCarousel();
    initProjectModal();
    initCredentialModal();

    document.querySelectorAll('form[netlify]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNetlifyForm(form);
        });
    });
});
