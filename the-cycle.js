/* ============================================================
   THE CYCLE — Scroll animations
   © Sean Gal | enolarevenu.com
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Animate evidence items on scroll
  const evidenceItems = document.querySelectorAll('.cy-evidence-item');
  const evidenceObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${Array.from(evidenceItems).indexOf(entry.target) * 40}ms`;
        entry.target.classList.add('is-visible');
        evidenceObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  evidenceItems.forEach(item => evidenceObs.observe(item));

  // Animate step cards on scroll
  const steps = document.querySelectorAll('.cy-step');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  steps.forEach(step => observer.observe(step));

  // Animate diagnostic cards on hover — brief pulse
  const diagCards = document.querySelectorAll('.cy-diag-card');
  diagCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'border-color 200ms, box-shadow 200ms, transform 200ms';
    });
  });

  // Animate spiral cycles on scroll
  const spiralCycles = document.querySelectorAll('.cy-spiral-cycle');
  const spiralObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        spiralCycles.forEach((cycle, i) => {
          setTimeout(() => {
            cycle.style.transition = 'opacity 600ms ease, transform 600ms ease';
            cycle.style.opacity = cycle.style.opacity; // trigger reflow
          }, i * 150);
        });
        spiralObs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  if (spiralCycles.length) spiralObs.observe(spiralCycles[0].closest('.cy-spiral'));

  // Smooth scroll for any in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
