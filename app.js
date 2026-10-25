(() => {
  'use strict';
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const closeMenu = () => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', () => { if (window.innerWidth > 700) closeMenu(); });
  }
  const page = document.body.dataset.page;
  if (page && nav) {
    nav.querySelectorAll('a[href]').forEach(link => {
      const target = link.getAttribute('href');
      if (target === page + '.html' || (page === 'home' && target === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();
