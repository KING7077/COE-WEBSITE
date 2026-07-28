class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="header" class="header" style="box-shadow: var(--shadow-xs)">
      <div class="container-fluid container-xl position-relative d-flex align-items-center justify-content-between" style="height: 100%">
        <a href="index.html" class="logo" aria-label="Computational Engineering, IIT Hyderabad — Home">
          <img src="./assets/images/iithlogo.png" class="logo-img" alt="IIT Hyderabad Logo" />
          <div class="logo-text">
            <h1>Computational Engineering</h1>
            <h2>Indian Institute of Technology, Hyderabad</h2>
          </div>
        </a>
        <nav id="navmenu" class="navmenu" role="navigation" aria-label="Main navigation">
          <ul>
            <li><a href="index.html">Home</a></li>
            <li class="dropdown">
              <a href="#" aria-haspopup="true"><span>About Us</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-left: 2px;"><path d="m6 9 6 6 6-6"/></svg></a>
              <ul>
                <li><a href="index.html#aboutiith">About IITH</a></li>
                <li><a href="aboutcoe.html">About CO</a></li>
                <li><a href="index.html#announcements">Announcements</a></li>
                <li><a href="hod.html">Message from HOD</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" aria-haspopup="true"><span>Academics</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-left: 2px;"><path d="m6 9 6 6 6-6"/></svg></a>
              <ul>
                <li><a href="./assets/files/IITH-Academic-Calendar-Jan-Apr-2026.pdf" target="_blank" rel="noopener noreferrer">Academic Calendar</a></li>
                <li><a href="curriculum.html">Curriculum</a></li>
                <li><a href="courses.html">Courses</a></li>
                <li><a href="time_tables.html">Time Tables</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a href="#" aria-haspopup="true"><span>People</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-left: 2px;"><path d="m6 9 6 6 6-6"/></svg></a>
              <ul>
                <li><a href="faculty.html">Faculty</a></li>
                <li><a href="students.html">Students</a></li>
                <li><a href="alumni.html">Alumni</a></li>
              </ul>
            </li>
            <li><a href="internships_placements.html">Internships & Placements</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <button id="menuToggle" type="button" class="menu-toggle d-xl-none" aria-label="Open navigation menu" aria-controls="navmenu">
            <svg class="menu-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            <svg class="close-icon d-none" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </nav>
      </div>
    </div>
    `;

    // Interactive logic
    const header = this.querySelector('#header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'var(--shadow-xs)';
      }
    });

    const menuToggle = this.querySelector('#menuToggle');
    const navUl = this.querySelector('#navmenu > ul');
    const menuIcon = this.querySelector('.menu-icon');
    const closeIcon = this.querySelector('.close-icon');
    let mobileOpen = false;

    const toggleMenu = () => {
      mobileOpen = !mobileOpen;
      if (mobileOpen) {
        navUl.classList.add('show');
        menuIcon.classList.add('d-none');
        closeIcon.classList.remove('d-none');
      } else {
        navUl.classList.remove('show');
        menuIcon.classList.remove('d-none');
        closeIcon.classList.add('d-none');
      }
    };

    menuToggle.addEventListener('click', toggleMenu);

    const dropdowns = this.querySelectorAll('.dropdown > a');
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
          e.preventDefault();
          const parentLi = dropdown.parentElement;
          parentLi.classList.toggle('active');
        }
      });
    });

    // Mark active link
    const updateActiveLinks = () => {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const currentHash = window.location.hash || '';
      const currentFullPath = currentPath + currentHash;
      const links = this.querySelectorAll('nav a');
      
      // Clear all active classes first
      links.forEach(link => link.classList.remove('active'));
      
      // Apply active class based on current path and hash
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentFullPath || (currentHash === '' && href === currentPath)) {
          link.classList.add('active');
          const parentDropdown = link.closest('.dropdown');
          if (parentDropdown) {
            parentDropdown.querySelector('a').classList.add('active');
          }
        }
      });
    };

    updateActiveLinks();
    window.addEventListener('hashchange', updateActiveLinks);
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer-wrapper">
      <div class="footer-top">
        <div class="footer-grid">
          <div class="footer-col">
            <h4>IIT Hyderabad</h4>
            <div class="video-container">
              <iframe src="https://www.youtube.com/embed/WotHf4J8kiQ?mute=1&loop=1&playlist=WotHf4J8kiQ" title="IIT Hyderabad Campus Tour" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <a href="https://www.iith.ac.in/" target="_blank" rel="noopener noreferrer" class="footer-link">IIT Hyderabad</a>
            <a href="./assets/files/IITH-Academic-Calendar-Jan-Apr-2026.pdf" target="_blank" rel="noopener noreferrer" class="footer-link">Academic Calendar</a>
            <a href="curriculum.html" class="footer-link">Curriculum</a>
            <a href="internships_placements.html" class="footer-link">Internships & Placements</a>
            <a href="faculty.html" class="footer-link">Faculty</a>
            <a href="contact.html" class="footer-link">Contact Us</a>
          </div>
          <div class="footer-col">
            <h4>Contact Us</h4>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div>
                <div style="margin-bottom: 0.25rem;"><a href="mailto:head@co.iith.ac.in" style="color: inherit;">head@co.iith.ac.in</a></div>
                <div><a href="mailto:dugc@co.iith.ac.in" style="color: inherit;">dugc@co.iith.ac.in</a></div>
              </div>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>040-2301-6359</span>
            </div>
            <div class="footer-contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Near NH-65, Sangareddy, Kandi<br />Telangana, India — 502285</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="footer-divider" />
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} Computational Engineering Programme, IIT Hyderabad. All rights reserved.</span>
        <a href="#top" class="btn-back-top" aria-label="Back to top">Back to top ↑</a>
        <span>Built with Vanilla HTML/JS</span>
      </div>
    </footer>
    `;

    const backToTop = this.querySelector('.btn-back-top');
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// ── Scroll Reveal & Custom Cursor ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Custom cursor (fine-pointer devices only)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (isFinePointer) {
    let cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.className = 'custom-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cursor);

      const moveCursor = (e) => {
        cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      };
      document.addEventListener('mousemove', moveCursor, { passive: true });
    }

    const onEnter = () => cursor.classList.add('hover');
    const onLeave = () => cursor.classList.remove('hover');
    const targets = document.querySelectorAll('a, button, [role="button"]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter, { passive: true });
      el.addEventListener('mouseleave', onLeave, { passive: true });
    });
  }

  // Scroll Reveal
  const REVEAL_SELECTORS = [
    '.page-hero', '.aboutiith', '.div-2', '.card-section', '.screen-split',
    '.faculty-card', '.student-card', '.info-card', '.card-modern',
    '.feature-card', '.coordinator-card', '.hod-profile-card',
    '.section-title', '.footer-col'
  ].join(', ');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -40px 0px', threshold: 0.12 }
  );

  const attachReveal = () => {
    const elements = document.querySelectorAll(REVEAL_SELECTORS);
    elements.forEach((el, index) => {
      if (el.classList.contains('revealed')) return;
      // Stagger card-like elements
      const isCard = el.classList.contains('faculty-card') ||
                     el.classList.contains('student-card') ||
                     el.classList.contains('feature-card') ||
                     el.classList.contains('coordinator-card');
      if (isCard) {
        el.style.transitionDelay = `${(index % 5) * 80}ms`;
      }
      el.classList.add('reveal');
      observer.observe(el);
    });
  };

  setTimeout(attachReveal, 120);

  // Hash / scroll-to-top
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 150);
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
});

