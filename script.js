/* ============================================================
   VISAIR.KZ - скрипт страницы.
   Плиты направлений · перевод RU/KZ · шапка и меню · появление ·
   лид-форма (окно по кнопкам и через 10 секунд) · нижняя панель.
   Заявки уходят в Telegram через трекер LeadBot (t.js ловит submit с полями).
   Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var RED = matchMedia("(prefers-reduced-motion: reduce)").matches;
var HAS_IO = typeof IntersectionObserver === "function";
var doc = document.documentElement;

/* ---------------- КАЗАХСКИЙ СЛОВАРЬ ----------------
   Лежит отдельным файлом assets/lang/kk.js и грузится только когда человек сам
   выбрал KZ (или открыл ?lang=kk). В разметке и в script.js казахского текста нет:
   проверка Google Ads («Неподдерживаемый язык») видит только русский сайт.
   Версия файла берётся из ?v= этого скрипта - бампается вместе с остальными ассетами.
   Нет ключа - строка остаётся русской. */
var KZ = null;
var ASSET_V = ((document.currentScript && document.currentScript.src.match(/[?&]v=([^&]+)/)) || [])[1] || "";
function loadKK(done){
  if (KZ) return done();
  var s = document.createElement("script");
  s.src = "assets/lang/kk.js" + (ASSET_V ? "?v=" + ASSET_V : "");
  s.onload = function(){ var p = window.SITE_KK; if (p) KZ = p.dict; done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}
function setLang(lang, done){
  if (lang !== "kk") { applyLang("ru"); if (done) done(); return; }
  loadKK(function(){ applyLang(KZ ? "kk" : "ru"); if (done) done(); });
}

/* ---------------- ПЕРЕВОД ---------------- */
var RU = {};
function snapshot(){
  document.querySelectorAll("[data-i]").forEach(function(el){ RU[el.dataset.i] = el.innerHTML; });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){ RU[el.dataset.iPh] = el.placeholder; });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){ RU[el.dataset.iAlt] = el.alt; });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){ RU[el.dataset.iAria] = el.getAttribute("aria-label"); });
  document.querySelectorAll("[data-i-c]").forEach(function(el){ RU[el.dataset.iC] = el.getAttribute("content"); });
}
function pick(k, kk){ return (kk && KZ && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
function curLang(){ return doc.lang === "kk" ? "kk" : "ru"; }

function applyLang(lang){
  var kk = lang === "kk";
  doc.setAttribute("lang", kk ? "kk" : "ru");
  document.querySelectorAll("[data-i]").forEach(function(el){
    var v = pick(el.dataset.i, kk); if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i-ph]").forEach(function(el){
    var v = pick(el.dataset.iPh, kk); if (v !== undefined) el.placeholder = v;
  });
  document.querySelectorAll("[data-i-alt]").forEach(function(el){
    var v = pick(el.dataset.iAlt, kk); if (v !== undefined) el.alt = v;
  });
  document.querySelectorAll("[data-i-aria]").forEach(function(el){
    var v = pick(el.dataset.iAria, kk); if (v !== undefined) el.setAttribute("aria-label", v);
  });
  document.querySelectorAll("[data-i-c]").forEach(function(el){
    var v = pick(el.dataset.iC, kk); if (v !== undefined) el.setAttribute("content", v);
  });
  var t = pick("m.title", kk); if (t) document.title = t.replace(/<[^>]*>/g, "");
  var og = document.querySelector('meta[property="og:locale"]');
  if (og) og.setAttribute("content", kk ? "kk_KZ" : "ru_RU");
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === lang;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("visair-lang", lang); } catch(e){}
}
/* язык: ?lang= в URL (для рекламы) важнее сохранённого выбора */
function startLang(){
  var q = new URLSearchParams(location.search).get("lang");
  if (q === "kz") q = "kk";
  if (q === "kk" || q === "ru") return q;
  try { var v = localStorage.getItem("visair-lang"); if (v === "kk" || v === "ru") return v; } catch(e){}
  return "ru";
}

