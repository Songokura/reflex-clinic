/* ============================================================
   Reflex Clinic - запись на приём через форму (главная и статья).
   Кнопки «Записаться» ведут к форме #zapis и подставляют причину обращения.
   Форма: имя, телефон и причина обязательны. После отправки - конверсия
   Google Ads и WhatsApp с текстом заявки (LeadBot склеивает форму и WhatsApp
   в одно обращение и дописывает код #XXXX).
   ============================================================ */
(function () {
  'use strict';

  var WA = '77000707791';
  var MSG_RU = { hello:'Здравствуйте! Заявка с сайта Reflex Clinic.', reason:'Что беспокоит', name:'Имя', phone:'Телефон', note:'Комментарий' };

  /* казахский текст заявки приезжает вместе со словарём страницы (assets/lang/*-kk.js) */
  function msg(){
    var kk = window.SITE_KK;
    return (document.documentElement.lang === 'kk' && kk && kk.msg) ? kk.msg : MSG_RU;
  }

  function normPhone(v){
    var d = String(v || '').replace(/\D/g, '');
    if (d.length === 11 && d.charAt(0) === '8') d = '7' + d.slice(1);
    if (d.length === 10) d = '7' + d;
    if (d.length !== 11 || d.charAt(0) !== '7') return '';
    return '+7 ' + d.slice(1, 4) + ' ' + d.slice(4, 7) + ' ' + d.slice(7, 9) + ' ' + d.slice(9, 11);
  }

  function init(){
    var form = document.getElementById('lead-form');
    if (!form) return;
    var fName = form.elements.name, fPhone = form.elements.phone, fReason = document.getElementById('reason'), fMsg = form.elements.msg;
    var fmOk = document.getElementById('fmok'), fmErr = document.getElementById('fmerr');

    /* ---------- кнопки «Записаться» → форма ---------- */
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-lead]') : null;
      if (!a) return;
      var k = a.getAttribute('data-lead');
      var opt = k && fReason.querySelector('option[data-k="' + k + '"]');
      if (opt){ fReason.value = opt.value; fReason.classList.remove('is-bad'); }
      /* на десктопе курсор в первое пустое поле, когда прокрутка доедет */
      if (window.matchMedia('(hover:hover)').matches) setTimeout(function () {
        var f = !fName.value.trim() ? fName : (!normPhone(fPhone.value) ? fPhone : null);
        if (f) try { f.focus({ preventScroll: true }); } catch (x) {}
      }, 900);
    });

    /* ---------- проверка полей ---------- */
    var checks = [
      [fName,   function () { return fName.value.trim().length >= 2; }],
      [fPhone,  function () { return !!normPhone(fPhone.value); }],
      [fReason, function () { return !!fReason.value; }]
    ];
    checks.forEach(function (c) {
      c[0].addEventListener(c[0].tagName === 'SELECT' ? 'change' : 'input', function () {
        if (c[1]()) c[0].classList.remove('is-bad');
        if (!fmErr.hidden && checks.every(function (x) { return x[1](); })) fmErr.hidden = true;
      });
    });
    fPhone.addEventListener('input', function () {
      var v = fPhone.value.replace(/[^\d+()\-\s]/g, '');
      if (v !== fPhone.value) fPhone.value = v;
    });

    /* Проверка на window в фазе захвата - раньше трекера LeadBot (он слушает submit на document).
       Незаполненная заявка и бот-ловушка не доходят ни до бота, ни до Google Ads. */
    window.addEventListener('submit', function (e) {
      if (e.target !== form) return;
      if (form.elements.hp_extra && form.elements.hp_extra.value){ e.preventDefault(); e.stopPropagation(); return; }
      var bad = checks.filter(function (c) { var ok = c[1](); c[0].classList.toggle('is-bad', !ok); return !ok; });
      if (bad.length){
        e.preventDefault(); e.stopPropagation();
        fmErr.hidden = false; fmOk.hidden = true;
        bad[0][0].focus();
        return;
      }
      fName.value = fName.value.trim();
      fPhone.value = normPhone(fPhone.value);   /* в бот уходит номер в едином виде */
    }, true);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var M = msg(), opt = fReason.options[fReason.selectedIndex];
      var parts = [M.hello, M.reason + ': ' + opt.textContent.trim()];
      if (fMsg.value.trim()) parts.push(M.note + ': ' + fMsg.value.trim());
      parts.push(M.name + ': ' + fName.value, M.phone + ': ' + fPhone.value);
      fmErr.hidden = true; fmOk.hidden = false;
      /* Google Ads: действие «Контакт» - теперь только за отправленную заявку */
      if (typeof window.gadsConvert === 'function') window.gadsConvert('lead');
      /* WhatsApp сразу после отправки - LeadBot склеивает форму и WhatsApp в одно обращение */
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(parts.join('\n')), '_blank', 'noopener');
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
