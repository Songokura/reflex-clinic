/* ============================================================
   Reflex Clinic - логика страницы
   i18n RU/KZ, появление блоков, меню, шторка "до/после".
   Конверсии Google Ads вешает Opus отдельно: см. хуки в конце файла.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Словарь казахской версии ---------- */
  var KZ = {
    nav_dir:'Бағыттар', nav_met:'Әдістер', nav_app:'Reflex тәсілі', nav_price:'Бағалар',
    nav_rev:'Пікірлер', nav_con:'Байланыс', nav_what:'Нені емдейміз', nav_metab:'Салмақ тастау',
    hdr_wa:'Жазылу', wa_book:'WhatsApp арқылы жазылу',
    nav_art:'Рефлексотомия', m1_link:'Әдіс туралы толығырақ',

    hero_kick:'Алматы · ауырсыну және зат алмасу клиникасы · 2024 жылдан бері',
    hero_h1a:'Омыртқа мен буындарды емдеу',
    hero_h1b:'операциясыз',
    hero_lead:'Омыртқа жарығы мен протрузия, арқа және мойын ауырсынуы, артроз, өкше шпорасы, салмақ тастау. Reflex авторлық тәсілі: шығыс әдістері және еуропалық оңалту, дәрігердің 16 жылдан астам тәжірибесі.',
    hero_btn2:'Диагностика және қабылдау - 5 000 ₸',
    hero_note:'Клиниканың барлық дәрігерлері - әйелдер. Әйелдерді де, ерлерді де қабылдаймыз',

    dirs_eye:'Бағыттар',
    dirs_h2:'Клиниканың екі тірегі: ауырсыну және зат алмасу',
    dirs_lead:'Reflex екі бағытта жұмыс істейді. Дәрігер алдымен себебін қарайды, содан кейін көрсетілім бойынша бағдарлама ұсынады - прайстан процедура сатпайды.',
    dir1_h:'Ауырсыну, омыртқа және буындар',
    dir1_l1:'Жарық және протрузия', dir1_l2:'Арқа, бел, мойын', dir1_l3:'Буындар, артроз, коксартроз',
    dir1_l4:'Өкше шпорасы', dir1_l5:'Созылмалы ауырсыну және неврология', dir_go:'Нені емдейміз',
    dir2_h:'Зат алмасу және салмақ тастау',
    dir2_l1:'Артық салмақ, салмақ тұрып қалған', dir2_l2:'Инсулинорезистенттілік',
    dir2_l3:'Зат алмасу бұзылысы', dir2_l4:'Шаршау, ұйқы, күйзеліс',
    dir2_l5:'Ас қорыту жолының функционалдық бұзылысы', dir_go2:'Қалай жұмыс істейміз',

    what_eye:'Ауырсыну, омыртқа, буындар',
    what_h2:'Нені емдейміз: жарық, протрузия, арқа, буындар, өкше шпорасы',
    what_lead:'Тек белгімен емес, ауырсынудың себебімен жұмыс істейміз. Төменде - бізге жиі келетін жағдайлар.',
    c1_h:'Жарық және протрузия',
    c1_p:'Бел және мойын бөлімдері, L3-L4, L4-L5, L5-S1. Ауырсынудың себебін және операциясыз ем мүмкіндігін талдаймыз.',
    c1_t1:'жарық', c1_t2:'протрузия', c1_t3:'резорбция', c1_t4:'жүйке қысылуы',
    c2_h:'Арқа, бел, мойын ауырсынуы',
    c2_p:'Шаншу, қозғалыстың қатаюы, аяққа немесе қолға беретін ауырсыну, саусақтардың ұюы, жауырын арасындағы күйдіру.',
    c3_h:'Буындар, артроз, коксартроз',
    c3_p:'Тізе, жамбас, иық: жүргенде және баспалдақта ауырсыну, сықырлау, ісіну, таңертеңгі қатаю.',
    c4_h:'Өкше шпорасы',
    c4_p:'Таңертең және демалыстан кейін басу ауыр, жүргенде өкше шаншиды, табан күйеді.',
    c5_h:'Неврология және созылмалы ауырсыну',
    c5_p:'Ишиас және шонданай жүйкесі, миофасциялық синдром, бұлшықет түйіндері, ұю мен шаншу.',
    c6_h:'Сіздің жағдайыңыз тізімде жоқ па?',
    c6_p:'Не мазалайтынын жазыңыз. Көмектесе алатынымызды және неден бастау керегін айтамыз.',
    c6_btn:'Дәрігерге жазу',

    met_eye:'Әдістер',
    met_h2:'Рефлексотомия, рефлексотерапия және буындарға PRP-терапия',
    met_lead:'Әдіс пен сеанс санын дәрігер диагностикадан кейін таңдайды. Төменде - жиі қолданатын әдістеріміз.',
    m1_h:'Рефлексотомия',
    m1_p:'Триггерлік аймақтармен және бұлшықет түйіндерімен нүктелі жұмыс. Амбулаториялық, тіліксіз және наркозсыз.',
    m1_n:'Көрсетілімді дәрігер қабылдауда анықтайды',
    m2_h:'Рефлексотерапия және ине терапиясы',
    m2_p:'Рефлекторлық нүктелерге әсер: спазмды басамыз, ауырсынумен және бұлшықет тонусымен жұмыс істейміз.',
    m2_n:'Курс жеке таңдалады',
    m3_h:'Буындарға PRP-терапия',
    m3_p:'Пациенттің өз плазмасымен буынды емдеу. Көрсетілім мен тексеру нәтижесі бойынша тағайындалады.',
    m3_n:'Тек дәрігердің тағайындауымен',
    met_foot:'Басқа әдістерді дәрігер жеке таңдайды - диагнозға, жасқа және қосымша жағдайларға қарай.',

    mb_eye:'Метаболикалық денсаулық',
    mb_h2:'Дәрігер бақылауымен салмақ тастау және зат алмасу',
    mb_lead:'Клиниканың екінші бағыты. Диагностикадан бастаймыз: салмақ неге тұрып қалды, зат алмасу, ұйқы және қуат деңгейі қандай.',
    mb1_h:'Салмақ тастау',
    mb1_p:'Жағдайыңызға сай бағдарлама: қатаң диетасыз және «бір аптада минус 10 келі» деген уәдесіз.',
    mb1_a:'диета мен спортта да салмақ түспейді',
    mb1_b:'үнемі аштық сезімі және тәттіге құмарлық',
    mb1_c:'40 жастан кейінгі салмақ қосу',
    mb2_h:'Инсулинорезистенттілік және зат алмасу',
    mb2_p:'Ағзаға қуат жұмсауға не кедергі болатынын және көрсетілім бойынша не істеу керегін талдаймыз.',
    mb2_a:'созылмалы шаршау және әлсіздік',
    mb2_b:'ұйқының бұзылуы және күйзеліс',
    mb2_c:'ас қорыту жолының функционалдық бұзылысы',
    mb_meth:'Бағыт әдістері',
    mn1_h:'Рефлекс жіптері',
    mn1_p:'Рефлекторлық нүктелерге әсер ету арқылы тағам әдеттерін өзгерту кезеңі жеңілірек өтеді.',
    mn2_h:'IV-терапия және тамшылатып құю',
    mn2_p:'Құрамын дәрігер тексеру нәтижесі мен жағдайыңызға қарай таңдайды.',
    mn3_h:'Озонотерапия',
    mn3_p:'Жеке «қызмет» ретінде емес, бағдарлама құрамында, көрсетілім бойынша тағайындалады.',
    mn4_h:'Пептидтік терапия',
    mn4_p:'Тек диагностикадан және қарсы көрсетілімдерді бағалаудан кейін.',
    mb_btn:'Бағдарлама туралы сұрау',

    ap_eye:'Reflex тәсілі',
    ap_h2:'Бір емдеу хаттамасында Шығыс пен Батыс',
    ap_lead:'Клиниканың тең құрылтайшысы нүктелермен жұмысқа негізделген шығыс тәсілі мен еуропалық оңалтуды біріктірді. Осылай Reflex тәсілі пайда болды.',
    rt1_b:'Пекин', rt1_s:'шығыс медицинасы бойынша оқу',
    rt2_b:'Мюнхен', rt2_s:'еуропалық тәжірибе және оңалту',
    rt3_b:'Алматы', rt3_s:'Reflex клиникасы, авторлық тәсіл',
    doc_name:'Айгуль Килымбековна',
    doc_role:'Дәрігер-невролог, реабилитолог. Reflex клиникасының тең құрылтайшысы',
    doc_f1b:'16+ жыл', doc_f1s:'медицинада',
    doc_f2b:'Пекин', doc_f2s:'шығыс медицинасы',
    doc_f3b:'Мюнхен', doc_f3s:'кәсіби тәжірибе',
    doc_cap:'Клиниканың барлық дәрігерлері - әйелдер. Әйелдерді де, ерлерді де қабылдаймыз, гинекологиялық қабылдау жоқ',

    st_eye:'Қабылдау қалай өтеді',
    st_h2:'WhatsApp-тағы хабарламадан емдеу бағдарламасына дейін төрт қадам',
    st1_h:'Жазылу', st1_p:'WhatsApp арқылы не мазалайтынын жазасыз. Уақыт таңдаймыз.',
    st2_h:'Диагностика және қарау', st2_p:'БРТ-аппаратындағы компьютерлік диагностика және клиника дәрігерінің қабылдауы.',
    st3_h:'Бағдарлама', st3_p:'Дәрігер себебін түсіндіріп, көрсетілімге сай жоспар ұсынады.',
    st4_h:'Курс және бақылау', st4_p:'Курстан өтесіз, дәрігер динамиканы қадағалап, бағдарламаны түзетеді.',

    pr_eye:'Алғашқы қабылдау',
    pr_h2:'Компьютерлік диагностика және дәрігер қабылдауы - 5 000 ₸',
    pr_lead:'Клиникаға алғаш келген пациенттерге арналған ұсыныс. Бұл қабылдаудың әдеттегі құны - 25 000 ₸.',
    pr_badge:'Алғашқы пациенттерге',
    pr_h3:'БРТ-аппаратындағы компьютерлік диагностика + клиника дәрігерінің кеңесі',
    pr_btn:'Диагностикаға жазылу',
    pr_note:'Қабылдауды клиника дәрігері жүргізеді. Диагностика тағайындалған тексеруді алмастырмайды.',
    pr_s_h:'Процедуралардың құны',
    pr_s_p:'Процедураның бағасын дәрігер диагностикадан кейін айтады: ол көрсетілімге, аймаққа және курс ұзақтығына байланысты. Бәріне бірдей прайс бізде жоқ.',
    pr_s_btn:'WhatsApp арқылы бағаны білу',

    rv_eye:'Пікірлер және нәтижелер',
    rv_h2:'Пациенттердің пікірлері мен нәтижелері',
    rv_lead:'Біз бөтен әңгімелер мен ойдан шығарылған пайыздарды жарияламаймыз. Мұнда пациенттеріміздің бейнепікірлері мен суреттері болады - тек олардың келісімімен.',
    vid_b:'Пациенттің бейнепікірі', vid_soon:'жақында',
    ba_h:'Курсқа дейінгі және кейінгі МРТ',
    ba_p:'Суреттер блогы осылай көрінеді. Пердені жылжытып көріңіз.',
    ba_before:'Дейін', ba_after:'Кейін',
    ba_note:'Плейсхолдер. Нақты суреттерді пациенттердің жазбаша келісімінен кейін орналастырамыз.',
    r2_h:'2GIS-тегі пікірлер',
    r2_p:'Клиника туралы нақты пікірлерді 2GIS парақшасынан оқыған ыңғайлы - сонда өз пікіріңізді де қалдыра аласыз.',
    r2_btn:'2GIS-те пікірлерді ашу',
    r2_note:'Мәтіндік пікірлерді, тарихтар мен нәтижелерді клиникамен бірге осы блокқа қосамыз.',

    ct_eye:'Байланыс',
    ct_h2:'Алматы, Жароков көшесі 137, «Арай» ТҚ, В2 блогы, 2-қабат',
    ct_lead:'Бізді бірден таба бермейді: кіреберіс сұлулық салоны арқылы. Төменде - қалай жетуге болатынының қысқаша сызбасы.',
    ct_addr:'Мекенжай',
    ct_addr_v:'Алматы қаласы, Жароков көшесі, 137<br>«Арай» ТҚ, В2 блогы, 2-қабат',
    ct_phone:'Телефон және WhatsApp',
    ct_hours:'Жұмыс кестесі',
    ct_d1:'Дс-Жм', ct_d2:'Сн', ct_d3:'Жк', ct_d3b:'демалыс',
    ct_2gis:'2GIS-те ашу',
    rt_eye:'Кіреберісті қалай табуға болады',
    rt_s1b:'«Арай» ТҚ, В2 блогы', rt_s1s:'Жароков көшесі, 137',
    rt_s2b:'Кіреберіс сұлулық салоны арқылы', rt_s2s:'тікелей салонға кіресіз',
    rt_s3b:'Сол жақтағы есік', rt_s3s:'салон залының артында',
    rt_s4b:'Екінші қабат', rt_s4s:'Reflex клиникасы',

    foot_addr:'Алматы, Жароков көшесі, 137, «Арай» ТҚ, В2 блогы, 2-қабат',
    foot_disc:'Қарсы көрсетілімдері бар, маманмен кеңесу қажет. Сайт материалдары медициналық ұсыныс емес және дәрігердің қабылдауын алмастырмайды. Медициналық қызметке лицензия № <span class="lic-slot">___________</span>.',
    foot_copy:'Reflex Clinic, Алматы. 2024 жылдан бері жұмыс істейміз',
    sb_call:'Қоңырау шалу', sb_wa:'WhatsApp'
  };

  var META = {
    ru:{
      title:'Reflex Clinic Алматы - лечение грыжи позвоночника без операции, суставы, снижение веса',
      desc:'Reflex Clinic в Алматы: лечение грыжи позвоночника и протрузий без операции, боли в спине и шее, артроз, пяточная шпора. Рефлексотомия, рефлексотерапия, PRP-терапия. Снижение веса и метаболическое здоровье. Диагностика и приём врача 5 000 тг.'
    },
    kz:{
      title:'Reflex Clinic Алматы - омыртқа жарығын операциясыз емдеу, буындар, салмақ тастау',
      desc:'Алматыдағы Reflex Clinic: омыртқа жарығы мен протрузияны операциясыз емдеу, арқа және мойын ауырсынуы, артроз, өкше шпорасы. Рефлексотомия, рефлексотерапия, PRP-терапия. Салмақ тастау және метаболикалық денсаулық. Диагностика мен дәрігер қабылдауы 5 000 тг.'
    }
  };

  var TICK = {
    ru:['болит спина','прострел в пояснице','отдаёт в ногу','не могу повернуть шею','немеют пальцы','хрустят колени','больно наступать на пятку','вес стоит на месте','постоянная усталость'],
    kz:['арқа ауырады','белге шаншу кірді','аяққа беріп ауырады','мойын бұрылмайды','саусақтар ұйиды','тізе сықырлайды','өкшеге басу ауыр','салмақ тұрып қалды','үнемі шаршау']
  };

  var RU = {};
  var lang = 'ru';

  function captureRU(){
    var nodes = document.querySelectorAll('[data-i]'), i;
    for (i = 0; i < nodes.length; i++){
      var k = nodes[i].getAttribute('data-i');
      if (!(k in RU)) RU[k] = nodes[i].innerHTML;
    }
  }

  function fillTicker(l){
    var sets = document.querySelectorAll('.ticker-set'), words = TICK[l] || TICK.ru, i, j;
    for (i = 0; i < sets.length; i++){
      var html = '';
      for (j = 0; j < words.length; j++) html += '<span>' + words[j] + '</span><i></i>';
      sets[i].innerHTML = html;
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
    fillTicker(l);
    lang = l;
    try { localStorage.setItem('reflex-lang', l); } catch (e) {}
  }

  /* ---------- Старт ---------- */
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
    if (start !== 'ru') applyLang(start); else fillTicker('ru');

    var langBtns = document.querySelectorAll('.lang-btn');
    Array.prototype.forEach.call(langBtns, function (b) {
      b.addEventListener('click', function () {
        var l = b.getAttribute('data-lang');
        if (l !== lang) applyLang(l);
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
      Array.prototype.forEach.call(document.querySelectorAll('.cards, .steps, .rev-grid, .mets, .dirs-grid'), function (grid) {
        Array.prototype.forEach.call(grid.children, function (child, i) {
          child.style.transitionDelay = (i % 4) * 0.07 + 's';
        });
      });
    }

    /* ---------- Шторка "до / после" ---------- */
    var range = document.getElementById('baRange');
    var clip = document.getElementById('baClip');
    var line = document.getElementById('baLine');
    if (range && clip && line){
      var setBa = function (v) {
        clip.style.width = v + '%';
        line.style.left = v + '%';
      };
      setBa(range.value);
      range.addEventListener('input', function () { setBa(range.value); });
    }

    /* ---------- Магнитные кнопки (только мышь) ---------- */
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce){
      Array.prototype.forEach.call(document.querySelectorAll('.btn-wa, .btn-lg'), function (b) {
        b.addEventListener('mousemove', function (e) {
          var r = b.getBoundingClientRect();
          var x = (e.clientX - r.left - r.width / 2) / r.width;
          var y = (e.clientY - r.top - r.height / 2) / r.height;
          b.style.transform = 'translate(' + (x * 8).toFixed(2) + 'px,' + (y * 6).toFixed(2) + 'px)';
        });
        b.addEventListener('mouseleave', function () { b.style.transform = ''; });
      });
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

  /* ============================================================
     Хуки под конверсии Google Ads.
     Opus подключит gtag и определит window.gtagWaClick / gtagTelClick.
     ============================================================ */
  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('a') : null;
    if (!el) return;
    if (el.classList.contains('js-wa') && typeof window.gtagWaClick === 'function') window.gtagWaClick();
    if (el.classList.contains('js-tel') && typeof window.gtagTelClick === 'function') window.gtagTelClick();
  });
})();