/* ---------------- ПЛИТЫ НАПРАВЛЕНИЙ ---------------- */
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeOutBack(t){ var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

var pws = [].slice.call(document.querySelectorAll(".pw"));
function update(){
  var H = innerHeight || doc.clientHeight;
  pws.forEach(function(pw){
    var r = pw.getBoundingClientRect();
    var enter = clamp(1 - r.top / H);
    var exit  = clamp(1 - r.bottom / H);
    var stay  = r.height > H + 1 ? clamp(-r.top / (r.height - H)) : enter;
    pw.style.setProperty("--enter", enter.toFixed(3));
    pw.style.setProperty("--exit",  exit.toFixed(3));
    pw.style.setProperty("--stay",  stay.toFixed(3));
    pw.classList.toggle("gone", exit >= 1);
    pw.classList.toggle("on", enter > 0.72);
    if (pw.querySelector(".dir-stamp")) {
      var t = clamp((enter - .42) / .58);
      var ap = t <= 0 ? 0 : easeOutBack(t);
      pw.style.setProperty("--ap", ap.toFixed(3));
      pw.style.setProperty("--op", clamp((enter - .42) / .2).toFixed(3));
    }
  });
}
var tick = false;
function onScroll(){
  if (tick) return; tick = true;
  requestAnimationFrame(function(){ tick = false; update(); hdrScroll(); });
}
if (!RED) {
  addEventListener("scroll", onScroll, {passive:true});
  addEventListener("resize", update);
  addEventListener("load", update);
} else {
  doc.classList.add("no-plate");
}
window.plateSync = update;

/* ---------------- ШАПКА, МЕНЮ, ДОК ---------------- */
var hdr = document.getElementById("hdr"), dock = document.getElementById("dock"), prev = scrollY || 0;
function hdrScroll(){
  var y = scrollY || doc.scrollTop;
  hdr.classList.toggle("solid", y > 12);
  /* прячем только при живой прокрутке вниз; прыжок по якорю (в т.ч. при загрузке с хэшем) шапку не трогает */
  var dy = y - prev;
  if (!document.body.classList.contains("menu-open")) {
    if (dy > 2 && dy < 400 && y > 320) hdr.classList.add("hide");
    else if (dy < -2 || y <= 320 || dy >= 400) hdr.classList.remove("hide");
  }
  if (dock) {
    var k = document.getElementById("kontakty");
    var nearEnd = k && k.getBoundingClientRect().top < innerHeight * .6;
    dock.classList.toggle("show", y > innerHeight * .55 && !nearEnd);
  }
  prev = y;
}
if (RED) addEventListener("scroll", function(){ requestAnimationFrame(hdrScroll); }, {passive:true});
hdrScroll();

var burger = document.getElementById("burger"), mnav = document.getElementById("mnav");
function setMenu(open){
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open ? "true" : "false");
  mnav.setAttribute("aria-hidden", open ? "false" : "true");
  document.body.style.overflow = open ? "hidden" : "";
}
burger.addEventListener("click", function(){ setMenu(!document.body.classList.contains("menu-open")); });
addEventListener("keydown", function(e){ if (e.key === "Escape") setMenu(false); });

/* ---------------- ЯКОРЯ ---------------- */
function scrollToHash(hash, push){
  var el = hash && hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
  if (!el) return false;
  var off = el.classList.contains("pw") ? 0 : parseFloat(getComputedStyle(doc).getPropertyValue("--hh")) || 64;
  var top = el.getBoundingClientRect().top + scrollY - off;
  if (hash === "#top") top = 0;
  window.scrollTo({ top: Math.max(0, top), behavior: RED ? "auto" : "smooth" });
  if (push) { try { history.pushState(null, "", hash); } catch(e){} }
  return true;
}
document.addEventListener("click", function(ev){
  var a = ev.target && ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
  if (!a) return;
  var h = a.getAttribute("href");
  if (h === "#") return;
  if (document.getElementById(h.slice(1))) {
    ev.preventDefault();
    setMenu(false);
    scrollToHash(h, true);
  }
});
/* прямой переход по URL с хэшем: интро пропущено инлайн-скриптом,
   здесь доводим позицию с учётом шапки */
