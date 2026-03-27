/* Build Enola — Option B JS © Sean Gal | enolarevenu.com */

// Scroll reveal — sections
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } }),
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
reveals.forEach(el => revealObs.observe(el));

// Stagger reveal-items
const itemGroups = new Set();
document.querySelectorAll('.reveal-item').forEach(item => {
  const p = item.parentElement;
  if (!itemGroups.has(p)) {
    itemGroups.add(p);
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          p.querySelectorAll('.reveal-item').forEach((el, i) => {
            setTimeout(() => el.classList.add('is-visible'), i * 80);
          });
        }
      });
    }, { threshold: 0.08 }).observe(item);
  }
});

// Mobile sticky
const sticky = document.getElementById('mobile-sticky');
const hero   = document.querySelector('.hero');
if (sticky && hero) {
  new IntersectionObserver(
    ([e]) => sticky.classList.toggle('is-visible', !e.isIntersecting),
    { threshold: 0 }
  ).observe(hero);
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq-item').forEach(o => { if (o !== item) o.open = false; });
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 32, behavior: 'smooth' }); }
  });
});
