/* Claudius Angayen | Portfolio scripts */
(function () {
  'use strict';

  // ===== Theme toggle (black by default, light on request) =====
  var root = document.documentElement;
  var themeBtn = document.getElementById('themeBtn');
  function syncTheme() {
    var light = root.getAttribute('data-theme') === 'light';
    themeBtn.innerHTML = '<svg class="ico" aria-hidden="true"><use href="#i-' + (light ? 'moon' : 'sun') + '"/></svg>';
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  }
  if (themeBtn) {
    syncTheme();
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      syncTheme();
    });
  }

  // ===== Typing effect on the home page (edit the phrases!) =====
  var typed = document.getElementById('typed');
  if (typed) {
    var phrases = ['print("Hello, CITCS!")', 'building my first projects', 'debugging one error at a time', 'future software developer'];
    var p = 0, c = 0, deleting = false;
    (function type() {
      var word = phrases[p];
      typed.textContent = word.slice(0, c);
      if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
      if (deleting && c === 0) { deleting = false; p = (p + 1) % phrases.length; }
      c += deleting ? -1 : 1;
      setTimeout(type, deleting ? 35 : 75);
    })();
  }

  // ===== Phone switcher on the About me page =====
  var grid = document.querySelector('.profile-grid');
  var segButtons = document.querySelectorAll('.seg button');
  if (grid) {
    for (var s = 0; s < segButtons.length; s++) {
      segButtons[s].addEventListener('click', function () {
        grid.setAttribute('data-show', this.getAttribute('data-show'));
        for (var k = 0; k < segButtons.length; k++) {
          segButtons[k].setAttribute('aria-pressed', segButtons[k] === this ? 'true' : 'false');
        }
      });
    }
  }

  // ===== Cursor trail: the mouse path is plotted like a graph =====
  (function () {
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || calm) return;

    var html = document.documentElement;
    function make(tag, cls) { var el = document.createElement(tag); el.className = cls; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el); return el; }
    var cv = make('canvas', ''); cv.id = 'trail';
    var dot = make('div', 'cur-dot'), ring = make('div', 'cur-ring'), lab = make('div', 'cur-coords');
    var ctx = cv.getContext('2d');
    var W = 0, H = 0, LIFE = 900;
    var pts = [], ripples = [];
    var mx = 0, my = 0, rx = 0, ry = 0, active = false, running = false;

    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size);

    function accent() { return getComputedStyle(html).getPropertyValue('--accent').trim() || '#ff6a00'; }
    function at(el, x, y) { el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'; }

    function frame(now) {
      running = false;
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      at(ring, rx, ry);
      ctx.clearRect(0, 0, W, H);
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      var c = accent(), i, a;
      ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
      for (i = 1; i < pts.length; i++) {
        a = 1 - (now - pts[i].t) / LIFE;
        ctx.globalAlpha = Math.max(0, a) * 0.75;
        ctx.beginPath(); ctx.moveTo(pts[i - 1].x, pts[i - 1].y); ctx.lineTo(pts[i].x, pts[i].y); ctx.stroke();
      }
      for (i = 0; i < pts.length; i += 4) {
        a = 1 - (now - pts[i].t) / LIFE;
        ctx.globalAlpha = Math.max(0, a);
        ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, 2.8, 0, 6.2832); ctx.fill();
      }
      ctx.lineWidth = 2;
      for (i = ripples.length - 1; i >= 0; i--) {
        a = (now - ripples[i].t) / 650;
        if (a >= 1) { ripples.splice(i, 1); continue; }
        ctx.globalAlpha = (1 - a) * 0.8;
        ctx.beginPath(); ctx.arc(ripples[i].x, ripples[i].y, 10 + a * 64, 0, 6.2832); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (pts.length || ripples.length || Math.abs(mx - rx) > 0.3 || Math.abs(my - ry) > 0.3) go();
    }
    function go() { if (!running) { running = true; window.requestAnimationFrame(frame); } }

    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      if (!active) { active = true; rx = mx; ry = my; html.classList.add('has-cursor'); }
      at(dot, mx, my); at(lab, mx, my);
      lab.textContent = 'x ' + Math.round(mx) + '  y ' + Math.round(my);
      var l = pts[pts.length - 1];
      if (!l || Math.hypot(mx - l.x, my - l.y) > 6) pts.push({ x: mx, y: my, t: performance.now() });
      var t = e.target;
      ring.classList.toggle('is-link', !!(t && t.closest && t.closest('a, button')));
      go();
    }, { passive: true });
    window.addEventListener('mousedown', function (e) {
      ring.classList.add('is-down');
      ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      go();
    });
    window.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });
    html.addEventListener('mouseleave', function () { active = false; html.classList.remove('has-cursor'); });
  })();
  // ===== end cursor trail =====
  // ===== Achievements: category tabs + certificate viewer =====
  (function () {
    var tabs = document.querySelectorAll('.cat-tabs button');
    if (!tabs.length) return;
    var lb = document.getElementById('lightbox');
    var img = document.getElementById('lbImg'), ttl = document.getElementById('lbTitle'), sub = document.getElementById('lbSub');
    var prev = document.getElementById('lbPrev'), next = document.getElementById('lbNext'), closeBtn = document.getElementById('lbClose');
    var list = [], idx = 0, opener = null;

    function showCat(btn) {
      for (var i = 0; i < tabs.length; i++) {
        var on = tabs[i] === btn;
        tabs[i].setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(tabs[i].getAttribute('aria-controls')).hidden = !on;
      }
      btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].addEventListener('click', function () { showCat(this); });
      tabs[t].addEventListener('keydown', function (e) {
        var n = Array.prototype.indexOf.call(tabs, this), to = -1;
        if (e.key === 'ArrowRight') to = (n + 1) % tabs.length;
        if (e.key === 'ArrowLeft') to = (n + tabs.length - 1) % tabs.length;
        if (to > -1) { e.preventDefault(); tabs[to].focus(); showCat(tabs[to]); }
      });
    }

    function render() {
      var c = list[idx];
      img.src = c.getAttribute('data-full');
      img.alt = c.querySelector('img').alt;
      ttl.textContent = c.getAttribute('data-title');
      sub.textContent = c.getAttribute('data-sub');
      prev.hidden = next.hidden = list.length < 2;
    }
    function open(card) {
      list = Array.prototype.slice.call(card.closest('.cat').querySelectorAll('.ach-card'));
      idx = list.indexOf(card); opener = card;
      render(); lb.hidden = false; closeBtn.focus();
    }
    function close() { lb.hidden = true; img.src = ''; if (opener) opener.focus(); }
    function step(d) { if (list.length > 1) { idx = (idx + d + list.length) % list.length; render(); } }

    var cards = document.querySelectorAll('.ach-card');
    for (var k = 0; k < cards.length; k++) cards[k].addEventListener('click', function () { open(this); });
    closeBtn.addEventListener('click', close);
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {
        var f = [closeBtn, prev, next].filter(function (b) { return !b.hidden; });
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    });
  })();
  // ===== end achievements =====

  // ===== Footer year =====
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
