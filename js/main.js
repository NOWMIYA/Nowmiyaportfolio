/**
 * Portfolio JavaScript - Nowmiya J. (Data Analyst)
 * Features:
 * - Silky smooth scroll reveal animations (IntersectionObserver)
 * - Animated top scroll progress indicator
 * - 3D Perspective Card Tilt on mouse move
 * - Animated number stat counters (CountUp)
 * - Animated skill progress bars on scroll
 * - Project category filtering
 * - Lazy-rendered animated Chart.js widgets
 * - Interactive modal case studies & resume viewer
 * - Copy-to-clipboard toast notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgressBar();
  initScrollReveals();
  initNavbar();
  initAnimatedCounters();
  initSkillBarsOnScroll();
  init3DCardTilts();
  initProjectFilters();
  initChartsOnScroll();
  initModals();
  initCertModal();
  initContactForm();
  initCopyActions();
});

/* ==========================================================================
   1. Scroll Progress Bar
   ========================================================================== */
function initScrollProgressBar() {
  let bar = document.querySelector('.scroll-progress-bar');
  if (!bar) {
    bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.appendChild(bar);
  }

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }, { passive: true });
}

/* ==========================================================================
   2. Silky Smooth Scroll Reveal Animations (IntersectionObserver)
   ========================================================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-scale');
  
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   3. Animated Stat Counters (CountUp)
   ========================================================================== */
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
        const duration = 1600; // ms
        const startTime = performance.now();

        function animateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic formula
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = (target * easeOut).toFixed(decimals);
          el.textContent = `${prefix}${currentVal}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(animateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => counterObserver.observe(el));
}

/* ==========================================================================
   4. Animated Skill Progress Bars on Scroll
   ========================================================================== */
function initSkillBarsOnScroll() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const bars = skillsSection.querySelectorAll('.skill-item-progress');
  const barObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach((bar, index) => {
          const targetWidth = bar.getAttribute('data-width') || '90%';
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, index * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  barObserver.observe(skillsSection);
}

/* ==========================================================================
   5. Interactive 3D Perspective Card Tilt on Mouse Move
   ========================================================================== */
function init3DCardTilts() {
  // Only enable on fine pointer / desktop devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.hero-main-card, .project-mockup-wrapper');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6 deg

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ==========================================================================
   6. Project Category Filtering
   ========================================================================== */
function initProjectFilters() {
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-feature-card');
  if (!filterPills.length || !projectCards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || cardCategory.includes(filterValue)) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   7. Lazy-Rendered Animated Chart.js Widgets on Scroll
   ========================================================================== */
function initChartsOnScroll() {
  if (typeof Chart === 'undefined') return;

  // Global default styling for charts
  Chart.defaults.color = '#94a3b8';
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.tooltip.backgroundColor = '#181820';
  Chart.defaults.plugins.tooltip.titleColor = '#ffffff';
  Chart.defaults.plugins.tooltip.bodyColor = '#e2e8f0';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(230, 106, 35, 0.45)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;

  // Hero Mini Live Chart
  const heroCanvas = document.getElementById('heroMiniChart');
  if (heroCanvas) {
    new Chart(heroCanvas, {
      type: 'line',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
        datasets: [
          {
            label: 'Actual Erection',
            data: [18, 36, 52, 68, 84, 95],
            borderColor: '#e66a23',
            backgroundColor: 'rgba(230, 106, 35, 0.18)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#e66a23'
          },
          {
            label: 'Target KPI',
            data: [15, 30, 50, 65, 80, 92],
            borderColor: '#64748b',
            borderDash: [5, 5],
            borderWidth: 2,
            fill: false,
            tension: 0.2,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1500, easing: 'easeOutQuart' },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: { boxWidth: 8, font: { size: 10 } }
          }
        },
        scales: {
          x: { grid: { display: false, drawBorder: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false }, ticks: { font: { size: 10 }, callback: v => v + '%' } }
        }
      }
    });
  }

  // Helper function to lazy initialize chart on scroll
  function createLazyChart(canvasId, createFn) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    let rendered = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !rendered) {
          rendered = true;
          createFn(canvas);
          observer.unobserve(canvas);
        }
      });
    }, { threshold: 0.25 });

    observer.observe(canvas);
  }

  // 1. Project 1 Chart (GM Engineering)
  createLazyChart('project1Chart', (canvas) => {
    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Site Alpha', 'Site Beta', 'Turbine A', 'Piping Bay', 'Structure 4', 'Erection Z'],
        datasets: [
          {
            type: 'bar',
            label: 'Milestone Completion %',
            data: [92, 88, 76, 95, 84, 91],
            backgroundColor: 'rgba(230, 106, 35, 0.85)',
            borderRadius: 6,
            barThickness: 16
          },
          {
            type: 'line',
            label: 'Manpower Efficiency',
            data: [85, 90, 80, 98, 89, 94],
            borderColor: '#38bdf8',
            borderWidth: 2,
            pointBackgroundColor: '#38bdf8',
            pointRadius: 4,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1400, easing: 'easeOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 8, padding: 12, font: { size: 11 } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { font: { size: 10 }, callback: v => v + '%' } }
        }
      }
    });
  });

  // 2. Project 2 Chart (Shiash Infotech)
  createLazyChart('project2Chart', (canvas) => {
    new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Cleaned Signal (De-noised)',
            data: [32, 38, 45, 52, 58, 64, 72, 80, 85, 91, 96, 104],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 2
          },
          {
            label: 'Raw Anomaly Spikes',
            data: [30, 48, 43, 67, 56, 61, 89, 78, 84, 108, 95, 102],
            borderColor: 'rgba(239, 68, 68, 0.5)',
            borderDash: [3, 3],
            borderWidth: 1.5,
            pointRadius: 3,
            pointBackgroundColor: '#ef4444'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 1600, easing: 'easeOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 8, padding: 12, font: { size: 11 } } }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
          y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { font: { size: 10 } } }
        }
      }
    });
  });

  // 3. Project 3 Chart (Tableau Cohorts)
  createLazyChart('project3Chart', (canvas) => {
    new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Enterprise', 'SMB Accounts', 'Direct Retail', 'Renewals'],
        datasets: [
          {
            data: [42, 28, 18, 12],
            backgroundColor: ['#e66a23', '#38bdf8', '#a855f7', '#10b981'],
            borderColor: '#101014',
            borderWidth: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 1500, easing: 'easeOutQuart' },
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 8, padding: 12, font: { size: 11 } } }
        },
        cutout: '70%'
      }
    });
  });
}

/* ==========================================================================
   8. Navigation & Scroll Effects
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileBtn.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileBtn) {
          mobileBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
        }
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  const backToTop = document.querySelector('.footer-back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   9. Modals & Case Study Details
   ========================================================================== */
function initModals() {
  const caseStudies = {
    proj1: {
      title: "Engineering & Erection KPI Dashboard",
      role: "Data Analyst @ GM Engineering, Chennai",
      timeline: "September 2025 - Present",
      tools: ["Power BI", "SQL", "DAX", "Power Query", "Excel"],
      problem: "Site operations and project management teams suffered from disconnected Excel files, delayed weekly erection reports, and no unified visibility into manpower productivity vs scheduled critical path milestones.",
      solution: "Engineered an automated end-to-end reporting pipeline using SQL queries to extract erection logs and structured Power Query transformations. Built an interactive Power BI dashboard tracking work progress, pending activities, and manpower allocation.",
      impact: [
        "Reduced manual reporting preparation time by 65% across site divisions.",
        "Provided executive leadership with real-time daily/weekly/monthly KPI visibility.",
        "Enabled proactive identification of 12+ critical-path bottlenecks before construction delays occurred."
      ]
    },
    proj2: {
      title: "Automated Data Cleansing & Trend Discovery Pipeline",
      role: "Python Developer Intern @ Shiash Infotech Solutions",
      timeline: "August 2024 - January 2025",
      tools: ["Python", "Pandas", "NumPy", "Matplotlib", "Excel"],
      problem: "Inconsistent historical datasets with missing records, non-standard formatting, and duplicate rows prevented accurate trend identification.",
      solution: "Developed modular Python scripts utilizing Pandas for automated outlier detection, missing value imputation, and schema validation. Generated automated statistical reports and visual trend charts.",
      impact: [
        "Automated repetitive multi-sheet Excel cleansing, saving 15+ hours weekly.",
        "Identified underlying cyclical performance patterns with 98% data hygiene.",
        "Collaborated with senior developers to integrate data validation hooks into internal tools."
      ]
    },
    proj3: {
      title: "Multi-Dimensional Sales & Customer Retention Dashboard",
      role: "Business Intelligence Portfolio Project",
      timeline: "2024 - 2025",
      tools: ["Tableau", "PostgreSQL", "Advanced Excel (XLOOKUP, Pivot Tables)"],
      problem: "Need for rapid exploratory analysis on customer acquisition costs, lifetime value, and churn rates across customer tiers.",
      solution: "Created interactive Tableau dashboards linked to PostgreSQL queries with calculated fields, cohort retention heatmaps, and dynamic parameter filters.",
      impact: [
        "Visualized 4 customer segments to pinpoint churn drivers.",
        "Demonstrated how cohort retention maps guide targeted marketing campaigns.",
        "Constructed drill-down hierarchies from high-level revenue to individual site orders."
      ]
    }
  };

  const modal = document.getElementById('projectModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-open-case');
      const data = caseStudies[projKey];
      if (!data || !modal) return;

      modalTitle.textContent = data.title;
      modalContent.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 1.25rem;">
            <div style="color: var(--accent-primary); font-weight: 700; font-size: 0.9rem;">${data.role}</div>
            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.25rem;">${data.timeline}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.75rem;">
              ${data.tools.map(t => `<span class="tech-badge" style="font-size: 0.75rem;">${t}</span>`).join('')}
            </div>
          </div>

          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">Business Challenge</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.problem}</p>
          </div>

          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem;">Data Analyst Solution</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">${data.solution}</p>
          </div>

          <div>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.6rem;">Key Results & Business Impact</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.5rem;">
              ${data.impact.map(item => `
                <li style="display: flex; align-items: baseline; gap: 0.5rem; color: var(--text-primary); font-size: 0.925rem;">
                  <span style="color: #10b981; font-weight: bold;">✓</span>
                  <span>${item}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;
      modal.showModal();
    });
  });

  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const resumeCloseBtn = document.getElementById('resumeCloseBtn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.showModal();
    });
  });

  if (modalCloseBtn && modal) modalCloseBtn.addEventListener('click', () => modal.close());
  if (resumeCloseBtn && resumeModal) resumeCloseBtn.addEventListener('click', () => resumeModal.close());

  [modal, resumeModal].forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        const rect = m.getBoundingClientRect();
        const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
        if (!isInDialog) m.close();
      });
    }
  });
}

