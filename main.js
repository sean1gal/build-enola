/* ============================================================
   Build Enola — main.js
   © Sean Gal | enolarevenu.com
============================================================ */

// ---- Org diagram entrance ---------------------------------

function initOrgDiagram() {
  const diagram = document.getElementById('org-diagram');
  if (!diagram) return;
  setTimeout(() => {
    diagram.classList.add('is-live');
  }, 300);
}

// ---- Scroll reveal — sections ----------------------------

const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      revealObs.unobserve(e.target);
    }
  }),
  { threshold: 0.07, rootMargin: '0px 0px -24px 0px' }
);
reveals.forEach(el => revealObs.observe(el));

// ---- Stagger reveal-items --------------------------------

const itemParents = new Set();

document.querySelectorAll('.reveal-item').forEach(item => {
  const parent = item.parentElement;
  if (!itemParents.has(parent)) {
    itemParents.add(parent);
    new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        parent.querySelectorAll('.reveal-item').forEach((el, i) => {
          el.style.setProperty('--i', i);
          setTimeout(() => el.classList.add('is-visible'), i * 80);
        });
      }
    }, { threshold: 0.07 }).observe(item);
  }
});

// ---- Mobile sticky CTA -----------------------------------

const sticky = document.getElementById('mobile-sticky');
const hero   = document.querySelector('.hero');

if (sticky && hero) {
  new IntersectionObserver(
    ([e]) => sticky.classList.toggle('is-visible', !e.isIntersecting),
    { threshold: 0 }
  ).observe(hero);
}

// ---- FAQ accordion (one open at a time) ------------------

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item && other.open) other.open = false;
      });
    }
  });
});

// ---- Smooth anchor scroll --------------------------------

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72;
    window.scrollTo({
      top: target.getBoundingClientRect().top + scrollY - offset,
      behavior: 'smooth'
    });
  });
});

// ---- Nav shadow on scroll --------------------------------

const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = scrollY > 10
      ? '0 1px 24px rgba(28,20,16,0.07)'
      : 'none';
  }, { passive: true });
}

// ---- Countdown to price rise — April 15, 2026 -----------

function initCountdown() {
  const timer = document.getElementById('countdown-timer');
  if (!timer) return;

  const deadline = new Date('2026-04-15T23:59:59');

  function tick() {
    const now  = new Date();
    const diff = deadline - now;

    if (diff <= 0) {
      const bar = timer.closest('.countdown-bar');
      if (bar) bar.style.display = 'none';
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const pad = n => String(n).padStart(2, '0');
    timer.textContent = d > 0
      ? `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`
      : `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
  }

  tick();
  setInterval(tick, 1000);
}

// ---- Scramble utility ----------------------------------------
// Preserves the target string's original casing during scramble

function scrambleTo(el, target, onDone) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  let frame = 0;
  const totalFrames = 16;

  // Cancel any running scramble on this element
  if (el._scrambleTimer) clearInterval(el._scrambleTimer);

  el._scrambleTimer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;

    el.textContent = target.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (i / target.length < progress) return target[i];
      const r = lower[Math.floor(Math.random() * lower.length)];
      return char === char.toUpperCase() && char !== char.toLowerCase()
        ? r.toUpperCase()
        : r;
    }).join('');

    if (frame >= totalFrames) {
      el.textContent = target;
      clearInterval(el._scrambleTimer);
      el._scrambleTimer = null;
      if (onDone) onDone();
    }
  }, 35);
}

// ---- Footer: "Enola Revenu" ↔ "U Never Alone" ---------------

function initAnagram() {
  const brand = document.getElementById('footer-brand');
  if (!brand) return;

  const original = 'Enola Revenu';
  const reveal   = 'U Never Alone';

  brand.addEventListener('mouseenter', () => scrambleTo(brand, reveal));
  brand.addEventListener('mouseleave', () => scrambleTo(brand, original));
}

// ---- Data-attribute scrambles — scattered Easter eggs --------

function initEasterEggs() {
  document.querySelectorAll('[data-scramble-to]').forEach(el => {
    const original = el.textContent;
    const target   = el.dataset.scrambleTo;
    el.style.cursor = 'default';
    el.addEventListener('mouseenter', () => scrambleTo(el, target));
    el.addEventListener('mouseleave', () => scrambleTo(el, original));
  });
}

// ---- Init ------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initOrgDiagram();
  initCountdown();
  initAnagram();
  initEasterEggs();
});