if (location.hash && document.getElementById(location.hash.slice(1))) {
  addEventListener("load", function(){
    var el = document.getElementById(location.hash.slice(1));
    var off = el.classList.contains("pw") ? 0 : parseFloat(getComputedStyle(doc).getPropertyValue("--hh")) || 64;
    window.scrollTo(0, el.getBoundingClientRect().top + scrollY - off);
    update();
  });
}

/* ---------------- ПОЯВЛЕНИЕ ---------------- */
doc.classList.remove("no-js");
if (HAS_IO && !RED) {
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:"0px 0px -6% 0px"});
  document.querySelectorAll(".rv, .wide-stamp").forEach(function(el){ io.observe(el); });
  setTimeout(function(){
    document.querySelectorAll(".rv, .wide-stamp").forEach(function(el){
      var r = el.getBoundingClientRect();
      if (r.top < innerHeight && r.bottom > 0) el.classList.add("in");
    });
  }, 2500);
} else {
  document.querySelectorAll(".rv, .wide-stamp").forEach(function(el){ el.classList.add("in"); });
}

/* ---------------- СЧЁТЧИКИ В БЛОКЕ ЦИФР ----------------
   Значение по умолчанию стоит в разметке - без JS блок читается как есть. */
function fmtNum(v, dec){
  var t = v.toFixed(dec);
  var p = t.split(".");
  p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return p.join(".");
}
function runCount(el){
  var to = parseFloat(el.dataset.to) || 0;
  var dec = parseInt(el.dataset.dec || "0", 10);
  var suf = el.dataset.suf || "";
  if (RED) { el.textContent = fmtNum(to, dec) + suf; return; }
  var t0 = null, dur = 1500;
  requestAnimationFrame(function frame(t){
    if (t0 === null) t0 = t;
    var k = Math.min(1, (t - t0) / dur);
    var e = 1 - Math.pow(1 - k, 3);
    el.textContent = fmtNum(to * e, dec) + suf;
    if (k < 1) requestAnimationFrame(frame);
  });
}
var cnts = [].slice.call(document.querySelectorAll(".cnt"));
if (cnts.length) {
  if (HAS_IO && !RED) {
    cnts.forEach(function(c){ c.textContent = fmtNum(0, parseInt(c.dataset.dec || "0", 10)) + (c.dataset.suf || ""); });
    var cio = new IntersectionObserver(function(es){
      es.forEach(function(e){ if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
    }, {threshold:.45});
    cnts.forEach(function(c){ cio.observe(c); });
    setTimeout(function(){
      cnts.forEach(function(c){
        var r = c.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0 && c.textContent.charAt(0) === "0") { cio.unobserve(c); runCount(c); }
      });
    }, 2500);
  } else {
    cnts.forEach(runCount);
  }
}

/* ---------------- ЛЕНТА ВИЗ ---------------- */
var strip = document.getElementById("visaStrip");
var stripPrev = document.querySelector(".strip-prev");
var stripNext = document.querySelector(".strip-next");
function stripStep(){
  var c = strip && strip.querySelector(".visa");
  var g = parseFloat(getComputedStyle(strip).columnGap) || 18;
  return c ? c.getBoundingClientRect().width + g : 300;
}
function stripSync(){
  if (!strip || !stripPrev) return;
  stripPrev.disabled = strip.scrollLeft < 8;
  stripNext.disabled = strip.scrollLeft > strip.scrollWidth - strip.clientWidth - 8;
}
if (strip) {
  if (stripPrev && stripNext) {
    stripPrev.addEventListener("click", function(){ strip.scrollBy({left:-stripStep(), behavior: RED ? "auto" : "smooth"}); });
    stripNext.addEventListener("click", function(){ strip.scrollBy({left: stripStep(), behavior: RED ? "auto" : "smooth"}); });
  }
  strip.addEventListener("scroll", function(){ requestAnimationFrame(stripSync); }, {passive:true});
  addEventListener("resize", stripSync);
  stripSync();
}

/* ---------------- ПРОСМОТР ВИЗЫ ---------------- */
var lbox = document.getElementById("lbox");
var lbImg = document.getElementById("lboxImg"), lbCap = document.getElementById("lboxCap");
var lbX = document.getElementById("lboxX"), lbP = document.getElementById("lboxP"), lbN = document.getElementById("lboxN");
var visaBtns = [].slice.call(document.querySelectorAll(".visa-b")), lbI = 0;
function lbShow(i){
  if (!visaBtns.length) return;
  lbI = (i + visaBtns.length) % visaBtns.length;
  var b = visaBtns[lbI], img = b.querySelector("img"), cap = b.querySelector(".visa-cap");
  lbImg.src = img.getAttribute("src");
  lbImg.alt = img.alt;
  lbCap.textContent = cap ? cap.textContent : "";
}
function lbOpen(i){
  lbShow(i);
  lbox.hidden = false;
  document.body.classList.add("lb-open");
  if (lbX) lbX.focus();
}
function lbClose(){
  if (!lbox || lbox.hidden) return;
  lbox.hidden = true;
  document.body.classList.remove("lb-open");
  if (visaBtns[lbI]) visaBtns[lbI].focus();
}
if (lbox && visaBtns.length) {
  visaBtns.forEach(function(b, i){ b.addEventListener("click", function(){ lbOpen(i); }); });
  if (lbX) lbX.addEventListener("click", lbClose);
  if (lbP) lbP.addEventListener("click", function(){ lbShow(lbI - 1); });
  if (lbN) lbN.addEventListener("click", function(){ lbShow(lbI + 1); });
  lbox.addEventListener("click", function(e){
    if (e.target === lbox || (e.target.classList && e.target.classList.contains("lbox-in"))) lbClose();
  });
  addEventListener("keydown", function(e){
    if (lbox.hidden) return;
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowLeft") lbShow(lbI - 1);
    else if (e.key === "ArrowRight") lbShow(lbI + 1);
  });
}

/* ---------------- ЛИД-ФОРМА ----------------
   Весь поток заявок - через форму: кнопки .js-lead открывают окно (кнопка
   направления сразу подставляет страну), через 10 секунд на сайте окно
   всплывает само - один раз за визит и только если заявки ещё не было.
   Отправку в Telegram делает трекер LeadBot: он слушает submit в фазе
   захвата и забирает поля формы. Сайт только проверяет поля и показывает «спасибо». */
var lm = document.getElementById("lm"), lmForm = document.getElementById("lmForm");
var leadSent = false, lmLast = null, lmTimer = null;
try { leadSent = sessionStorage.getItem("visair-lead") === "1"; } catch(e){}
function lmOpen(dir){
  if (!lm) return;
  clearTimeout(lmTimer);
  var box = lm.querySelector(".lm-box");
  lmForm.hidden = false; box.querySelector(".thanks").hidden = true;
  if (dir) { var sel = lmForm.elements["Направление"]; sel.value = dir; sel.closest(".field").classList.remove("bad"); }
  setMenu(false);
  lmLast = document.activeElement;
  lm.hidden = false;
  document.body.classList.add("lm-open");
  setTimeout(function(){ var f = lmForm.elements.name; if (f && innerWidth > 700) f.focus(); }, 60);
}
function lmClose(){
  if (!lm || lm.hidden) return;
  lm.hidden = true;
  document.body.classList.remove("lm-open");
  if (lmLast && lmLast.focus) lmLast.focus();
}
document.addEventListener("click", function(ev){
  var b = ev.target && ev.target.closest ? ev.target.closest(".js-lead") : null;
  if (!b) return;
  ev.preventDefault();
  lmOpen(b.dataset.dir || "");
});
if (lm) {
  document.getElementById("lmX").addEventListener("click", lmClose);
  lm.querySelector(".lm-done").addEventListener("click", lmClose);
  lm.addEventListener("click", function(e){ if (e.target === lm) lmClose(); });
  addEventListener("keydown", function(e){ if (e.key === "Escape") lmClose(); });
  lmTimer = setTimeout(function(){
    if (leadSent || !lm.hidden || document.body.classList.contains("lb-open")) return;
    try { if (sessionStorage.getItem("visair-lm")) return; sessionStorage.setItem("visair-lm", "1"); } catch(e){}
    lmOpen("");
  }, 10000);
}

/* маска телефона +7 (___) ___-__-__ */
document.querySelectorAll('.lf input[type="tel"]').forEach(function(el){
  el.addEventListener("input", function(){
    var d = el.value.replace(/\D/g, "");
    if (!d) { el.value = ""; return; }
    if (d.charAt(0) === "8") d = "7" + d.slice(1);
    if (d.charAt(0) !== "7") d = "7" + d;
    d = d.slice(0, 11);
    var r = "+7";
    if (d.length > 1) r += " (" + d.slice(1, 4);
    if (d.length > 4) r += ") " + d.slice(4, 7);
    if (d.length > 7) r += "-" + d.slice(7, 9);
    if (d.length > 9) r += "-" + d.slice(9, 11);
    el.value = r;
  });
  el.addEventListener("focus", function(){ if (!el.value) el.value = "+7 ("; });
  el.addEventListener("blur", function(){ if (el.value.replace(/\D/g, "").length <= 1) el.value = ""; });
});

/* проверка полей. Обработчик на window в фазе захвата: ошибочную форму
   останавливаем раньше трекера, чтобы в Telegram не ушла пустая заявка */
function checkLead(form){
  var el = form.elements, ok = true;
  form.querySelectorAll(".field").forEach(function(f){ f.classList.remove("bad"); });
  function need(inp, good){ if (!good) { inp.closest(".field").classList.add("bad"); ok = false; } }
  need(el.name, el.name.value.trim().length > 0);
  need(el.phone, el.phone.value.replace(/\D/g, "").length === 11);
  need(el["Тип визы"], !!el["Тип визы"].value);
  need(el["Направление"], !!el["Направление"].value);
  form.querySelector(".f-err").hidden = ok;
  return ok;
}
window.addEventListener("submit", function(ev){
  var form = ev.target;
  if (!form || !form.classList || !form.classList.contains("lf")) return;
  ev.preventDefault();
  if (form.elements.website && form.elements.website.value) { ev.stopImmediatePropagation(); return; } /* honeypot */
  if (!checkLead(form)) { ev.stopImmediatePropagation(); return; }
}, true);
document.querySelectorAll(".lf").forEach(function(form){
  /* обычная фаза: трекер уже забрал поля, показываем «спасибо» */
  form.addEventListener("submit", function(ev){
    ev.preventDefault();
    if (form.querySelector(".f-err").hidden === false) return;
    if (form.elements.website && form.elements.website.value) return;
    leadSent = true; clearTimeout(lmTimer);
    try { sessionStorage.setItem("visair-lead", "1"); } catch(e){}
    conv(CONV.lead); /* конверсия «Отправка формы для потенциальных клиентов» */
    var th = form.parentNode.querySelector(".thanks");
    setTimeout(function(){ form.reset(); form.hidden = true; if (th) th.hidden = false; }, 0);
  });
  form.addEventListener("change", function(e){
    var f = e.target.closest && e.target.closest(".field");
    if (f && e.target.value) f.classList.remove("bad");
  });
});

/* ---------------- ДЕЛЕГИРОВАННЫЕ КЛИКИ tel/WhatsApp ----------------
   Конверсии Google Ads. Навигацию не перехватываем: tel: открывает
   звонилку, wa.me уходит в новую вкладку - страница остаётся живой,
   а transport_type beacon доставляет событие даже при уходе со страницы. */
var CONV = window.VISAIR_CONV || {};
function conv(id){
  if (!id || typeof window.gtag !== "function") return;
  window.gtag("event", "conversion", {
    send_to: id, value: 1.0, currency: "USD", transport_type: "beacon"
  });
}
document.addEventListener("click", function(ev){
  var a = ev.target && ev.target.closest ? ev.target.closest("a[href^='tel:'],a[href*='wa.me']") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";
  conv(href.indexOf("tel:") === 0 ? CONV.phone : CONV.contact);
});

/* ---------------- СТАРТ ---------------- */
snapshot();
setLang(startLang());
var y = document.getElementById("year"); if (y) y.textContent = String(new Date().getFullYear());
update();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);

document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){
    var l = b.getAttribute("data-lang");
    if (doc.lang === l) return;
    if (RED) { setLang(l); return; }
    document.body.classList.add("lang-swap");
    setTimeout(function(){
      setLang(l, function(){
        document.body.classList.remove("lang-swap");
        update();
      });
    }, 180);
  });
});
})();