/* ==========================================================================
   10. Contact Form & Clipboard
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('senderSubject').value.trim();
    const message = document.getElementById('senderMessage').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.');
      return;
    }

    const mailtoUri = `mailto:nowmiyaj@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + message)}`;
    window.location.href = mailtoUri;
    showToast('Opening your email client...');
    form.reset();
  });
}

function initCopyActions() {
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const text = el.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied "${text}" to clipboard!`);
      }).catch(() => {
        showToast(`Contact: ${text}`);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   11. Certificate Lightbox & Verification Viewer
   ========================================================================== */
function initCertModal() {
  const certData = {
    datascience: {
      title: "Data Science & Analytics Certification Course",
      subtitle: "Python Statistics & Data Analysis",
      issuer: "GUVI Geek Networks • HCL & Google for Education Partner",
      recipient: "Nowmiya J",
      issuedDate: "September 17, 2026",
      certId: "19K28X1137c8b163tm",
      image: "assets/certificates/cert_guvi_datascience.png",
      verifyUrl: "https://www.guvi.in/certificate?id=19K28X1137c8b163tm"
    },
    excel: {
      title: "Microsoft Excel Complete Course",
      subtitle: "Data Analysis and Spreadsheet Skills",
      issuer: "GUVI Geek Networks • HCL & Google for Education Partner",
      recipient: "Nowmiya J",
      issuedDate: "May 18, 2025",
      certId: "7fdC4N02b7J791s557",
      image: "assets/certificates/cert_guvi_excel.png",
      verifyUrl: "https://www.guvi.in/certificate?id=7fdC4N02b7J791s557"
    },
    infosys: {
      title: "Artificial Intelligence For All",
      subtitle: "Course Completion Certificate",
      issuer: "Infosys Springboard",
      recipient: "Nowmiya J",
      issuedDate: "February 12, 2025",
      certId: "Infosys Wingspan ID (Scan QR)",
      image: "assets/certificates/cert_infosys_ai.png",
      verifyUrl: "https://verify.onwingspan.com"
    }
  };

  const modal = document.getElementById('certModal');
  const modalTitle = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalImg = document.getElementById('certModalImg');
  const modalDate = document.getElementById('certModalDate');
  const modalId = document.getElementById('certModalId');
  const modalRecipient = document.getElementById('certModalRecipient');
  const verifyBtn = document.getElementById('certVerifyBtn');
  const closeBtn = document.getElementById('certCloseBtn');

  document.querySelectorAll('[data-cert-id]').forEach(card => {
    card.addEventListener('click', () => {
      const certId = card.getAttribute('data-cert-id');
      const data = certData[certId];
      if (!data || !modal) return;

      modalTitle.textContent = data.title;
      modalIssuer.textContent = data.issuer;
      modalImg.src = data.image;
      modalImg.alt = `${data.title} - Nowmiya J`;
      modalDate.textContent = data.issuedDate;
      modalId.textContent = data.certId;
      modalRecipient.textContent = data.recipient;
      verifyBtn.href = data.verifyUrl;

      modal.showModal();
    });
  });

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.close());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
        && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) modal.close();
    });
  }
}

