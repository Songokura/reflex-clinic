/* ============================================================
   Reflex Clinic - логика страницы
   i18n RU/KZ, появление блоков, меню, видео, документы.
   Запись на приём, конверсия Google Ads и WhatsApp - в form.js.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Казахская версия ----------
     Словарь лежит в assets/lang/kk.js и грузится только когда человек сам выбрал KZ
     (или открыл ?lang=kk / выбрал раньше). В разметке и в этом файле казахского текста нет:
     проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
     Версия файла - из ?v= этого скрипта, бампается вместе с остальными ассетами. */
  var SELF = (document.currentScript && document.currentScript.src) || '';
  var ASSET_V = (SELF.match(/[?&]v=([^&]+)/) || [])[1] || '';
  /* База путей - от адреса самого скрипта, а не от страницы: посадочные лежат
     в подпапках (/gryzha/), и относительный путь искал бы словарь внутри них.
     Свой словарь страница задаёт атрибутом data-kk на теге скрипта. */
  var BASE = SELF ? SELF.replace(/[?#].*$/, '').replace(/[^\/]*$/, '') : '';
  var KK_FILE = (document.currentScript && document.currentScript.getAttribute('data-kk')) || 'kk.js';
  var KK = null, KZ = {};
  function loadKK(done){
    if (KK) return done();
    var s = document.createElement('script');
    s.src = BASE + 'assets/lang/' + KK_FILE + (ASSET_V ? '?v=' + ASSET_V : '');
    s.onload = function () { if (window.SITE_KK){ KK = window.SITE_KK; KZ = KK.dict || {}; } done(); };
    s.onerror = function () { done(); };
    document.head.appendChild(s);
  }

  /* ---------- Быстрый канал WhatsApp ----------
     Текст сообщения зависит от языка, поэтому href пересобирается при СМЕНЕ ЯЗЫКА,
     а не в момент клика: иначе обработчик сайта затёр бы код обращения, который
     дописывает трекер LeadBot (см. правило про site-rewrites-wa-href). */
  var WA_NUM = '77000707791';
  var WA_RU = 'Здравствуйте! Пишу с сайта Reflex Clinic - подскажите, пожалуйста, по лечению.';
  function syncWA(l){
    var t = (l === 'kz' && KK && KK.wa) ? KK.wa : WA_RU;
    var a = document.querySelectorAll('a[data-wa]'), i;
    for (i = 0; i < a.length; i++) a[i].href = 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(t);
  }

  var META_RU = { title: document.title, desc: '' };
  var TICK_RU = ['болит спина','прострел в пояснице','отдаёт в ногу','не могу повернуть шею','немеют пальцы','хрустят колени','больно наступать на пятку','вес стоит на месте','постоянная усталость'];

  var RU = {};
  var lang = 'ru';

  function captureRU(){
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      if (!(k in RU)) RU[k] = nodes[i].innerHTML;
    }
    var d = document.querySelector('meta[name="description"]');
    META_RU.desc = d ? d.getAttribute('content') : '';
  }

  function fillTicker(l){
    var sets = document.querySelectorAll('.ticker-set'), i, j;
    var words = (l === 'kz' && KK && KK.tick) ? KK.tick : TICK_RU;
    for (i = 0; i < sets.length; i++){
      var html = '';
      for (j = 0; j < words.length; j++) html += '<span>' + words[j] + '</span><i></i>';
      sets[i].innerHTML = html;
    }
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
    fillTicker(l);
    syncWA(l);
    lang = l;
    try { localStorage.setItem('reflex-lang', l); } catch (e) {}
  }

  function setLang(l){
    if (l === 'kz') loadKK(function () { applyLang('kz'); });
    else applyLang('ru');
  }

  /* ---------- Старт ---------- */
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
    if (start !== 'ru') setLang(start); else { fillTicker('ru'); syncWA('ru'); }

    /* клик по WhatsApp - действие «WhatsApp с сайта» в Google Ads.
       Только отправка события: href не трогаем, его уже дополнил трекер LeadBot. */
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-wa]') : null;
      if (a && typeof window.gadsConvert === 'function') window.gadsConvert('wa');
    });

    var langBtns = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(langBtns, function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        if (l !== lang) setLang(l);
      });
    });

    /* ---------- Линия прогресса ---------- */
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

    /* ---------- Шапка ---------- */
    var hdr = document.getElementById('hdr');
    var onScroll = function () {
      if (window.scrollY > 40) hdr.classList.add('is-solid');
      else hdr.classList.remove('is-solid');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

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

    /* ---------- Появление блоков ---------- */
    var targets = document.querySelectorAll('.reveal, .card, .step, .route');
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!('IntersectionObserver' in window) || reduce){
      Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      Array.prototype.forEach.call(targets, function (el) { io.observe(el); });

      /* подстраховка: если наблюдатель почему-то не сработал, показываем по скроллу */
      var pending = Array.prototype.slice.call(targets);
      var sweep = function () {
        if (!pending.length) return;
        var vh = window.innerHeight;
        pending = pending.filter(function (el) {
          var r = el.getBoundingClientRect();
          if (r.top < vh * 0.94 && r.bottom > 0){ el.classList.add('in'); io.unobserve(el); return false; }
          return true;
        });
      };
      sweep();
      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('resize', sweep);

      /* лёгкая лесенка внутри сеток */
      Array.prototype.forEach.call(document.querySelectorAll('.cards, .steps, .rev-grid, .mets, .dirs-grid, .docs'), function (grid) {
        Array.prototype.forEach.call(grid.children, function (child, i) {
          child.style.transitionDelay = (i % 4) * 0.07 + 's';
        });
      });
    }


    /* ---------- Магнитные кнопки (только мышь) ---------- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce){
      Array.prototype.forEach.call(document.querySelectorAll('.btn-book, .btn-lg'), function (b) {
        b.addEventListener('mousemove', function (e) {
          var r = b.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) / r.width;
          var y = (e.clientY - r.top - r.height / 2) / r.height;
          b.style.transform = 'translate(' + (x * 8).toFixed(2) + 'px,' + (y * 6).toFixed(2) + 'px)';
        });
        b.addEventListener('mouseleave', function () { b.style.transform = ''; });
      });
    }



    /* ---------- Видеофон героя ---------- */
    var heroVid = document.querySelector('.hero-vid');
    if (heroVid && !reduce){
      var startHero = function () {
        var tall = window.matchMedia('(max-width:860px)').matches;
        var src = heroVid.getAttribute(tall ? 'data-loop-tall' : 'data-loop-wide');
        if (!src || heroVid.getAttribute('src')) return;
        heroVid.addEventListener('playing', function () { heroVid.classList.add('is-live'); });
        heroVid.setAttribute('src', src);
        var pr = heroVid.play();
        if (pr && pr.catch) pr.catch(function () {});
      };
      /* грузим после основной загрузки - первый экран не должен ждать видео.
         Страховка на 2.5 с: если какой-то ресурс висит, load может не наступить долго. */
      var kicked = false;
      var kick = function () { if (kicked) return; kicked = true; startHero(); };
      if (document.readyState === 'complete') setTimeout(kick, 400);
      else {
        window.addEventListener('load', function () { setTimeout(kick, 400); });
        setTimeout(kick, 2500);
      }

      /* за пределами экрана видео стоит на паузе */
      if ('IntersectionObserver' in window){
        new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (!heroVid.getAttribute('src')) return;
            if (en.isIntersecting){
              var pr = heroVid.play();
              if (pr && pr.catch) pr.catch(function () {});
            } else heroVid.pause();
          });
        }, { threshold: 0.12 }).observe(heroVid);
      }
    }

    /* ---------- Видео: превью-петли, полка отзывов, модальный плеер ---------- */
    var vcards = document.querySelectorAll('.vplay');
    var reelCards = Array.prototype.slice.call(document.querySelectorAll('.reel.vplay'));
    var modal = document.getElementById('vmodal');
    var player = document.getElementById('vplayer');
    var vmT = document.getElementById('vmTitle');
    var vmS = document.getElementById('vmSub');
    var modalOpen = false, curIndex = -1, lastFocus = null;

    if (vcards.length){

      var playLoop = function (card) {
        var v = card.querySelector('.reel-loop');
        if (!v || modalOpen || reduce) return;
        if (!v.getAttribute('src')){
          v.addEventListener('playing', function () { card.classList.add('is-live'); });
          v.setAttribute('src', v.getAttribute('data-loop'));
        }
        var pr = v.play();
        if (pr && pr.catch) pr.catch(function () {});
        if (!v.paused) card.classList.add('is-live');
      };

      var stopLoop = function (card) {
        var v = card.querySelector('.reel-loop');
        if (!v) return;
        card.classList.remove('is-live');
        try { v.pause(); } catch (e) {}
      };

      /* петля включается, только когда карточка реально в кадре */
      if (!reduce && 'IntersectionObserver' in window){
        var vio = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            en.target._seen = en.isIntersecting;
            if (en.isIntersecting) playLoop(en.target); else stopLoop(en.target);
          });
        }, { threshold: 0.55 });
        Array.prototype.forEach.call(vcards, function (c) { vio.observe(c); });
      }

      var openVideo = function (card) {
        var src = card.getAttribute('data-video');
        if (!src || !modal || !player) return;
        curIndex = reelCards.indexOf(card);
        lastFocus = card;
        var t = card.querySelector('.reel-cap b, .film-cap b');
        var tag = card.querySelector('.reel-tag');
        var dur = card.querySelector('.reel-dur');
        var sub = [];
        if (tag) sub.push(tag.textContent);
        if (dur) sub.push(dur.textContent);
        if (vmT) vmT.textContent = t ? t.textContent : '';
        if (vmS) vmS.textContent = sub.join(' · ');
        Array.prototype.forEach.call(vcards, function (c) { stopLoop(c); });
        modalOpen = true;
        player.setAttribute('src', src);
        modal.classList.add('is-open');
        document.body.classList.add('modal-open');
        var pr = player.play();
        if (pr && pr.catch) pr.catch(function () {});
        var navOn = curIndex > -1 && reelCards.length > 1;
        Array.prototype.forEach.call(modal.querySelectorAll('.vm-prev,.vm-next'), function (b) {
          b.style.display = navOn ? '' : 'none';
        });
        var x = modal.querySelector('.vm-x');
        if (x) x.focus();
      };

      var closeVideo = function () {
        if (!modalOpen) return;
        modalOpen = false;
        try { player.pause(); } catch (e) {}
        player.removeAttribute('src');
        try { player.load(); } catch (e) {}
        modal.classList.remove('is-open');
        document.body.classList.remove('modal-open');
        Array.prototype.forEach.call(vcards, function (c) { if (c._seen) playLoop(c); });
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      };

      var stepVideo = function (d) {
        if (curIndex < 0 || !reelCards.length) return;
        openVideo(reelCards[(curIndex + d + reelCards.length) % reelCards.length]);
      };

      Array.prototype.forEach.call(vcards, function (c) {
        c.addEventListener('click', function () { openVideo(c); });
      });

      if (modal){
        modal.addEventListener('click', function (e) {
          var el = e.target.closest ? e.target : e.target.parentNode;
          if (el.closest('.vm-prev')) { stepVideo(-1); return; }
          if (el.closest('.vm-next')) { stepVideo(1); return; }
          if (el.closest('[data-vm-close]')) closeVideo();
        });
        document.addEventListener('keydown', function (e) {
          if (!modalOpen) return;
          if (e.key === 'Escape') closeVideo();
          else if (e.key === 'ArrowLeft') stepVideo(-1);
          else if (e.key === 'ArrowRight') stepVideo(1);
        });
      }

      /* ---------- Лайтбокс документов ---------- */
      var dm = document.getElementById('dmodal');
      var dmImg = document.getElementById('dmImg');
      var dmT = document.getElementById('dmTitle');
      var dmS = document.getElementById('dmSub');
      var dmFull = document.getElementById('dmFull');
      var docCards = document.querySelectorAll('.doc-it');
      if (dm && dmImg && docCards.length){
        var dmOpen = false, dmSheets = [], dmIdx = 0, dmBack = null;

        var dmShow = function () {
          var src = dmSheets[dmIdx];
          dmImg.classList.remove('is-ready');
          dmImg.setAttribute('src', src);
          dmImg.setAttribute('alt', dmT ? dmT.textContent : '');
          if (dmFull) dmFull.setAttribute('href', src);
          if (dmS) dmS.textContent = dmSheets.length > 1 ? (dmIdx + 1) + ' / ' + dmSheets.length : '';
          var multi = dmSheets.length > 1;
          Array.prototype.forEach.call(dm.querySelectorAll('.dm-prev,.dm-next'), function (b) {
            b.style.display = multi ? '' : 'none';
          });
        };

        dmImg.addEventListener('load', function () { dmImg.classList.add('is-ready'); });

        var dmOpenCard = function (card) {
          var list = (card.getAttribute('data-sheets') || '').split('|').filter(Boolean);
          if (!list.length) return;
          dmSheets = list; dmIdx = 0; dmBack = card;
          var t = card.querySelector('.dc-t');
          var k = card.querySelector('.doc-kind');
          if (dmT) dmT.textContent = (k ? k.textContent + ': ' : '') + (t ? t.textContent : '');
          dmOpen = true;
          dm.classList.add('is-open');
          document.body.classList.add('modal-open');
          dmShow();
          var x = dm.querySelector('.vm-x');
          if (x) x.focus();
        };

        var dmClose = function () {
          if (!dmOpen) return;
          dmOpen = false;
          dm.classList.remove('is-open');
          document.body.classList.remove('modal-open');
          dmImg.removeAttribute('src');
          dmImg.classList.remove('is-ready');
          if (dmBack && dmBack.focus) dmBack.focus();
        };

        var dmStep = function (d) {
          if (dmSheets.length < 2) return;
          dmIdx = (dmIdx + d + dmSheets.length) % dmSheets.length;
          dmShow();
        };

        Array.prototype.forEach.call(docCards, function (c) {
          c.addEventListener('click', function () { dmOpenCard(c); });
        });

        dm.addEventListener('click', function (e) {
          var el = e.target.closest ? e.target : e.target.parentNode;
          if (el.closest('.dm-full')) return;
          if (el.closest('.dm-prev')) { dmStep(-1); return; }
          if (el.closest('.dm-next')) { dmStep(1); return; }
          if (el.closest('[data-dm-close]')) dmClose();
        });

        document.addEventListener('keydown', function (e) {
          if (!dmOpen) return;
          if (e.key === 'Escape') dmClose();
          else if (e.key === 'ArrowLeft') dmStep(-1);
          else if (e.key === 'ArrowRight') dmStep(1);
        });
      }

      /* стрелки полки отзывов */
      var shelf = document.getElementById('reels');
      if (shelf){
        var prevB = document.querySelector('.reels-prev');
        var nextB = document.querySelector('.reels-next');
        var first = shelf.querySelector('.reel');
        var shift = function () {
          return first ? (first.getBoundingClientRect().width + 16) * 2 : 500;
        };
        var syncNav = function () {
          if (!prevB || !nextB) return;
          var max = shelf.scrollWidth - shelf.clientWidth - 4;
          prevB.disabled = shelf.scrollLeft <= 4;
          nextB.disabled = shelf.scrollLeft >= max;
        };
        if (prevB) prevB.addEventListener('click', function () { shelf.scrollLeft -= shift(); });
        if (nextB) nextB.addEventListener('click', function () { shelf.scrollLeft += shift(); });
        shelf.addEventListener('scroll', syncNav, { passive: true });
        window.addEventListener('resize', syncNav);
        syncNav();
      }
    }

    /* ---------- Плавная прокрутка по якорям ---------- */
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      if (history.replaceState) history.replaceState(null, '', id);
    });
  });

})();
