/* ============================================================
   Sofía Course Promo — Scroll & Interaction JS
   ============================================================ */
(function () {
  'use strict';

  /* ── Scroll-reveal (IntersectionObserver) ─────────────────── */
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ── Counter animation for stats ─────────────────────────── */
  const statEls = document.querySelectorAll('.stat__value');

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-quart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.innerHTML = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statEls.forEach((el) => statsObserver.observe(el));
  }

  /* ── Parallax on hero background glow ────────────────────── */
  const heroGlow = document.querySelector('.hero__bg-glow');

  function onScroll() {
    if (!heroGlow) return;
    const scrollY = window.scrollY;
    heroGlow.style.transform = `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.03}deg) scale(1)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Eye tracking — character pupils follow cursor ─────────── */
  const pupils = document.querySelectorAll('.pupil');
  const character = document.querySelector('.hero__character');

  if (character && pupils.length) {
    document.addEventListener('mousemove', (e) => {
      const rect = character.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const maxOffset = 4;
      const dx = Math.cos(angle) * maxOffset;
      const dy = Math.sin(angle) * maxOffset;

      pupils.forEach((p) => {
        p.style.transform = `translate(${dx}px, ${dy}px)`;
      });
    });
  }

  /* ── Smooth highlight underline on hero load ─────────────── */
  const heroHighlight = document.querySelector('.hero__title .highlight');
  if (heroHighlight) {
    setTimeout(() => heroHighlight.classList.add('visible'), 900);
  }

  /* ── Palette swatch tooltip keyboard accessibility ──────── */
  const swatches = document.querySelectorAll('.palette__swatch');
  swatches.forEach((swatch) => {
    swatch.setAttribute('tabindex', '0');
    swatch.setAttribute('role', 'img');
    swatch.setAttribute('aria-label', swatch.dataset.name + ' color swatch');
  });

  /* ── Hero CTA micro-interaction ──────────────────────────── */
  const primaryBtn = document.querySelector('.btn--primary');
  if (primaryBtn) {
    primaryBtn.addEventListener('mouseenter', () => {
      primaryBtn.style.transition = 'transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s';
    });
  }

  /* ── Particle mouse parallax ─────────────────────────────── */
  const particles = document.querySelectorAll('.particle');
  if (particles.length) {
    document.addEventListener('mousemove', (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 2;
      const my = (e.clientY / window.innerHeight - 0.5) * 2;

      particles.forEach((p, i) => {
        const depth = (i % 3 + 1) * 6;
        p.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
    }, { passive: true });
  }

  /* ── Active nav highlight on scroll (for future nav bar) ─── */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveSection() {
    const scrollMid = window.scrollY + window.innerHeight / 2;
    sections.forEach((section) => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollMid >= top && scrollMid < bottom) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
  }

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

})();
