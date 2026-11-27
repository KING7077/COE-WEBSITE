/* Shared header, footer and page behaviour for every page. */

const CALENDAR_PDF = './assets/files/IITH-Academic-Calendar-Jul-Nov-2026.pdf';

const ICONS = {
  chevron: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  mail: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  phone: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  pin: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  up: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>',
};

const NAV = [
  { label: 'Home', href: 'index.html' },
  {
    label: 'About', children: [
      { label: 'About IITH', href: 'index.html#aboutiith' },
      { label: 'About CO', href: 'aboutcoe.html' },
      { label: 'Announcements', href: 'index.html#announcements' },
      { label: 'Message from HOD', href: 'hod.html' },
    ],
  },
  {
    label: 'Academics', children: [
      { label: 'Academic Calendar', href: CALENDAR_PDF, external: true },
      { label: 'Curriculum', href: 'curriculum.html' },
      { label: 'Courses', href: 'courses.html' },
      { label: 'Time Tables', href: 'time_tables.html' },
    ],
  },
  {
    label: 'People', children: [
      { label: 'Faculty', href: 'faculty.html' },
      { label: 'Students', href: 'students.html' },
      { label: 'Alumni', href: 'alumni.html' },
    ],
  },
  { label: 'Internships & Placements', href: 'internships_placements.html' },
];

function currentPage() {
  const file = window.location.pathname.split('/').pop() || 'index.html';
  return file.endsWith('.html') ? file : `${file}.html`;
}

function isActive(href) {
  if (!href || href.startsWith('./assets')) return false;
  const [file, hash] = href.split('#');
  if (file !== currentPage()) return false;
  if (hash) return window.location.hash === `#${hash}`;
  return !window.location.hash || currentPage() !== 'index.html';
}

function linkAttrs(item) {
  return item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const items = NAV.map((item, i) => {
      if (!item.children) {
        return `<li><a class="nav-link" href="${item.href}">${item.label}</a></li>`;
      }
      const sub = item.children
        .map(c => `<li><a href="${c.href}"${linkAttrs(c)}>${c.label}</a></li>`)
        .join('');
      return `
        <li class="nav-item">
          <a class="nav-link" href="#" role="button" aria-expanded="false" aria-controls="submenu-${i}">${item.label}${ICONS.chevron}</a>
          <ul class="nav-menu" id="submenu-${i}">${sub}</ul>
        </li>`;
    }).join('');

    this.innerHTML = `
      <a class="skip-link" href="#main">Skip to content</a>
      <div class="topbar">
        <div class="container">
          <span class="topbar-meta">Department of Computational Engineering, Indian Institute of Technology Hyderabad</span>
          <span class="topbar-links">
            <a href="mailto:head@co.iith.ac.in">head@co.iith.ac.in</a>
            <a href="https://www.iith.ac.in/" target="_blank" rel="noopener noreferrer">iith.ac.in</a>
          </span>
        </div>
      </div>
      <header class="site-header" id="top">
        <div class="container">
          <a href="index.html" class="brand" aria-label="Computational Engineering, IIT Hyderabad — Home">
            <img src="./assets/images/iithlogo.png" alt="" width="44" height="44" />
            <span class="brand-text">
              <span class="brand-name">Computational Engineering</span>
              <span class="brand-sub">Indian Institute of Technology Hyderabad</span>
            </span>
          </a>
          <nav class="site-nav" id="site-nav" aria-label="Main navigation">
            <ul class="nav-list">${items}</ul>
            <div class="nav-cta"><a class="btn btn-dark btn-sm" href="contact.html">Contact</a></div>
          </nav>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${ICONS.menu}</button>
        </div>
      </header>`;

    // The header sits after the topbar; make the custom element itself non-sticky
    // so the inner <header> can stick to the viewport.
    this.style.display = 'contents';

    const header = this.querySelector('.site-header');
    const nav = this.querySelector('.site-nav');
    const toggle = this.querySelector('.menu-toggle');

    // Active states
    this.querySelectorAll('.site-nav a[href]').forEach(a => {
      if (isActive(a.getAttribute('href'))) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
        const parent = a.closest('.nav-item');
        if (parent) parent.querySelector('.nav-link').classList.add('active');
      }
    });

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setOpen = open => {
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open ? ICONS.close : ICONS.menu;
      if (open) nav.style.setProperty('--nav-top', `${header.getBoundingClientRect().bottom}px`);
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    window.addEventListener('resize', () => { if (window.innerWidth > 1100) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

    this.querySelectorAll('.nav-item > .nav-link').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const li = link.parentElement;
        const open = !li.classList.contains('open');
        li.classList.toggle('open', open);
        link.setAttribute('aria-expanded', String(open));
      });
    });

    nav.querySelectorAll('.nav-menu a, .nav-list > li > a:not([role])').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();
    this.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <div>
            <div class="footer-brand">
              <img src="./assets/images/iithlogo.png" alt="" width="44" height="44" />
              <div>
                <b>Computational Engineering</b>
                <span>Indian Institute of Technology Hyderabad</span>
              </div>
            </div>
            <p class="footer-about">India's first undergraduate program dedicated to computational engineering, launched at IIT Hyderabad in 2021.</p>
            <div class="footer-video">
              <iframe src="https://www.youtube-nocookie.com/embed/WotHf4J8kiQ?mute=1&loop=1&playlist=WotHf4J8kiQ" title="IIT Hyderabad campus tour" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          </div>
          <div>
            <div class="footer-h">Academics</div>
            <ul class="footer-links">
              <li><a href="curriculum.html">Curriculum</a></li>
              <li><a href="time_tables.html">Time Tables</a></li>
              <li><a href="courses.html">Courses</a></li>
              <li><a href="${CALENDAR_PDF}" target="_blank" rel="noopener noreferrer">Academic Calendar</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-h">Department</div>
            <ul class="footer-links">
              <li><a href="aboutcoe.html">About CO</a></li>
              <li><a href="hod.html">Message from HOD</a></li>
              <li><a href="faculty.html">Faculty</a></li>
              <li><a href="students.html">Students</a></li>
              <li><a href="alumni.html">Alumni</a></li>
              <li><a href="internships_placements.html">Internships &amp; Placements</a></li>
              <li><a href="https://www.iith.ac.in/" target="_blank" rel="noopener noreferrer">IIT Hyderabad website</a></li>
            </ul>
          </div>
          <div>
            <div class="footer-h">Contact</div>
            <div class="footer-contact">
              <div>${ICONS.mail}<span><a href="mailto:head@co.iith.ac.in">head@co.iith.ac.in</a><br><a href="mailto:dugc@co.iith.ac.in">dugc@co.iith.ac.in</a></span></div>
              <div>${ICONS.phone}<span>040-2301-6670</span></div>
              <div>${ICONS.pin}<span>Near NH-65, Kandi, Sangareddy<br>Telangana, India 502284</span></div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <span>© ${year} Computational Engineering Program, IIT Hyderabad. All rights reserved.</span>
            <a href="#top" class="back-top">Back to top</a>
          </div>
        </div>
      </footer>`;

    this.querySelector('.back-top').addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);


/* Escape text before putting it in HTML strings. */
function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}
