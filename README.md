# Nowmiya J. — Data Analyst Portfolio Website

A modern, high-converting personal portfolio website built specifically for a **Data Analyst** role, modeled on a sleek dark-mode designer/developer template with warm amber/tangerine accents.

---

## 🌟 Highlights & Features

- **Exact Aesthetic Match**: Deep slate/charcoal background (`#0b0b0e`, `#121217`) with warm tangerine accents (`#e66a23`, `#f37d36`) and modern typography (`Plus Jakarta Sans` & `JetBrains Mono`).
- **Hero KPI Dashboard Showcase**:
  - Warm headline: *"Hi, I'm Nowmiya,"* with decorative sparkle `✦`.
  - Circular action button `↗` and *"Lets Talk"* warm button badge.
  - Floating metric cards (`99.4% Data Accuracy`, `15+ Production Dashboards`).
  - Embedded live **Chart.js** mini-dashboard showing weekly milestone progress vs. target.
- **Continuous Tech Stack Marquee**:
  - Auto-scrolling ticker: *Python, SQL & PostgreSQL, Microsoft Power BI, Tableau, Advanced Excel & PowerQuery, Pandas & NumPy, DAX & Data Modeling, Automated ETL Pipelines*.
- **Featured Projects**:
  1. **Engineering & Erection Project Performance Dashboard (GM Engineering, Chennai)**: Real-time Power BI milestone vs. manpower utilization combo chart.
  2. **Automated Data Cleansing & Trend Discovery Engine (Shiash Infotech Solutions)**: Python/Pandas data validation pipeline with live trend and anomaly charts.
  3. **Multi-Tier Sales & Customer Retention BI Suite**: Tableau & SQL customer cohort doughnut chart.
  - Interactive **Case Study Modal** (`<dialog>`) detailing business challenge, technical solution, and measurable impact for every project.
- **Technical Skills Matrix**: Visual proficiency indicators across Data Analysis, Programming & Databases, Data Visualization, and Tools & Collaboration.
- **Experience & Education Timeline**: Detailed career progression covering GM Engineering, Shiash Infotech, and Anna University B.Tech in IT (CGPA: 7.26 / 10).
- **Verified Certifications**: GUVI Data Science & Analytics, GUVI Microsoft Excel, and Infosys Springboard AI For All.
- **Contact & Inquiry Section**: Direct contact links (Email, Phone, WhatsApp, LinkedIn, Location), click-to-copy with toast notification, and instant `mailto:` form generator.
- **Built-in Resume Modal**: Quick interactive view of the full resume with a 1-click **Print / Save PDF** action.

---

## 🚀 How to Run Locally

### Option 1: Double-Click
Simply double-click `index.html` or `start_preview.bat` in File Explorer. It opens instantly in your default web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Optional)
If you have Python or Node.js installed:

```bash
# Using Python
python -m http.server 3000

# Or using Node.js / npx
npx serve
```
Then visit `http://localhost:3000` in your browser.

---

## 🌐 1-Click Free Deployment Options

### 1. GitHub Pages
1. Push this folder to a GitHub repository (e.g. `nowmiya-portfolio`).
2. Go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

### 2. Netlify (Drag & Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag the `Protfolio` folder directly into the browser window.
3. Your website is instantly live with a free SSL certificate!

### 3. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` inside this directory and follow the 2-step prompt.

---

## 📁 File Structure

```
Protfolio/
├── index.html            # Main semantic HTML5 webpage
├── start_preview.bat     # 1-click desktop preview launcher
├── README.md             # Project documentation & deployment guide
├── css/
│   └── style.css         # Responsive dark-slate theme with warm orange accents
└── js/
    └── main.js           # Interactive charts, case study modals, resume viewer, toasts
```

---

## 🛠 Customization

- **Updating Contact Info**: Edit the email, phone, and LinkedIn URLs in `index.html` (under the `#contact` section).
- **Adding New Projects**: Duplicate any `<article class="project-feature-card">` block in `index.html` and add corresponding case study details in `js/main.js`.
- **Modifying Colors**: Open `css/style.css` and customize the CSS custom properties in the `:root` block (e.g. `--accent-primary`).
