/* ============================================================
   Reflex Clinic - страница-статья "Рефлексотомия"
   i18n RU/KZ, оглавление со следящей подсветкой, появление секций.
   Конверсии Google Ads вешает Opus отдельно: хуки в конце файла.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Словарь казахской версии ---------- */
  var KZ = {
    nav_home:'Басты бет', nav_what:'Нені емдейміз', nav_met:'Әдістер', nav_art:'Рефлексотомия',
    nav_price:'Бағалар', nav_con:'Байланыс', nav_metab:'Салмақ тастау', nav_dir:'Бағыттар',
    hdr_wa:'Жазылу', wa_ask:'WhatsApp арқылы сұрау',

    crumb_home:'Reflex Clinic', crumb_cur:'Рефлексотомия',
    art_kick:'Мақала · ауырсынуды емдеу әдісі',
    art_h1:'Рефлексотомия: бұл қандай әдіс және қандай жағдайларда көмектеседі',
    art_lead:'Аз инвазиялы әдіс: әсер кішкене тесік арқылы, хирургиялық тіліксіз және жергілікті жансыздандырумен жүргізіледі. Төменде - әдістің артықшылықтары, омыртқааралық жарықтың резорбция бағдарламасы, өкше шпорасындағы нәтиже және буындармен жұмыс.',
    art_meta1:'Reflex клиникасының материалы, Алматы',
    art_meta2:'Жаңартылды 30.08.2026',
    art_meta3:'Оқу уақыты 6 минут',

    toc_t:'Мазмұны',
    toc_1:'Әдістің артықшылықтары',
    toc_2:'Аз инвазиялылық және жансыздандыру',
    toc_3:'Жарықтың резорбция бағдарламасы',
    toc_4:'Өкше шпорасы',
    toc_5:'Буын аурулары',
    toc_6:'Рефлексотомияны неге таңдайды',
    toc_7:'Қабылдауға жазылу',

    s1_eye:'Артықшылықтары',
    s1_h2:'Рефлексотомияның негізгі артықшылықтары',
    s1_p:'Төменде - әдісті жиі таңдаудың төрт себебі: процедура қалай өтеді, жарықтың резорбция бағдарламасына не кіреді, өкше шпорасында неден үміт күтуге болады және буын ауруларында рефлексотомия не береді.',
    p1_h:'Тіліктің орнына тесік',
    p1_p:'Жергілікті жансыздандырумен, клиникалық жағдайда',
    p2_h:'Жарықтың резорбция бағдарламасы',
    p2_p:'Дәрігердің бақылауымен жеке жоспар',
    p3_h:'Өкше шпорасы',
    p3_p:'Көбі алғашқы процедурадан кейін-ақ жеңілдеу сезінеді',
    p4_h:'Буындар',
    p4_p:'Артроз, коксартроз, қозғалыс шектелуі',

    s2_eye:'Қалай өтеді',
    s2_h2:'Аз инвазиялы және қауіпсіз процедура',
    s2_p1:'Рефлексотомия хирургиялық тіліксіз, кішкене тесік арқылы жүргізіледі. Әсер етер алдында жергілікті жансыздандыру қолданылады, сондықтан процедура әдетте жайлы өтеді. Түйсіну науқастың сезімталдығына және емделетін аймаққа байланысты әртүрлі болуы мүмкін.',
    s2_p2:'Процедура клиникалық жағдайда, бір реттік стерильді аспаптармен жүргізіледі. Емдеу алдында дәрігер диагнозды, тексеру нәтижелерін қарап, қарсы көрсетілімдерді жоққа шығарады.',
    s2_p3:'Процедурадан кейін ауруханада ұзақ жату немесе ұзаққа созылатын оңалту қажет емес. Науқастардың көбі дәрігердің ұсыныстарын сақтай отырып, әдеттегі белсенділігіне орала алады.',
    s2_cap:'Жұмыс нүктелі түрде, дәрігер қабылдауда белгілейтін аймақтар бойынша жүреді',
    f1_h:'Тесік', f1_p:'хирургиялық тіліксіз',
    f2_h:'Жергілікті жансыздандыру', f2_p:'әсер етер алдында',
    f3_h:'Бір реттік аспаптар', f3_p:'стерильді, клиникада',
    f4_h:'Ауруханаға жатқызбай', f4_p:'қалпына келу қысқа',

    s3_eye:'Жарық',
    s3_h2:'Омыртқааралық жарықтың резорбция бағдарламасы',
    s3_p1:'Омыртқааралық жарығы бар науқастар үшін Reflex клиникасында резорбцияның жеке бағдарламасы қарастырылған.',
    s3_q:'Резорбция - бұл жарық томпағының біртіндеп кішіреюінің табиғи үдерісі. Бағдарламаның міндеті - организмнің қалпына келуіне жағдай жасау, қабынуды, бұлшықет спазмын және ауырсыну синдромын азайту, сондай-ақ қозғалғыштықты жақсарту.',
    s3_sub:'Бағдарламаға кіруі мүмкін:',
    s3_l1:'дәрігердің кеңесі мен қарауы',
    s3_l2:'МРТ нәтижесін зерттеу',
    s3_l3:'авторлық рефлексотомия',
    s3_l4:'жеке таңдалған қосымша процедуралар',
    s3_l5:'жүктеме мен қалпына келу бойынша ұсыныстар',
    s3_l6:'дәрігердің бақылауы',
    s3_l7:'жағдайды қадағалау және өзгерістерді динамикада бағалау',
    s3_note:'Нәтижені бағалау үшін дәрігер бақылау МРТ-сын ұсынуы мүмкін. Жарықтың кішірею жылдамдығы мен дәрежесі әркімде әртүрлі, сондықтан жарықтың толық сіңіп кетуіне ешбір науқасқа уәде беруге болмайды.',

    s4_eye:'Өкше шпорасы',
    s4_h2:'Өкше шпорасында алғашқы процедурадан кейінгі нәтиже',
    s4_cap:'Дәрігер өкше аймағындағы ауыратын және кернелген тіндермен жұмыс істейді',
    s4_p1:'Өкше шпорасында көптеген науқастар рефлексотомияның алғашқы процедурасынан кейін-ақ ауырсынудың азайғанын және жүруге жеңілдегенін айтады.',
    s4_p2:'Дәрігер өкше аймағындағы ауыратын және патологиялық кернелген тіндерге тікелей әсер етеді. Бұл ауырсынуды азайтуға, тіндердің кернеуін төмендетуге және табанға сүйенуді жеңілдетуге көмектеседі.',
    s4_note:'Нәтиженің айқындығы мен ұзақтығы науқастың жағдайына, аурудың ұзақтығына және дәрігер ұсыныстарының сақталуына байланысты.',

    s5_eye:'Буындар',
    s5_h2:'Буын ауруларындағы көмек',
    s5_p1:'Рефлексотомия артроз, коксартроз кезінде, тізе, жамбас, иық және басқа буындардағы ауырсыну мен қозғалыс шектелуінде қолданылады.',
    s5_p2:'Процедура буынды қоршаған жұмсақ тіндердің ауыратын және спазмға түскен учаскелеріне әсер етуге көмектеседі. Емнен кейін науқастар мыналарды байқауы мүмкін:',
    ch1:'ауырсынудың азаюы', ch2:'бұлшықет кернеуінің төмендеуі', ch3:'қозғалыс қатаюының азаюы',
    ch4:'қозғалыс көлемінің ұлғаюы', ch5:'жүруге жеңілдеу', ch6:'күнделікті белсенділіктің жақсаруы',
    s5_note:'Буын ауруларында әдістеме артроз сатысын, тексеру нәтижелерін және науқастың жалпы жағдайын ескере отырып жеке таңдалады.',

    s6_eye:'Қысқаша',
    s6_h2:'Науқастар рефлексотомияны неге таңдайды',
    s6_p:'Авторлық әдістеменің негізгі артықшылықтары:',
    w1:'үлкен хирургиялық тіліксіз, аз инвазиялы әсер',
    w2:'процедураны жайлы өткізу үшін жергілікті жансыздандыру',
    w3:'емдеу аймақтарын жеке таңдау',
    w4:'ауыратын және кернелген тіндерге тікелей әсер',
    w5:'ауруханада ұзақ жатудың қажет болмауы',
    w6:'қалпына келу кезеңінің қысқалығы',
    w7:'алғашқы процедурадан кейін-ақ жеңілдеу сезіну мүмкіндігі',
    w8:'жарық, протрузия, өкше шпорасы және буын ауруларында қолданылуы',
    w9:'омыртқааралық жарықтың резорбция бағдарламасына қосу мүмкіндігі',
    w10:'процедураның медициналық клиникада, дәрігер бақылауымен жүргізілуі',
    s6_warn:'Емдеу нәтижесі әркімде әртүрлі және диагнозға, аурудың сатысына, организмнің ерекшеліктеріне байланысты. Процедура алдында дәрігердің кеңесі қажет.',

    s7_eye:'Қабылдау',
    s7_h2:'Reflex клиникасына қалай жазылуға болады',
    s7_p:'WhatsApp арқылы не мазалайтынын жазыңыз, МРТ болса қоса жіберіңіз. Дәрігер қабылдауда қарап, рефлексотомияның сізге көрсетілген-көрсетілмегенін айтады.',
    cta_h:'Алғаш келген науқастарға: БРТ-аппаратындағы компьютерлік диагностика және клиника дәрігерінің қабылдауы',
    cta_note:'Қабылдауды клиниканың дәрігері жүргізеді. Диагностика тағайындалған тексеруді алмастырмайды.',
    cta_btn:'WhatsApp арқылы жазылу',
    cta_addr:'Алматы, Жароков көшесі, 137, «Арай» ТҚ, В2 блогы, 2-қабат',
    l1:'Жарық және протрузия', l2:'Өкше шпорасы', l3:'Буындар және артроз', l4:'Клиниканың барлық әдістері',

    foot_addr:'Алматы, Жароков көшесі, 137, «Арай» ТҚ, В2 блогы, 2-қабат',
    s6_doc:'«Рефлексотомия» әдістемесі авторлық құқық объектілерінің мемлекеттік тізіліміне енгізілген (№ 77379) және тауар таңбасы ретінде тіркелген (№ 116197). <a class="art-doclink" href="index.html#dokumenty">Құжаттарды қарау</a>',
    foot_disc:'Қарсы көрсетілімдері бар, маманмен кеңесу қажет. Сайт материалдары медициналық ұсыныс емес және дәрігердің қабылдауын алмастырмайды. Медициналық қызметке лицензия № 25016124, 19.05.2025.',
    foot_copy:'Reflex Clinic, Алматы. 2024 жылдан бері жұмыс істейміз'
  };

  var META = {
    ru: {
      title:'Рефлексотомия: что это, как проходит и при чём помогает - Reflex Clinic Алматы',
      desc:'Рефлексотомия - малоинвазивный метод лечения боли: через небольшой прокол, с местным обезболиванием, без хирургического разреза. Разбираем преимущества метода, программу резорбции межпозвоночной грыжи, результат при пяточной шпоре и помощь при артрозе и коксартрозе. Материал клиники Reflex, Алматы.'
    },
    kz: {
      title:'Рефлексотомия: бұл қандай әдіс, қалай өтеді және қандай жағдайларда көмектеседі - Reflex Clinic Алматы',
      desc:'Рефлексотомия - ауырсынуды емдеудің аз инвазиялы әдісі: кішкене тесік арқылы, жергілікті жансыздандырумен, хирургиялық тіліксіз. Әдістің артықшылықтары, омыртқааралық жарықтың резорбция бағдарламасы, өкше шпорасындағы нәтиже, артроз және коксартроз кезіндегі көмек. Reflex клиникасының материалы, Алматы.'
    }
  };

  var RU = {}, lang = 'ru';

  function captureRU(){
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      if (!(k in RU)) RU[k] = nodes[i].innerHTML;
    }
  }

  function applyLang(l){
    var dict = (l === 'kz') ? KZ : RU;
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      var v = (l === 'kz') ? (dict[k] !== undefined ? dict[k] : RU[k]) : RU[k];
      if (v !== undefined) nodes[i].innerHTML = v;
    }
    document.documentElement.lang = (l === 'kz') ? 'kk' : 'ru';
    document.title = META[l].title;
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', META[l].desc);
    var btns = document.querySelectorAll('.lang-btn');
    for (i = 0; i < btns.length; i++){
      var on = btns[i].getAttribute('data-lang') === l;
      btns[i].classList.toggle('is-active', on);
      btns[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    lang = l;
    try { localStorage.setItem('reflex-lang', l); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    captureRU();

    /* язык: ?lang= в URL важнее сохранённого - реклама ведёт на нужную версию */
    var urlLang = null;
    try {
      var q = new URLSearchParams(location.search).get('lang');
      if (q === 'kz' || q === 'kk') urlLang = 'kz';
      if (q === 'ru') urlLang = 'ru';
    } catch (e) {}
    var saved = null;
    try { saved = localStorage.getItem('reflex-lang'); } catch (e) {}
    var start = urlLang || (saved === 'kz' ? 'kz' : 'ru');
    if (start !== 'ru') applyLang(start);

    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        if (l !== lang) applyLang(l);
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

  /* ============================================================
     Хуки под конверсии Google Ads (вешает Opus):
     .js-wa  - клик по кнопке WhatsApp
     .js-tel - клик по телефону
     ============================================================ */
})();
