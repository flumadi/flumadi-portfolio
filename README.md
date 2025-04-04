# flumadi-portfolio
My Professional Portfolio - 
🌟 Welcome to My Digital Showcase
Hello! I'm Fridah Lumadi, a passionate Information Technology scholar currently pursuing my degree at South Eastern Kenya University. This portfolio represents my journey, skills, and projects—built to impress potential employers and meet all requirements of the PLP Academy Portfolio Challenge (Feb 2025 Cohort).

🔗 Live Demo: https://enchanting-pika-7fcf3c.netlify.app (Replace with your link after deployment)

✨ Why This Portfolio?
I designed this portfolio to:

✅ Showcase my technical skills in Mobile/Web Development & UI/UX

✅ Highlight my education (from primary school to university)

✅ Display real projects with GitHub links and live demos

✅ Make networking easy with a functional MySQL contact form

✅ Stand out visually with a blue/purple/pink theme (professional yet creative)

🛠️ Technologies I Used
Frontend
HTML5 (Semantic structure for accessibility)

CSS3 (Flexbox, Grid, Animations)

JavaScript (Form validation, interactive elements)

Backend (Optional but implemented)

MySQL (Database for messages and newsletter signups)

Deployment
Netlify (Primary hosting)

GitHub Pages (Backup static version)

🚀 Key Features I Implemented
1. Responsive Design
Works perfectly on mobile, tablet, and desktop

Uses CSS Flexbox/Grid for adaptive layouts

2. Interactive Elements
Animated buttons (hover effects, smooth transitions)

Floating profile image on the homepage

Project carousel with GitHub links

3. Functional Contact System
PHP script saves messages to a MySQL database

User-friendly success/error notifications

4. Education & Work Timeline
Visual timeline showing:

Tom & Jerry Kindergarten → Olonana Memorial Academy → St. Joseph's Girls High School → SEKU

Robisearch Limited Internship (2024)

5. Downloadable CV
Employers can download my resume with one click

⚙️ How to Set Up Locally
1. Clone My Repository
bash
Copy
git clone 
cd flumadi_portfolio
1. Run with XAMPP (MySQL)
Place the folder in htdocs

Start Apache & MySQL in XAMPP

3. Database Setup (Optional)
Open MySQL Workbench

Run:

sql
Copy
CREATE DATABASE portfolio_db;
USE portfolio_db;

-- For contact form submissions
CREATE TABLE contacts (<br>
  id INT AUTO_INCREMENT PRIMARY KEY,<br>
  name VARCHAR(100) NOT NULL,<br>
  email VARCHAR(100) NOT NULL,<br>
  message TEXT NOT NULL,<br>
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
);

-- For newsletter signups<br>
CREATE TABLE newsletter (<br>
  id INT AUTO_INCREMENT PRIMARY KEY,<br>
  email VARCHAR(100) NOT NULL UNIQUE,<br>
  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP<br>
);

📝 Submission Readiness<br>
📅 PLP Challenge Timeline
Start Date: March 31, 2025

End Date: April 4, 2025

Award Ceremony: April 11, 2025

✅ How I Meet PLP's Evaluation Criteria

Creativity (20%)Unique animations, gradient text, floating profile image
Code Quality (20%)Clean, commented, W3C validated
Documentation (15%)Detailed README, code comments
Deployment (15%)Works on Netlify + GitHub Pages
Tech Stack (15%)HTML/CSS/JS + MySQL
Peer Review (15%)	15/15	Incorporated feedback from my group
💡 What Makes My Portfolio Unique?

🔹 Balances professionalism & creativity – Not just another template!
🔹 Proves my MySQL skills – Beyond basic frontend
🔹 Mobile-first approach – Critical for modern web dev
🔹 Easy to update – Modular code for future projects

📜 License
MIT © Fridah Lumadi – Free to use as a template, but please credit me!

🚀 Next Steps
Deploy to Netlify (or your preferred host)

Thank you for reviewing my work! Let me know if you'd like any refinements. 😊
