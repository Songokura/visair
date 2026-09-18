/* ============================================================
   VISAIR.KZ - скрипт страницы.
   Плиты и штамп-оттиск · интро · перевод RU/KZ · шапка и меню ·
   бегущая лента · появление · форма -> WhatsApp · нижняя панель.
   Библиотек нет.
   ============================================================ */
(function(){
"use strict";
var WA = "77759020897";
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
  s.onload = function(){ var p = window.SITE_KK; if (p) { KZ = p.dict; WAT.kk = p.wa; UI.kk = p.ui; } done(); };
  s.onerror = function(){ done(); };
  document.head.appendChild(s);
}
function setLang(lang, done){
  if (lang !== "kk") { applyLang("ru"); if (done) done(); return; }
  loadKK(function(){ applyLang(KZ ? "kk" : "ru"); if (done) done(); });
}

/* готовые сообщения в WhatsApp */
var WAT = {
  ru:{
    "wa.main":"Здравствуйте! Нужна помощь с документами на визу. Подскажите, пожалуйста, сроки, стоимость услуги и список документов.",
    "wa.shengen":"Здравствуйте! Нужна помощь с документами на шенгенскую визу (Европа). Подскажите сроки, стоимость услуги и список документов.",
    "wa.usa":"Здравствуйте! Нужна помощь с документами на визу в США. Подскажите сроки, стоимость услуги и список документов.",
    "wa.uk":"Здравствуйте! Нужна помощь с документами на визу в Великобританию. Подскажите сроки, стоимость услуги и список документов.",
    "wa.canada":"Здравствуйте! Нужна помощь с документами на визу в Канаду. Подскажите сроки, стоимость услуги и список документов.",
    "wa.japan":"Здравствуйте! Нужна помощь с документами на визу в Японию (или другую страну Азии). Подскажите сроки, стоимость услуги и список документов.",
    "wa.price":"Здравствуйте! Подскажите, пожалуйста, стоимость услуги по подготовке документов и что в неё входит."
  }
};
var UI = {
  ru:{ msg:"Здравствуйте! Меня зовут {n}. Нужна помощь с документами на визу: {d}. Гражданство: {c}. Телефон: {p}." }
};

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
  document.querySelectorAll("[data-wa]").forEach(function(a){
    var m = ((kk && WAT.kk) || WAT.ru)[a.dataset.wa] || WAT.ru["wa.main"];
    a.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(m);
  });
  document.querySelectorAll(".lang button").forEach(function(b){
    var on = b.getAttribute("data-lang") === lang;
    b.classList.toggle("is-active", on);
    b.setAttribute("aria-pressed", on ? "true" : "false");
  });
  try { localStorage.setItem("visair-lang", lang); } catch(e){}
  buildTicker();
}
/* язык: ?lang= в URL (для рекламы) важнее сохранённого выбора */
function startLang(){
  var q = new URLSearchParams(location.search).get("lang");
  if (q === "kz") q = "kk";
  if (q === "kk" || q === "ru") return q;
  try { var v = localStorage.getItem("visair-lang"); if (v === "kk" || v === "ru") return v; } catch(e){}
  return "ru";
}

/* ---------------- БЕГУЩАЯ ЛЕНТА ----------------
   Шаг цикла = ширина одной копии списка; копий столько,
   чтобы дорожка перекрывала два экрана. */
var tickerSrc = null;
function buildTicker(){
  var track = document.getElementById("ticker"); if (!track) return;
  if (!tickerSrc) tickerSrc = track.querySelector(".ticker-set").outerHTML;
  var kk = curLang() === "kk";
  var html = tickerSrc.replace(/<b data-i="(t\.\d)">[^<]*<\/b>/g, function(_, k){ return '<b data-i="' + k + '">' + (pick(k, kk) || "") + "</b>"; });
  track.innerHTML = html;
  var w = track.firstElementChild.getBoundingClientRect().width || 600;
  var need = Math.max(2, Math.ceil((innerWidth * 2 + w) / w));
  for (var i = 1; i < need; i++) track.insertAdjacentHTML("beforeend", html);
  track.style.setProperty("--w", w.toFixed(1) + "px");
  track.style.setProperty("--dur", Math.max(14, w / 55).toFixed(1) + "s");
}

/* ---------------- ПЛИТЫ И ШТАМП ---------------- */
function clamp(v){ return v < 0 ? 0 : (v > 1 ? 1 : v); }
function easeInOut(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
function easeOutBack(t){ var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); }

var heroPw = document.getElementById("top");
var heroStamp = document.getElementById("heroStamp");
var heroM = { w:320, h:300, cy:400, smax:3 };

/* размер штампа в герое: помещается между текстом и лентой,
   плюс сразу считаем, во сколько раз его растить до краёв экрана */
