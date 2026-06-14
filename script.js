// ===== Navbar: shadow on scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== Mobile menu toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const icon = navToggle.querySelector('i');
    icon.className = navLinks.classList.contains('open') ? 'fas fa-xmark' : 'fas fa-bars';
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.querySelector('i').className = 'fas fa-bars';
    });
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('section[id], header[id]');
const navItems = navLinks.querySelectorAll('a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navItems.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
    '.section-header, .skill-card, .project-card, .stack-category, .learning-item, .contact-card, .about-media, .about-text, .code-window'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${(i % 3) * 80}ms`;
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===== Animated stat counters =====
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const target = parseInt(raw, 10);
        if (!isNaN(target)) {
            const suffix = raw.replace(/[0-9]/g, '');
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 30));
            const tick = () => {
                current = Math.min(current + step, target);
                el.textContent = current + suffix;
                if (current < target) requestAnimationFrame(tick);
            };
            tick();
        }
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));
