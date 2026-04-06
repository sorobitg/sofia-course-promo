/* =====================================================
   Sofía — Animated Course Promo | Main Script
   ===================================================== */

/* ── Starfield ───────────────────────────────────────────── */
(function initStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  const COUNT = 160;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStar() {
    return {
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      r:    Math.random() * 1.4 + .2,
      a:    Math.random(),
      da:   (Math.random() * .006 + .001) * (Math.random() > .5 ? 1 : -1),
      vx:   (Math.random() - .5) * .08,
      vy:   (Math.random() - .5) * .08,
    };
  }

  function initStarArray() {
    stars = Array.from({ length: COUNT }, createStar);
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.a += s.da;
      if (s.a > 1 || s.a < 0) s.da *= -1;
      s.x += s.vx;
      s.y += s.vy;
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width)  s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,180,255,${s.a})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  resize();
  initStarArray();
  tick();
  window.addEventListener('resize', () => { resize(); initStarArray(); });
})();

/* ── Scroll Reveal ───────────────────────────────────────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  els.forEach(el => io.observe(el));
})();

/* ── Animated Counters ───────────────────────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(
    (entries) => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el    = e.target;
      const end   = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      const step  = 16;
      const steps = duration / step;
      let current = 0;
      const inc = end / steps;

      const timer = setInterval(() => {
        current += inc;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        el.textContent = Number.isInteger(end)
          ? Math.floor(current) + suffix
          : current.toFixed(1) + suffix;
      }, step);

      io.unobserve(el);
    }),
    { threshold: 0.5 }
  );
  counters.forEach(c => io.observe(c));
})();

/* ── Draggable Carousel ──────────────────────────────────── */
(function initCarousel() {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  let isDown = false, startX = 0, scrollLeft = 0;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  track.addEventListener('mouseleave', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mouseup',    () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x    = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.6;
    track.scrollLeft = scrollLeft - walk;
  });
})();

/* ── Reel Play Animation ─────────────────────────────────── */
(function initReelPlay() {
  const btn = document.getElementById('reel-play-btn');
  const screen = document.getElementById('reel-screen');
  if (!btn || !screen) return;

  let playing = false;

  btn.addEventListener('click', () => {
    playing = !playing;
    btn.textContent = playing ? '⏸' : '▶';

    if (playing) {
      screen.classList.add('playing');
      startReelAnimation(screen);
    } else {
      screen.classList.remove('playing');
    }
  });

  function startReelAnimation(screen) {
    const frames = [
      { emoji: '✨', text: 'Meet Sofía…' },
      { emoji: '🎯', text: 'Your course deserves attention' },
      { emoji: '🚀', text: 'Stop the scroll' },
      { emoji: '💜', text: 'Connect with emotion' },
      { emoji: '📈', text: 'Convert viewers → buyers' },
      { emoji: '🎬', text: 'Powered by AI + Story' },
    ];

    const reelText = screen.querySelector('.reel-text');
    let i = 0;

    const iv = setInterval(() => {
      if (!screen.classList.contains('playing')) { clearInterval(iv); return; }
      const f = frames[i % frames.length];
      reelText.style.opacity = '0';
      setTimeout(() => {
        reelText.innerHTML = `<span style="font-size:2rem;display:block;margin-bottom:.4rem">${f.emoji}</span>${f.text}`;
        reelText.style.opacity = '1';
      }, 220);
      i++;
    }, 2000);
  }
})();

/* ── Sparkles around Character ───────────────────────────── */
(function initSparkles() {
  const scene = document.querySelector('.character-scene');
  if (!scene) return;

  const COLORS = ['#7C3AED', '#EC4899', '#F59E0B', '#A78BFA', '#FBCFE8'];

  for (let i = 0; i < 10; i++) {
    const sp = document.createElement('div');
    sp.classList.add('sparkle');
    const size = Math.random() * 6 + 3;
    Object.assign(sp.style, {
      width:  size + 'px',
      height: size + 'px',
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
      left: (Math.random() * 90 + 5) + '%',
      top:  (Math.random() * 90 + 5) + '%',
      '--dur':   (Math.random() * 2 + 1.8) + 's',
      '--delay': (Math.random() * 2) + 's',
    });
    scene.appendChild(sp);
  }
})();

/* ── Nav scroll effect ───────────────────────────────────── */
(function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40
      ? 'rgba(15,10,30,.95)'
      : 'rgba(15,10,30,.75)';
  }, { passive: true });
})();
