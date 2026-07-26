/* ============================================================================
   factory.js — factory.squidbay.io

   Three jobs, and nothing else:
     1. the abyss bubbles (ported from squidbay/squidbay, motion-gated)
     2. the hero chat mock's demo tabs
     3. the real chat widget, behind a flag

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

  /* -------------------------------------------------------- chat widget ---
     Ported from squidbay/squidbay components/chatbot.js. The rules carried
     over unchanged: the page talks to a server-side proxy and never holds a
     key, messages are rate-limited, input is capped, and the conversation is
     remembered in sessionStorage only.

     If the proxy is not yet serving this product, data-chat-enabled stays
     "false" and the launcher is never rendered — a launcher that opens an
     error is worse than no launcher. */
  var MAX_INPUT = 500;
  var RATE_LIMIT_MS = 2000;
  var MAX_MESSAGES = 10;
  var STORE_KEY = 'factory-chat';

  function initChat() {
    var root = document.getElementById('chatRoot');
    if (!root || root.getAttribute('data-chat-enabled') !== 'true') return;

    var endpoint = root.getAttribute('data-endpoint');
    var product = root.getAttribute('data-product') || 'factory';
    var lastSent = 0;
    var sent = 0;

    var launcher = document.createElement('button');
    launcher.id = 'chatLauncher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Ask the factory');
    launcher.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-coach"/></svg>';

    var panel = document.createElement('div');
    panel.id = 'chatPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask the factory');
    panel.innerHTML =
      '<div class="cw-head">' +
        '<img src="assets/img/squid/squid-mark.svg" alt="" width="22" height="22">' +
        '<span class="n">Ask the factory</span>' +
        '<button class="cw-close" type="button" aria-label="Close">✕</button>' +
      '</div>' +
      '<div class="cw-log" id="cwLog" role="log" aria-live="polite"></div>' +
      '<form class="cw-foot">' +
        '<input type="text" maxlength="' + MAX_INPUT + '" placeholder="Ask a question…" aria-label="Your question">' +
        '<button type="submit" aria-label="Send"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-send"/></svg></button>' +
      '</form>';

    document.body.appendChild(launcher);
    document.body.appendChild(panel);

    var log = panel.querySelector('#cwLog');
    var form = panel.querySelector('form');
    var input = panel.querySelector('input');

    function say(who, text) {
      var el = document.createElement('div');
      el.className = 'bub ' + (who === 'you' ? 'bub-user' : 'bub-agent');
      el.textContent = text;
      log.appendChild(el);
      log.scrollTop = log.scrollHeight;
    }

    function restore() {
      try {
        var prior = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]');
        prior.forEach(function (m) { say(m.who, m.text); });
        sent = prior.filter(function (m) { return m.who === 'you'; }).length;
      } catch (e) { /* a blocked or full sessionStorage is not worth a failure */ }
    }

    function remember(who, text) {
      try {
        var prior = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]');
        prior.push({ who: who, text: text });
        sessionStorage.setItem(STORE_KEY, JSON.stringify(prior));
      } catch (e) { /* same */ }
    }

    launcher.addEventListener('click', function () {
      var open = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!open));
      if (!open) input.focus();
    });
    panel.querySelector('.cw-close').addEventListener('click', function () {
      panel.setAttribute('data-open', 'false');
      launcher.focus();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = input.value.trim().slice(0, MAX_INPUT);
      if (!text) return;
      if (Date.now() - lastSent < RATE_LIMIT_MS) return;
      if (sent >= MAX_MESSAGES) {
        say('factory', 'That’s as far as this window goes. Reload the page to start again.');
        return;
      }
      lastSent = Date.now();
      sent++;
      say('you', text);
      remember('you', text);
      input.value = '';

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: product, message: text })
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          var reply = (data && data.reply) || 'Something went wrong on our side. Try again in a moment.';
          say('factory', reply);
          remember('factory', reply);
        })
        .catch(function () {
          say('factory', 'I couldn’t reach the factory just now. Try again in a moment.');
        });
    });

    restore();
  }

  function start() {
    initBubbles();
    initDemoTabs();
    initChat();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
