/* ============================================================
   Reflex Clinic - страница-статья "Рефлексотомия"
   i18n RU/KZ, оглавление со следящей подсветкой, появление секций.
   Запись на приём, конверсия Google Ads и WhatsApp - в form.js.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Казахская версия ----------
     Словарь лежит в assets/lang/reflexotomiya-kk.js и грузится только когда человек сам выбрал KZ
     (или открыл ?lang=kk / выбрал раньше). В разметке и в этом файле казахского текста нет:
     проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
     Версия файла - из ?v= этого скрипта, бампается вместе с остальными ассетами. */
  var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || '';
  var KK = null, KZ = {};
  function loadKK(done){
    if (KK) return done();
    var s = document.createElement('script');
    s.src = 'assets/lang/reflexotomiya-kk.js' + (ASSET_V ? '?v=' + ASSET_V : '');
    s.onload = function () { if (window.SITE_KK){ KK = window.SITE_KK; KZ = KK.dict || {}; } done(); };
    s.onerror = function () { done(); };
    document.head.appendChild(s);
  }

  var META_RU = { title: document.title, desc: '' };

  var RU = {}, lang = 'ru';

  function captureRU(){
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      if (!(k in RU)) RU[k] = nodes[i].innerHTML;
    }
    var d = document.querySelector('meta[name="description"]');
    META_RU.desc = d ? d.getAttribute('content') : '';
  }

  function applyLang(l){
    if (l === 'kz' && !KK) l = 'ru';          /* словарь не загрузился - остаёмся на русском */
    var kz = l === 'kz';
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      var v = (kz && KZ[k] !== undefined) ? KZ[k] : RU[k];
      if (v !== undefined) nodes[i].innerHTML = v;
    }
    document.documentElement.lang = kz ? 'kk' : 'ru';
    var meta = (kz && KK.meta) ? KK.meta : META_RU;
    document.title = meta.title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', meta.desc);
    var btns = document.querySelectorAll('.lang-btn');
    for (i = 0; i < btns.length; i++){
      var on = btns[i].getAttribute('data-lang') === l;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    lang = l;
    try { localStorage.setItem('reflex-lang', l); } catch (e) {}
  }

  function setLang(l){
    if (l === 'kz') loadKK(function () { applyLang('kz'); });
    else applyLang('ru');
  }

  document.addEventListener('DOMContentLoaded', function () {
    captureRU();

    /* язык: ?lang= в URL важнее сохранённого - русское объявление всегда открывает русский сайт.
       По navigator.language не угадываем: казахский только явным выбором человека. */
    var urlLang = null;
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'kz' || q === 'kk') urlLang = 'kz';
      if (q === 'ru') urlLang = 'ru';
    } catch (e) {}
    var saved = null;
    try { saved = localStorage.getItem('reflex-lang'); } catch (e) {}
    var start = urlLang || (saved === 'kz' ? 'kz' : 'ru');
    if (start !== 'ru') setLang(start);

    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        if (l !== lang) setLang(l);
      });
    });

    /* ---------- Линия прогресса чтения ---------- */
    var bar = document.createElement('div');
    bar.className = 'progress';
    document.body.appendChild(bar);
    var onProg = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ')';
    };
    onProg();
    window.addEventListener('scroll', onProg, { passive: true });
    window.addEventListener('resize', onProg);

    /* ---------- Мобильное меню ---------- */
    var burger = document.getElementById('burger');
    var mobnav = document.getElementById('mobnav');
    if (burger && mobnav){
      var items = mobnav.querySelectorAll('.mobnav-in > a');
      Array.prototype.forEach.call(items, function (a, i) { a.style.setProperty('--i', i); });

      var closeMenu = function () {
        document.body.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Открыть меню');
      };
      burger.addEventListener('click', function () {
        var open = document.body.classList.toggle('menu-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      });
      Array.prototype.forEach.call(mobnav.querySelectorAll('a'), function (a) {
        a.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 1100) closeMenu();
      });
    }

    /* ---------- Появление секций ---------- */
    var secs = document.querySelectorAll('.art-sec');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce){
      Array.prototype.forEach.call(secs, function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
      Array.prototype.forEach.call(secs, function (el) { io.observe(el); });

      /* подстраховка: если наблюдатель не сработал, показываем по скроллу */
      var pending = Array.prototype.slice.call(secs);
      var kick = function () {
        pending = pending.filter(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < window.innerHeight * 0.96 && r.bottom > 0){ el.classList.add('in'); return false; }
          return true;
        });
        if (!pending.length) window.removeEventListener('scroll', kick);
      };
      kick();
      window.addEventListener('scroll', kick, { passive: true });
    }

    /* ---------- Оглавление: подсветка текущей секции ---------- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.toc-nav a'));
    var mapped = links.map(function (a) {
      var id = a.getAttribute('href').slice(1);
      return { a: a, el: document.getElementById(id) };
    }).filter(function (m) { return m.el; });

    var onSpy = function () {
      var y = window.scrollY + 140, cur = null;
      for (var i = 0; i < mapped.length; i++){
        if (mapped[i].el.offsetTop <= y) cur = mapped[i];
      }
      for (var j = 0; j < mapped.length; j++){
        mapped[j].a.classList.toggle('is-on', mapped[j] === cur);
      }
    };
    onSpy();
    window.addEventListener('scroll', onSpy, { passive: true });
    window.addEventListener('resize', onSpy);
  });

})();
