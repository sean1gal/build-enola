/* ============================================================
   PRICES — Shared price config for Build Enola
   Change here. Updates everywhere.
   © Sean Gal | enolarevenu.com
============================================================ */

const PRICES = {
  build:  49,
  proven: 129
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-price]').forEach(el => {
    const tier = el.dataset.price;
    if (PRICES[tier] !== undefined) {
      el.textContent = '$' + PRICES[tier];
    }
  });
});
