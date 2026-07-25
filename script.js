// ===== Mobile nav =====
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('mobileMenu');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  menu.classList.remove('open');
}));

// ===== Scroll reveal =====
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach((el) => {
  // stagger siblings for a livelier entrance
  const sibs = Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal'));
  el.style.transitionDelay = (sibs.indexOf(el) % 6) * 65 + 'ms';
  io.observe(el);
});

// ===== Waitlist form (front-end only) =====
const form = document.getElementById('waitForm');
const note = document.getElementById('formNote');
if (form && note) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = form.name.value.trim().split(' ')[0] || 'friend';
    note.textContent = `You're on the list, ${first}! We'll be in touch before the next Square. ✦`;
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 8000);
  });
}

// ===== Subtle pointer parallax for hero accents (desktop only) =====
const hero = document.querySelector('.hero');
const movers = hero ? hero.querySelectorAll('.dia') : [];
if (hero && window.matchMedia('(pointer:fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const dx = (e.clientX - r.left) / r.width - 0.5;
    const dy = (e.clientY - r.top) / r.height - 0.5;
    movers.forEach((el, i) => {
      const depth = (i % 4 + 1) * 6;
      el.style.translate = `${dx * depth}px ${dy * depth}px`;
    });
  });
}

// ===== Who-it's-for: light up the closing line after exploring a couple of badges =====
(() => {
  const minds = document.querySelectorAll('#who .mind');
  const home = document.getElementById('homeLine');
  if (!minds.length || !home) return;
  const seen = new Set();
  minds.forEach((m, i) => {
    const mark = () => { seen.add(i); if (seen.size >= 2) home.classList.add('lit'); };
    m.addEventListener('mouseenter', mark);
    m.addEventListener('click', mark);
  });
})();

// ===== First Square: interactive recap showcase (click a thumb to feature it) =====
(() => {
  const main = document.getElementById('showcaseMain');
  const media = document.getElementById('showcaseMedia');
  const img = document.getElementById('showcaseImg');
  const tag = document.getElementById('showcaseTag');
  const title = document.getElementById('showcaseTitle');
  const desc = document.getElementById('showcaseDesc');
  const thumbs = document.querySelectorAll('.showcase-thumbs .thumb');
  if (!main || !img || !thumbs.length) return;
  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      thumbs.forEach((t) => t.classList.remove('is-active'));
      btn.classList.add('is-active');
      main.classList.add('is-swapping');
      setTimeout(() => {
        img.src = btn.dataset.src;
        img.alt = btn.dataset.alt || '';
        tag.textContent = btn.dataset.tag;
        title.textContent = btn.dataset.title;
        desc.textContent = btn.dataset.desc;
        if (media) media.classList.toggle('has-reel', btn.hasAttribute('data-reel'));
        main.classList.remove('is-swapping');
      }, 170);
    });
  });
})();
