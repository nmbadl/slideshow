/* ============================================================
   Our Adventures Together — slideshow engine
   ============================================================ */
(function () {
  "use strict";

  const slides   = Array.from(document.querySelectorAll('.slide'));
  const total    = slides.length;
  const progress = document.getElementById('progress');
  const counter  = document.getElementById('counter');
  const dotsWrap = document.getElementById('dots');
  const playBtn  = document.getElementById('playBtn');
  const musicBtn = document.getElementById('musicBtn');
  const fsBtn    = document.getElementById('fsBtn');
  const music    = document.getElementById('music');

  let current   = 0;
  let playing   = false;
  let timer     = null;
  const DURATION = 6500; // ms per slide in autoplay

  /* ---------- build dots ---------- */
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); });
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  /* ---------- core navigation ---------- */
  function render() {
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    counter.innerHTML = '<b>' + (current + 1) + '</b> / ' + total;
    progress.style.width = ((current + 1) / total * 100) + '%';
  }

  function goTo(i) {
    current = (i + total) % total;
    render();
    if (playing) restartTimer();
  }
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  /* ---------- autoplay ---------- */
  function restartTimer() {
    clearInterval(timer);
    timer = setInterval(next, DURATION);
  }
  function setPlaying(state) {
    playing = state;
    playBtn.textContent = playing ? '❚❚' : '▶';
    playBtn.classList.toggle('on', playing);
    if (playing) { restartTimer(); } else { clearInterval(timer); }
  }

  /* ---------- controls ---------- */
  document.getElementById('next').addEventListener('click', (e) => { e.stopPropagation(); next(); });
  document.getElementById('prev').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  playBtn.addEventListener('click', (e) => { e.stopPropagation(); setPlaying(!playing); });

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.volume = 0.35;
      music.play().then(() => musicBtn.classList.add('on'))
                  .catch(() => { /* autoplay blocked; needs gesture (this is one) */ });
    } else {
      music.pause();
      musicBtn.classList.remove('on');
    }
  });

  fsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      (document.documentElement.requestFullscreen || (()=>{})).call(document.documentElement);
    } else {
      document.exitFullscreen && document.exitFullscreen();
    }
  });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft') { prev(); }
    else if (e.key === 'Home') { goTo(0); }
    else if (e.key === 'End')  { goTo(total - 1); }
    else if (e.key.toLowerCase() === 'p') { setPlaying(!playing); }
    else if (e.key === 'Escape' && document.fullscreenElement) { document.exitFullscreen(); }
  });

  /* ---------- click / tap to advance + heart burst ---------- */
  const stage = document.getElementById('stage');
  stage.addEventListener('click', (e) => {
    heartBurst(e.clientX, e.clientY);
    // advance unless clicking left third (go back)
    if (e.clientX < window.innerWidth * 0.28) { prev(); } else { next(); }
  });

  function heartBurst(x, y) {
    const hearts = ['❤', '✦', '★', '✧', '♥'];
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('div');
      el.className = 'burst';
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.left = (x + (Math.random() * 60 - 30)) + 'px';
      el.style.top  = (y + (Math.random() * 20 - 10)) + 'px';
      el.style.color = ['#ff6b6b', '#f7c873', '#ff8fab', '#fff'][Math.floor(Math.random()*4)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1000);
    }
  }

  /* ---------- swipe (touch) ---------- */
  let sx = 0, sy = 0;
  stage.addEventListener('touchstart', (e) => {
    sx = e.changedTouches[0].clientX; sy = e.changedTouches[0].clientY;
  }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - sx;
    const dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  }, { passive: true });

  /* ---------- floating particles ---------- */
  (function makeParticles() {
    const wrap = document.getElementById('particles');
    const count = window.innerWidth < 640 ? 20 : 38;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 10 + 4;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.setProperty('--drift', (Math.random() * 120 - 60) + 'px');
      p.style.animationDuration = (Math.random() * 12 + 10) + 's';
      p.style.animationDelay = (Math.random() * -20) + 's';
      wrap.appendChild(p);
    }
  })();

  /* ---------- init ---------- */
  render();
  // gentle auto-start of autoplay after a short beat
  setTimeout(() => setPlaying(true), 3500);
})();
