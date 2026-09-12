const body = document.body;
const themeToggle = document.querySelector('#themeToggle');
const menuToggle = document.querySelector('#menuToggle');
const mobileNav = document.querySelector('#mobileNav');
const savedTheme = localStorage.getItem('profile-theme');

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach((link) => {
  const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
  if (linkPage === currentPage) link.setAttribute('aria-current', 'page');
});

if (savedTheme === 'dark') body.dataset.theme = 'dark';

themeToggle.addEventListener('click', () => {
  const isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('profile-theme', isDark ? 'light' : 'dark');
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to dark theme' : 'Switch to light theme');
});

const updateMenu = (open) => {
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};

menuToggle.addEventListener('click', () => updateMenu(!mobileNav.classList.contains('open')));
document.querySelectorAll('.mobile-nav a').forEach((link) => link.addEventListener('click', () => updateMenu(false)));

document.querySelectorAll('.teach-filter').forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.teachFilter;
    document.querySelectorAll('.teach-filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelectorAll('.teaching-card').forEach((card) => {
      const visible = filter === 'all' || card.dataset.teachCategory === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
