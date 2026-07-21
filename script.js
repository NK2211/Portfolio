/* ==========================================================================
   Navaneeth Krishnan — Portfolio Script
   Modular vanilla JS: theme toggle, nav, typing, particles, AOS,
   skill bars, counters, scroll progress, contact form.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initParticles();
  initTyped();
  initAOS();
  initNavbar();
  initMobileMenu();
  initScrollSpy();
  initScrollProgress();
  initBackToTop();
  initSkillBars();
  initCounters();
  initContactForm();
  initFooterYear();
});

/* ---------- Page Loader ---------- */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.body.classList.add('loaded');
      if (loader) loader.setAttribute('aria-hidden', 'true');
    }, 400);
  });
}

/* ---------- Dark / Light Theme ---------- */
function initTheme() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');
  const STORAGE_KEY = 'nk-portfolio-theme';

  const stored = safeGet(STORAGE_KEY);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initial = stored || (prefersLight ? 'light' : 'dark');
  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    safeSet(STORAGE_KEY, next);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      root.removeAttribute('data-theme');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* ignore (private mode etc.) */ }
  }
}

/* ---------- Particles.js background ---------- */
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 900 } },
      color: { value: ['#4f7cff', '#9d4fff', '#4fd8ff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 2.5, random: true },
      line_linked: {
        enable: true,
        distance: 140,
        color: '#6b7fff',
        opacity: 0.22,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 150, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
}

/* ---------- Typed.js hero animation ---------- */
function initTyped() {
  const el = document.getElementById('typed');
  if (!el || typeof Typed === 'undefined') return;

  new Typed('#typed', {
    strings: ['Software Developer', 'AI Enthusiast', 'Data Analyst', 'Full Stack Developer'],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 400,
    loop: true,
    showCursor: false
  });
}

/* ---------- AOS (Animate On Scroll) ---------- */
function initAOS() {
  if (typeof AOS === 'undefined') return;
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
}

/* ---------- Navbar background on scroll ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const toggleScrolled = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 24);
  };
  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
}

/* ---------- Mobile menu ---------- */
function initMobileMenu() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Scroll spy for active nav link ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${pct}%`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Animated skill progress bars ---------- */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-bars .fill');
  if (!fills.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const width = fill.getAttribute('data-width') || '0';
          fill.style.width = `${width}%`;
          obs.unobserve(fill);
        }
      });
    },
    { threshold: 0.4 }
  );

  fills.forEach((fill) => observer.observe(fill));
}

/* ---------- Animated stat / achievement counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-count]');
  if (!counters.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ---------- Contact form (client-side only — no backend wired up) ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in all required fields.';
      status.style.color = '#ff6b6b';
      return;
    }

    // No backend is wired up yet — replace this block with a fetch() call
    // to your form endpoint (e.g. Formspree, EmailJS, or a serverless function)
    // when you deploy this site.
    status.style.color = '';
    status.textContent = `Thanks, ${name.split(' ')[0]}! Your message is ready to send — connect a form endpoint to deliver it.`;
    form.reset();
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
