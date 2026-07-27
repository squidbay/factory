/* ============================================================================
   factory.js — factory.squidbay.io

   Five jobs, and nothing else:
     1. the abyss bubbles (ported from squidbay/squidbay, motion-gated)
     2. the hero chat mock's demo tabs
     3. the demo phone's scrolling playback (ported from squidbay/squidbay
        js/index.js initChatDemo)
     4. the feel-it mock tabs, which also lazily insert the desktop iframe
     5. revealing the real SquidBot launcher once the page has loaded
        (squidbot.js owns the widget itself)

   What used to be here and is deliberately gone: the `rise` decorative
   particle layer and the two oversized `.glow` blobs. Neither carried any
   meaning, and both are the recognisable signature of a generated page.
   ============================================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------ bubbles ---
     Port of squidbay/squidbay js/components.js initAbyssBubbles, with one
     addition the source does not have: it does not run at all when the
     visitor has asked for reduced motion. */
  function initBubbles() {
    if (reduced) return;
    if (document.getElementById('abyssBubbles')) return;

    var container = document.createElement('div');
    container.className = 'abyss-bubbles';
    container.id = 'abyssBubbles';
    container.setAttribute('aria-hidden', 'true');
    document.body.prepend(container);

    function createBubble() {
      if (document.hidden) return;
      var bubble = document.createElement('div');
      bubble.className = 'abyss-bubble';

      var size = 4 + Math.random() * 28;
      var duration = 6 + Math.random() * 12;
      var delay = Math.random() * 0.5;
      var drift = -40 + Math.random() * 80;

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = (Math.random() * 100) + '%';
      bubble.style.animationDuration = duration + 's';
      bubble.style.animationDelay = delay + 's';
      bubble.style.setProperty('--drift', drift + 'px');
      bubble.style.setProperty('--drift-end', (drift + (-20 + Math.random() * 40)) + 'px');
      bubble.style.setProperty('--scale-end', 0.6 + Math.random() * 0.5);

      container.appendChild(bubble);
      setTimeout(function () {
        if (bubble.parentNode) bubble.remove();
      }, (duration + delay) * 1000 + 200);
    }

    for (var i = 0; i < 12; i++) setTimeout(createBubble, i * 250);
    setInterval(createBubble, 1000);
  }

  /* --------------------------------------------------------- demo tabs ---
     Swaps the three bubbles in the hero mock. No navigation, no network,
     no state beyond the DOM. */
  var DEMOS = [
    {
      ask: 'Add a testimonials section to the site, and make sure it looks right on a phone.',
      ack: 'On it. Sending this down the line.',
      title: 'Pull request #14 is ready for you.',
      detail: 'Testimonials section added. Checked at phone, tablet and desktop widths.',
      meta: ['3 files changed', 'checks passed']
    },
    {
      ask: 'The pricing page is squashed on my phone. Can someone look at it?',
      ack: 'Looking now. The Inspector will drive it on a real phone before anything comes back.',
      title: 'Pull request #15 is ready for you.',
      detail: 'Pricing cards stack below 768px. Checked in portrait and landscape.',
      meta: ['2 files changed', 'no overflow']
    },
    {
      ask: 'Write this week’s post about what we shipped, and keep it short.',
      ack: 'Drafting from the journal, so it only claims what actually shipped.',
      title: 'Pull request #16 is ready for you.',
      detail: 'Draft post, 380 words, every claim traced to a merged change.',
      meta: ['1 file changed', 'sources listed']
    }
  ];

  function renderDemo(i) {
    var thread = document.getElementById('heroThread');
    if (!thread) return;
    var d = DEMOS[i] || DEMOS[0];
    var cells = d.meta.map(function () { return '<span class="m"></span>'; }).join('');

    thread.innerHTML =
      '<div class="bub bub-user"></div>' +
      '<div class="bub bub-agent"></div>' +
      '<div class="pr-card">' +
        '<div class="t"></div>' +
        '<div class="d"></div>' +
        '<div class="pr-meta">' + cells + '</div>' +
        '<div class="pr-merge">Merge pull request</div>' +
        '<div class="pr-only">Only you can click this.</div>' +
      '</div>';

    // textContent everywhere: no copy on this page is ever written as HTML.
    thread.querySelector('.bub-user').textContent = d.ask;
    thread.querySelector('.bub-agent').textContent = d.ack;
    thread.querySelector('.pr-card .t').textContent = d.title;
    thread.querySelector('.pr-card .d').textContent = d.detail;
    var ms = thread.querySelectorAll('.pr-meta .m');
    for (var k = 0; k < ms.length; k++) ms[k].textContent = d.meta[k];
  }

  function initDemoTabs() {
    var tabs = document.querySelectorAll('.demo-tab');
    if (!tabs.length) return;
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (t) {
          t.setAttribute('aria-selected', String(t === tab));
        });
        renderDemo(parseInt(tab.getAttribute('data-demo'), 10) || 0);
      });
    });
  }

  /* -------------------------------------------- the demo phone playback ---
     Ported from squidbay/squidbay js/index.js initChatDemo: the same shape —
     a scripted conversation, a typing indicator before each agent turn, an
     IntersectionObserver that starts it when the section is actually on
     screen, a scrollTop nudge after every append, and a loop back to the top
     after a pause. Two differences, both deliberate:

       - it does not run under prefers-reduced-motion; the static thread that
         ships in the HTML simply stays put. The source had no such gate.
       - every string is written with textContent, never innerHTML, because no
         copy on this page is ever assembled as markup.
  */
  /* Written to run LONGER than the thread window on purpose. A script that
     merely fits is a slideshow; the point of this one is that you watch the
     conversation push older messages up out of the phone, the way a real one
     does. */
  var THREAD = [
    { who: 'sys',   text: 'Your Dispatch carries orders to the team. It never merges.', wait: 700 },
    { who: 'day',   text: 'Yesterday', wait: 500 },
    { who: 'user',  text: 'Can the homepage say what it costs?', wait: 900 },
    { who: 'agent', text: 'Merged, and live.', wait: 1300 },
    { who: 'day',   text: 'Today', wait: 600 },
    { who: 'user',  text: 'Add a testimonials section, and check it on a phone.', wait: 900 },
    { who: 'agent', text: 'On it. Sending this down the line.', wait: 1200 },
    { who: 'agent', text: 'Creative Director drew it. Engineer built it.', wait: 1300 },
    { who: 'agent', text: 'Team Leader read the finished thing and sent it back once — the quotes wrapped badly at 390px.', wait: 1600 },
    { who: 'agent', text: 'Fixed, then the Inspector drove it on a real phone.', wait: 1400 },
    { who: 'agent', text: 'Pull request #14 is ready. Checked at phone, tablet and desktop widths.', wait: 900 },
    { who: 'pr',    text: '#14 Testimonials section', wait: 1400 },
    { who: 'user',  text: 'Merged. Thanks.', wait: 4200 }
  ];

  function initDeviceDemo() {
    var thread = document.getElementById('deviceThread');
    if (!thread || reduced) return;

    var i = 0, running = false;

    function bottom() { thread.scrollTop = thread.scrollHeight; }

    function node(item) {
      var el = document.createElement('div');
      if (item.who === 'sys')  { el.className = 'device-sys'; el.textContent = item.text; return el; }
      if (item.who === 'day')  { el.className = 'device-day'; el.textContent = item.text; return el; }
      if (item.who === 'pr') {
        el.className = 'device-art';
        el.innerHTML =
          '<span class="sq"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><use href="#i-cross"/></svg></span>' +
          '<span class="tx"><span class="k">PULL REQUEST</span><span class="n"></span><span class="o">Open to review</span></span>';
        el.querySelector('.n').textContent = item.text;
        return el;
      }
      el.className = 'bub ' + (item.who === 'user' ? 'bub-user' : 'bub-agent');
      el.textContent = item.text;
      return el;
    }

    function typing() {
      var t = document.createElement('div');
      t.className = 'device-typing';
      t.id = 'deviceTyping';
      t.innerHTML = '<i></i><i></i><i></i>';
      thread.appendChild(t);
      bottom();
    }
    function untype() {
      var t = document.getElementById('deviceTyping');
      if (t) t.remove();
    }

    function next() {
      if (i >= THREAD.length) {
        running = false;
        setTimeout(function () { i = 0; thread.textContent = ''; running = true; setTimeout(next, 400); }, 5000);
        return;
      }
      var item = THREAD[i];
      if ((item.who === 'agent' || item.who === 'pr') && i > 0) {
        typing();
        setTimeout(function () {
          untype();
          thread.appendChild(node(item));
          bottom();
          i++;
          setTimeout(next, item.wait);
        }, 620);
      } else {
        thread.appendChild(node(item));
        bottom();
        i++;
        setTimeout(next, item.wait);
      }
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !running) {
          running = true;
          thread.textContent = '';   // clear the no-JS fallback, then play it
          setTimeout(next, 400);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });
    obs.observe(thread);
  }

  /* ------------------------------------------------------- feel-it tabs ---
     Switches between the two standalone mocks. The desktop iframe is only
     created the first time its tab is chosen, so a visitor who never opens it
     never pays for it. */
  function initFeelTabs() {
    var fits = document.querySelectorAll('.feel-fit');
    if (!fits.length) return;

    /* Each mock is authored for a fixed viewport. Keep that viewport on the
       iframe and scale the whole frame down to the room the column has, so
       the mock never learns it was resized and never gains a scrollbar of its
       own. Runs on load, on resize, and whenever a pane is revealed.

       Width alone is not enough. A 920px-tall phone mock scaled only to the
       column width made this section three screens tall in landscape, which
       is precisely the failure the section-fit gate exists to catch — so the
       second pass measures the finished section and hands the frame whatever
       height is left inside the budget. */
    function fit(box, hCap) {
      var vw = parseInt(box.getAttribute('data-vw'), 10);
      var vh = parseInt(box.getAttribute('data-vh'), 10);
      var frame = box.querySelector('iframe');
      if (!frame || !vw || !vh) return;
      var room = box.parentNode.clientWidth || vw;
      var k = Math.min(1, room / vw);
      if (hCap && vh * k > hCap) k = hCap / vh;
      frame.style.width = vw + 'px';
      frame.style.height = vh + 'px';
      frame.style.transform = 'scale(' + k + ')';
      box.style.width = Math.round(vw * k) + 'px';
      box.style.height = Math.round(vh * k) + 'px';
    }

    function fitAll() {
      Array.prototype.forEach.call(fits, function (b) { fit(b, 0); });

      var sec = document.getElementById('feel-it');
      if (!sec) return;
      var shown = null;
      Array.prototype.forEach.call(fits, function (b) { if (b.offsetHeight) shown = b; });
      if (!shown) return;

      var winH = window.innerHeight, winW = window.innerWidth;
      var budget = winH * (winH <= 560 ? 1.05 : (winW <= 767 ? 1.12 : 1.02));
      var over = sec.offsetHeight - budget;
      if (over > 0) fit(shown, Math.max(200, shown.offsetHeight - over));
    }

    function fill(pane) {
      var box = pane.querySelector('.feel-fit[data-src]');
      if (!box || box.querySelector('iframe')) return;
      var f = document.createElement('iframe');
      f.title = 'The factory Agent on a desktop';
      f.setAttribute('loading', 'lazy');
      f.src = box.getAttribute('data-src');
      box.appendChild(f);
    }

    var tabs = document.querySelectorAll('.feel-tab');
    Array.prototype.forEach.call(tabs, function (tab) {
      tab.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          var pane = document.getElementById(t.getAttribute('aria-controls'));
          if (!pane) return;
          pane.hidden = !on;
          if (on) { fill(pane); fitAll(); }
        });
      });
    });

    fitAll();
    window.addEventListener('resize', fitAll);
    window.addEventListener('orientationchange', fitAll);
  }

  /* ------------------------------------------------------ SquidBot reveal --
     squidbot.js owns the widget. Its launcher starts hidden and is revealed by
     showChatbotButton(), which the source site calls from its component
     loader. This page has no component loader, so it is called here. */
  function revealSquidBot() {
    function show() {
      if (typeof window.showChatbotButton === 'function') { window.showChatbotButton(); return true; }
      var c = document.querySelector('.chatbot-container');
      if (c) { c.classList.add('ready'); return true; }
      return false;
    }
    if (!show()) setTimeout(show, 600);
  }

  function start() {
    initBubbles();
    initDemoTabs();
    initDeviceDemo();
    initFeelTabs();
    revealSquidBot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
