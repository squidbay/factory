/* factory.js — shared behavior for the factory public pages.
   Every module guards on its element, so one file serves both pages. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Seats carousel (index) ---------- */
  (function () {
    var car = document.getElementById('seatsCarousel');
    if (!car) return;
    var scope = car.closest('section') || car.parentNode;
    var track = car.querySelector('.car-track');
    var cards = Array.prototype.slice.call(track.querySelectorAll('.poster-card'));
    var prev = scope.querySelector('.car-btn.prev');
    var next = scope.querySelector('.car-btn.next');
    var dotsWrap = car.querySelector('.car-dots');
    if (!dotsWrap) return;
    if (cards.length < 2) { if (prev) prev.style.display = 'none'; if (next) next.style.display = 'none'; return; }

    var dots = cards.map(function (_, i) {
      var d = document.createElement('button');
      d.type = 'button';
      d.className = 'car-dot';
      d.setAttribute('aria-label', 'Go to seat ' + (i + 1));
      d.addEventListener('click', function () { go(i, false); });
      dotsWrap.appendChild(d);
      return d;
    });

    function step() {
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left || track.clientWidth;
    }
    function maxIndex() {
      return Math.max(0, Math.round((track.scrollWidth - track.clientWidth) / step()));
    }
    function activeIndex() {
      return Math.min(maxIndex(), Math.round(track.scrollLeft / step()));
    }
    function go(i, instant) {
      var m = maxIndex();
      if (i < 0) i = 0; else if (i > m) i = m;
      track.scrollTo({ left: i * step(), behavior: (instant || reduce) ? 'auto' : 'smooth' });
    }
    function advance(dir, auto) {
      var m = maxIndex(), t = activeIndex() + dir, wrap = false;
      if (t > m) { t = 0; wrap = true; } else if (t < 0) { t = m; wrap = true; }
      go(t, auto && wrap);
    }
    function update() {
      var a = activeIndex();
      dots.forEach(function (d, i) { d.setAttribute('aria-current', i === a ? 'true' : 'false'); });
    }

    if (prev) prev.addEventListener('click', function () { advance(-1, false); });
    if (next) next.addEventListener('click', function () { advance(1, false); });
    var raf;
    track.addEventListener('scroll', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', function () { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); });
    update();

    var timer = null, inView = false;
    function play() { if (reduce || timer || !inView) return; timer = setInterval(function () { advance(1, true); }, 4500); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    ['mouseenter', 'focusin', 'touchstart', 'pointerdown'].forEach(function (e) { scope.addEventListener(e, stop, { passive: true }); });
    ['mouseleave', 'focusout'].forEach(function (e) { scope.addEventListener(e, play); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else play(); });
    new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; if (inView) play(); else stop(); }); }, { threshold: 0.3 }).observe(car);
  })();

  /* ---------- Assembly-line arrow run (index) ---------- */
  (function () {
    var line = document.getElementById('flowLine');
    if (line && !reduce) {
      new IntersectionObserver(function (es) { es.forEach(function (e) { line.classList.toggle('run', e.isIntersecting); }); }, { threshold: 0.4 }).observe(line);
    }
  })();

  /* ---------- Dispatch chat demo (index) ---------- */
  (function () {
    var root = document.getElementById('dispatchChat');
    if (!root) return;
    var body = root.querySelector('.phone-body');
    var CHK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    var UAVA = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
    var DAVA = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"></rect><path d="M12 18h.01"></path></svg>';
    var PR = '<div class="pr-card"><div class="h"><span>Pull request #128</span></div><div class="pt">Add testimonials section</div><div class="chk"><span>' + CHK + ' Mobile layout passes down to 380px</span><span>' + CHK + ' Guardrails: clean</span><span>' + CHK + ' No conflicts with main</span></div></div>';
    var convo = [
      { t: 'user', m: 'Add a testimonials section to the site, and make sure it looks right on a phone.', d: 1275 },
      { t: 'dispatch', m: 'On it. Sending this down the line to the team.', d: 1500 },
      { t: 'sys', m: 'Dispatched · Cowork plans → Code builds → Design draws', d: 1425 },
      { t: 'dispatch', m: "Plan's approved and the seats are building. I'll ping you the moment there's something to look at. Go live your day.", d: 1800 },
      { t: 'sys', m: '20 minutes later', d: 1275 },
      { t: 'dispatch', m: 'Pull request is ready. The browser seat and I checked it on real phones. Here is the gist:', pr: true, d: 2475 },
      { t: 'user', m: 'Nice, reads well. Merging now.', d: 1500 },
      { t: 'merged', m: 'Merged by you · live in ~1 min', d: 1500 },
      { t: 'dispatch', m: 'Done. The journal is updated, so tomorrow’s shift starts where this one ended.', d: 1950 },
      { t: 'sys', m: 'You held the gate. The team did the work.', d: 2250 }
    ];
    var i = 0, timer = null, running = false, started = false;
    var START_INDEX = 2;

    function bubble(item) {
      var d = document.createElement('div');
      d.className = 'msg ' + item.t;
      var ava = item.t === 'user' ? UAVA : DAVA;
      d.innerHTML = '<span class="m-ava">' + ava + '</span><div class="b"><span>' + item.m + '</span>' + (item.pr ? PR : '') + '</div>';
      return d;
    }
    function sysLine(item) { var d = document.createElement('div'); d.className = 'msg-sys'; d.textContent = item.m; return d; }
    function mergedLine(item) { var d = document.createElement('div'); d.className = 'msg-merged'; d.innerHTML = CHK + '<span>' + item.m + '</span>'; return d; }
    function toBottom() { body.scrollTop = body.scrollHeight; }
    function render(item) {
      if (item.t === 'sys') body.appendChild(sysLine(item));
      else if (item.t === 'merged') body.appendChild(mergedLine(item));
      else body.appendChild(bubble(item));
      toBottom();
    }
    function showTyping() {
      var d = document.createElement('div');
      d.className = 'msg dispatch'; d.id = 'ds-typing';
      d.innerHTML = '<span class="m-ava">' + DAVA + '</span><div class="b typing"><span></span><span></span><span></span></div>';
      body.appendChild(d); toBottom();
    }
    function clearTyping() { var t = document.getElementById('ds-typing'); if (t) t.remove(); }
    function next() {
      if (i >= convo.length) { timer = setTimeout(restart, 5000); return; }
      var item = convo[i];
      if (item.t === 'dispatch') {
        showTyping();
        timer = setTimeout(function () { clearTyping(); render(item); i++; timer = setTimeout(next, item.d); }, 720);
      } else {
        render(item); i++; timer = setTimeout(next, item.d);
      }
    }
    function seed() { body.innerHTML = ''; render(convo[0]); render(convo[1]); }
    function restart() { seed(); i = START_INDEX; next(); }
    function start() {
      if (running) return; running = true;
      if (reduce) { for (var k = START_INDEX; k < convo.length; k++) render(convo[k]); return; }
      i = START_INDEX; timer = setTimeout(next, 400);
    }
    seed();
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting && !started) { started = true; start(); io.unobserve(e.target); } });
    }, { threshold: 0.25 });
    io.observe(root);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) { clearTimeout(timer); timer = null; } }
      else if (started && !reduce) { if (timer) clearTimeout(timer); restart(); }
    });
  })();

  /* ---------- App-shell dock: scroll-to tabs + scroll-spy + floating CTA (both pages) ---------- */
  (function () {
    var dock = document.querySelector('.dock');
    if (!dock) return;
    var appbar = document.querySelector('.appbar');
    var tabs = Array.prototype.slice.call(dock.querySelectorAll('.dock-tab'));

    /* map each tab to its target section element ("top" => document top) */
    var targets = tabs.map(function (t) {
      var sel = t.getAttribute('data-target');
      if (!sel || sel === 'top') return { tab: t, el: null };
      return { tab: t, el: document.querySelector(sel) };
    });

    function barOffset() { return (appbar ? appbar.offsetHeight : 56) + 12; }

    tabs.forEach(function (t) {
      t.addEventListener('click', function () {
        var sel = t.getAttribute('data-target');
        if (!sel || sel === 'top') {
          window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        } else {
          var el = document.querySelector(sel);
          if (el) {
            var y = el.getBoundingClientRect().top + window.pageYOffset - barOffset();
            window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
          }
        }
        setActive(t);
      });
    });

    function setActive(active) {
      tabs.forEach(function (t) { t.setAttribute('aria-current', t === active ? 'true' : 'false'); });
    }

    /* scroll-spy: the last section whose top has passed the app-bar line wins */
    var spyRaf;
    function spy() {
      var line = barOffset() + 8;
      var current = targets[0].tab;
      for (var k = 0; k < targets.length; k++) {
        var el = targets[k].el;
        if (!el) { if (window.pageYOffset < 40) current = targets[k].tab; continue; }
        if (el.getBoundingClientRect().top <= line) current = targets[k].tab;
      }
      /* near the very bottom, light the last tab */
      if ((window.innerHeight + window.pageYOffset) >= (document.body.scrollHeight - 4)) {
        current = targets[targets.length - 1].tab;
      }
      setActive(current);
    }
    window.addEventListener('scroll', function () { cancelAnimationFrame(spyRaf); spyRaf = requestAnimationFrame(spy); }, { passive: true });
    window.addEventListener('resize', function () { cancelAnimationFrame(spyRaf); spyRaf = requestAnimationFrame(spy); });
    spy();

    /* floating CTA pill: show only while no inline CTA anchor is on screen */
    if ('IntersectionObserver' in window) {
      var anchors = document.querySelectorAll('[data-cta-anchor]');
      if (!anchors.length) { dock.setAttribute('data-show', 'true'); }
      else {
        var visible = 0, seen = new WeakMap();
        var cio = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            var was = seen.get(e.target) || false;
            if (e.isIntersecting && !was) { visible++; seen.set(e.target, true); }
            else if (!e.isIntersecting && was) { visible--; seen.set(e.target, false); }
          });
          dock.setAttribute('data-show', visible === 0 ? 'true' : 'false');
        }, { threshold: 0.1 });
        Array.prototype.forEach.call(anchors, function (a) { cio.observe(a); });
      }
    }
  })();
})();