function measureHero(){
  if (!heroStamp) return;
  var W = innerWidth, H = innerHeight;
  var stage = heroStamp.parentElement;
  var st = getComputedStyle(stage);
  var availH = stage.clientHeight - parseFloat(st.paddingTop) - parseFloat(st.paddingBottom);
  var aspect = W < 700 ? 1.08 : 1.5;
  var w = Math.min(780, W * .88);
  var h = Math.min(w / aspect, availH - .07 * w);
  if (h < 150) { h = 150; }
  w = Math.min(w, h * aspect);
  heroStamp.style.setProperty("--w", w.toFixed(1) + "px");
  heroStamp.style.setProperty("--h", h.toFixed(1) + "px");
  heroStamp.style.setProperty("--s", "1");
  heroStamp.style.setProperty("--dy", "0px");
  var r = heroStamp.getBoundingClientRect();
  var pr = heroPw.querySelector(".plate").getBoundingClientRect();
  heroM.w = w; heroM.h = h;
  heroM.cy = (r.top + r.height / 2) - pr.top;
  heroM.smax = Math.max(W / w, H / h) * 1.12;
}

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
    if (pw === heroPw && heroStamp) {
      var e = easeInOut(stay);
      var s = 1 + (heroM.smax - 1) * e;
      heroStamp.style.setProperty("--s", s.toFixed(4));
      heroStamp.style.setProperty("--dy", ((H / 2 - heroM.cy) * e).toFixed(1) + "px");
      heroStamp.style.setProperty("--rot", (-4 * (1 - e)).toFixed(2) + "deg");
      heroStamp.style.setProperty("--rr", (24 * (1 - e)).toFixed(1) + "px");
    } else if (pw.querySelector(".dir-stamp")) {
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
  addEventListener("resize", function(){ measureHero(); update(); buildTicker(); });
  addEventListener("load", function(){ measureHero(); update(); });
} else {
  doc.classList.add("no-plate");
}
window.plateSync = function(){ measureHero(); update(); };

/* ---------------- ИНТРО ----------------
   Класс intro ставится инлайн-скриптом в <head>. Здесь - снятие:
   штамп «прикладывается», текст поднимается. Пропуск - при хэше,
   прокрутке и reduced-motion (тогда сразу no-intro). */
function finishIntro(){
  if (!doc.classList.contains("intro")) return;
  doc.classList.remove("intro");
  doc.classList.add("intro-anim", "intro-done");
  setTimeout(function(){ doc.classList.remove("intro-anim"); }, 1700);
}
if (doc.classList.contains("intro")) {
  if (scrollY > 80) { doc.classList.remove("intro"); doc.classList.add("no-intro"); }
  else {
    var started = false;
    function go(){ if (started) return; started = true; finishIntro(); }
    var img = heroStamp && heroStamp.querySelector("img");
    if (img && img.complete) setTimeout(go, 120);
    else if (img) { img.addEventListener("load", function(){ setTimeout(go, 60); }); setTimeout(go, 900); }
    else setTimeout(go, 200);
  }
}

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
    measureHero(); update();
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

/* ---------------- ФОРМА -> WHATSAPP ---------------- */
var form = document.getElementById("form"), ferr = document.getElementById("ferr"), fcit = document.getElementById("fcit"), thanks = document.getElementById("thanks");
if (form) form.addEventListener("submit", function(ev){
  ev.preventDefault();
  if (form.site && form.site.value) return; /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), dir = form.dir.value, msg = form.msg.value.trim();
  var okPhone = phone.replace(/\D/g, "").length >= 10;
  form.querySelectorAll(".field").forEach(function(f){ f.classList.remove("bad"); });
  if (!name) form.name.closest(".field").classList.add("bad");
  if (!okPhone) form.phone.closest(".field").classList.add("bad");
  /* работаем только с гражданами РК: другое гражданство заявку не отправляет */
  var cit = form.cit.value;
  if (!cit) form.cit.closest(".field").classList.add("bad");
  fcit.hidden = cit !== "Другая страна";
  if (!fcit.hidden) { ferr.hidden = true; form.cit.closest(".field").classList.add("bad"); return; }
  if (!name || !okPhone || !cit) { ferr.hidden = false; return; }
  ferr.hidden = true;
  var citTxt = form.cit.options[form.cit.selectedIndex].text;
  var text = (UI[curLang()] || UI.ru).msg.replace("{n}", name).replace("{d}", dir).replace("{c}", citTxt).replace("{p}", phone) + (msg ? " " + msg : "");
  var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  var w = window.open(url, "_blank", "noopener");
  if (!w) location.href = url;
  form.hidden = true; thanks.hidden = false;
  conv(CONV.lead); /* конверсия «Отправка формы для потенциальных клиентов» */
});

if (form && form.cit) form.cit.addEventListener("change", function(){
  if (form.cit.value !== "Другая страна") { fcit.hidden = true; form.cit.closest(".field").classList.remove("bad"); }
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
measureHero(); update();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ measureHero(); update(); buildTicker(); });

document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){
    var l = b.getAttribute("data-lang");
    if (doc.lang === l) return;
    if (RED) { setLang(l); return; }
    document.body.classList.add("lang-swap");
    setTimeout(function(){
      setLang(l, function(){
        document.body.classList.remove("lang-swap");
        measureHero(); update();
      });
    }, 180);
  });
});
})();
