/* ============================================================
   THE SEVEN OPERATING SYSTEM — Interactions
   © Sean Gal | enolarevenu.com
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Flow diagram activation ── */
  const diagram = document.getElementById('org-diagram');
  if (diagram) {
    setTimeout(() => diagram.classList.add('is-live'), 300);
  }

  /* ── Scroll animations ── */
  const animTargets = [
    { selector: '.agent-section',  threshold: 0.08 },
    { selector: '.cy-law-card',    threshold: 0.15 },
    { selector: '.handoff-row',    threshold: 0.12 }
  ];

  animTargets.forEach(({ selector, threshold }) => {
    const items = document.querySelectorAll(selector);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Array.from(items).indexOf(entry.target) * 60;
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold, rootMargin: '0px 0px -40px 0px' });

    items.forEach(el => obs.observe(el));
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
