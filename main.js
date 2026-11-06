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

  // ===== Footer year =====
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
