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
   Разметка русская. Нет ключа - строка остаётся русской. */
var KZ = {
"m.title":"Астанадағы виза агенттігі - виза құжаттарына көмек | Visair.kz",
"m.desc":"Visair.kz - 2018 жылдан бері Астанада жұмыс істейтін жеке виза агенттігі: АҚШ, Шенген, Ұлыбритания, Канада, Жапония визаларына құжат жинауға және сауалнама толтыруға көмектесеміз. Біз елшілік емеспіз. Қызмет 40 000 ₸-ден, алым бөлек.",
"a.skip":"Бағыттарға өту","a.home":"Visair.kz - басты бетке","a.nav":"Сайт бөлімдері","a.lang":"Сайт тілі","a.call":"Қоңырау шалу","a.menu":"Мәзір",
"nav.dir":"Бағыттар","nav.price":"Бағалар","nav.how":"Қалай жұмыс істейміз","nav.rev":"Пікірлер","nav.cont":"Байланыс",
"nav.wa":"WhatsApp-қа жазу","nav.note":"Астана, Достық көшесі, 1 · Дс-Жм 10:00-19:00",

"h.kicker":"Жеке виза агенттігі · Астана · 2018 жылдан",
"h.h1":"АҚШ, Еуропа және Ұлыбритания визасына құжат жинауға көмек",
"h.lead":"Құжат жинаймыз, сауалнама толтырамыз, тапсыруға жазамыз. 2018 жылдан бері 8000-нан астам клиент, <a href=\"https://2gis.kz/astana/geo/70000001061028917\" target=\"_blank\" rel=\"noopener\">2ГИС-те 5.0</a> рейтинг.",
"h.cta1":"WhatsApp-қа жазу","h.cta2":"Қызмет құны",
"h.disc":"Жеке компания, елшілік те, ресми виза орталығы да емеспіз. Виза беру туралы шешімді консулдық қабылдайды.",
"h.alt":"Виза агенттігінің үстеліндегі визалар мен мөрлер басылған паспорт",
"h.tag":"Visair.kz · Астана · 2018 жылдан",
"t.1":"АҚШ","t.2":"Шенген","t.3":"Ұлыбритания","t.4":"Канада","t.5":"Жапония","t.6":"Корея","t.7":"Қытай","t.8":"Австралия",

"p.lbl":"Қызмет құны","p.sub":"консулдық алым бөлек",
"d1.k":"Шенген · Еуропа · Италия","d1.h":"Шенген визасына көмек",
"d1.l":"Италия, Испания, Франция, Германия және басқа Шенген елдері. Сауалнама, сақтандыру, брондау және тапсыруға жазылу - біздің мойнымызда.",
"d1.cta":"Шенген туралы сұрау","d1.alt":"Күн батардағы Рим Колизейі - Италия мен Шенген елдеріне виза",
"d2.k":"АҚШ · B1/B2","d2.h":"АҚШ визасына көмек",
"d2.l":"DS-160 сауалнамасы, сұхбатқа жазылу және оған дайындық. Шешімді АҚШ консулдығы қабылдайды.",
"d2.cta":"АҚШ визасы туралы сұрау","d2.alt":"Күн батардағы Манхэттен - АҚШ визасы",
"d3.k":"Ұлыбритания · Visitor","d3.h":"Ұлыбритания визасына көмек",
"d3.l":"Онлайн-сауалнама, табыс пен елмен байланысты растау, биометрияға жазылу.",
"d3.cta":"Ұлыбритания визасы туралы сұрау","d3.alt":"Лондондағы Биг-Бен мен Вестминстер сарайы - Ұлыбритания визасы",
"d4.k":"Канада · Visitor visa","d4.h":"Канада визасына көмек",
"d4.l":"Онлайн тапсыру, сапар мақсатын растау, биометрияға жазылу.",
"d4.cta":"Канада визасы туралы сұрау","d4.alt":"Биіктен көрінген Торонто мен CN мұнарасы - Канада визасы",
"d5.k":"Жапония · Корея · Қытай · Австралия","d5.h":"Жапония және Азия визаларына көмек",
"d5.l":"Жапония - 40 000 ₸. Корея, Қытай және Австралия - құны сұраныс бойынша.",
"d5.cta":"Жапония визасы туралы сұрау","d5.alt":"Күн батардағы Токио мұнарасы - Жапония визасы",

"c.k":"Бағалар","c.h":"Бағыттар бойынша қызмет құны",
"c.l":"Бұл - агенттік жұмысының бағасы. Консулдық және сервистік алымдарды консулдықтар мен виза орталықтарына олардың тарифтері бойынша тікелей төлейсіз.",
"c.r1":"Шенген · Еуропа · Италия","c.r2":"АҚШ","c.r3":"Ұлыбритания","c.r4":"Канада","c.r5":"Жапония","c.r6":"Корея · Қытай · Австралия",
"c.req":"сұраныс бойынша","c.cta":"Құнын WhatsApp арқылы нақтылау",

"w.k":"Қалай жұмыс істейміз","w.h":"Өтінімнен құжат тапсыруға дейін төрт қадам",
"w.l":"Сіз өтінім жібересіз - құжаттарды, сауалнамаларды және жазылуды әрі қарай біз жүргіземіз.",
"w.s1":"Өтінім","w.s1t":"WhatsApp-та жауап береміз, мерзімі мен құжаттар тізімін айтамыз",
"w.s2":"Құжаттар","w.s2t":"Пакетті жинаймыз, сауалнаманы толтырамыз, сақтандыру мен брондарды дайындаймыз",
"w.s3":"Тапсыру","w.s3t":"Биометрияға немесе сұхбатқа жазамыз және оған дайындаймыз",
"w.s4":"Шешім","w.s4t":"Консулдық шешімі шыққан паспортты аласыз, тапсырғаннан кейін де байланыста боламыз",
"w.alt":"Қолдағы отырғызу талондары бар паспорттар","w.tag":"Ұшуға дайын",

"n.k":"Visair сандармен","n.h":"Сегіз жыл жұмыс және 8000-нан астам клиент",
"n.l":"Тексеруге болатын деректер: Астанадағы кеңсе, 2ГИС карточкасы, клиент пікірлері.",
"n.t1":"жыл нарықта","n.s1":"2018 жылдан бері жұмыс істейміз, кеңсе Астанада",
"n.t2":"клиент 2018 жылдан бері","n.s2":"Шенген, АҚШ, Ұлыбритания, Канада, Азия",
"n.t3":"2ГИС рейтингі","n.s3":"Компания карточкасының ең жоғары бағасы",
"n.t4":"клиент пікірі","n.s4":"Компания карточкасындағы бағалар мен пікірлер",

"v.k":"Тәжірибе","v.h":"Құжат дайындаған бағыттарымыз",
"v.l":"Клиенттердің рұқсатымен көрсетілген паспорт беттері. Жеке деректер жабылған.",
"v.c1":"Финляндия · Шенген C","v.c2":"Испания · Шенген, көп мәрте","v.c3":"Германия · Шенген, көп мәрте",
"v.c4":"Франция · Шенген, көп мәрте","v.c5":"Польша · Шенген C","v.c6":"Канада · студенттік","v.c7":"Жапония · Temporary Visitor",
"v.a1":"Клиент паспортындағы Финляндияның шенген визасы","v.a2":"Клиент паспортындағы Испанияның шенген көп мәрте визасы",
"v.a3":"Клиент паспортындағы Германияның шенген көп мәрте визасы","v.a4":"Клиент паспортындағы Францияның шенген көп мәрте визасы",
"v.a5":"Клиент паспортындағы Польшаның шенген визасы","v.a6":"Клиент паспортындағы Канаданың студенттік визасы",
"v.a7":"Клиент паспортындағы Жапонияның Temporary Visitor екі визасы",
"v.note":"Виза беру туралы шешімді консулдық қабылдайды. Бұрынғы тәжірибе сіздің жағдайда дәл сол нәтижені білдірмейді: біз дұрыс жинақталған құжат пакетіне жауап береміз, шешімге емес.",
"v.sprev":"Алдыңғы визалар","v.snext":"Келесі визалар","v.prev":"Алдыңғы","v.next":"Келесі","v.close":"Жабу",

"r.k":"Пікірлер","r.h":"2ГИС-те 110-нан астам пікір бойынша 5.0 рейтинг",
"r.l":"Клиенттердің нақты хабарламалары, рұқсатымен жариялаймыз.",
"r.note":"Пікірлер клиенттердің жеке тәжірибесін көрсетеді және дәл осындай нәтижеге уәде емес.",
"r.s1":"клиенттер, отбасылық өтінім","r.s2":"клиент, АҚШ визасы 10 жылға","r.s3":"клиент, Ұлыбритания визасы",
"r.gn":"2ГИС-те 110-нан астам пікір","r.gl":"Пікірлерді оқу",

"f.k":"Өтінім","f.h":"Өтінім қалдырыңыз - WhatsApp-та жауап береміз",
"f.l":"Жұмыс уақытында тез жауап береміз: мерзімін, құнын және сіздің елге қажет құжаттар тізімін айтамыз.",
"f.name":"Атыңыз","f.nameph":"Аты","f.phone":"Телефон","f.phoneph":"+7 ___ ___ __ __","f.dir":"Бағыт",
"f.o1":"Шенген / Еуропа","f.o2":"АҚШ","f.o3":"Ұлыбритания","f.o4":"Канада","f.o5":"Жапония","f.o6":"Басқа ел",
"f.msg":"Түсініктеме (міндетті емес)","f.msgph":"Сапар күндері, мақсаты, бұрын бас тарту болды ма",
"f.err":"Атыңыз бен телефон нөміріңізді көрсетіңіз","f.btn":"WhatsApp-қа жіберу","f.call":"Қоңырау шалу",
"f.note":"Батырманы басқанда дайын хабарламасы бар WhatsApp ашылады. Деректеріңізді сақтамаймыз. Өтінім виза алуға кепілдік бермейді.",
"f.tt":"Рақмет!","f.tp":"Дайын хабарламасы бар WhatsApp ашылды - оны жіберіңіз, жұмыс уақытында жауап береміз.",

"k.k":"Байланыс","k.h":"Астанадағы кеңсе, алдын ала жазылу бойынша қабылдау",
"k.phone":"Телефон / WhatsApp","k.hours":"Дс-Жм 10:00-19:00 · алдын ала жазылу бойынша қабылдау",
"k.addr":"Мекенжай","k.addrv":"Астана, Достық көшесі, 1","k.addrs":"Есіл ауданы · 2ГИС-те ашу","k.call":"Қоңырау шалу",
"k.foot":"Виза агенттігі · Астана · 2018 жылдан",
"k.disc":"Visair.kz - құжат дайындау бойынша консультациялық қызмет көрсететін жеке компания. Біз елшілік, консулдық, мемлекеттік орган немесе ресми виза орталығы емеспіз және олармен байланысты емеспіз. Виза беру туралы шешімді тиісті елдің консулдығы қабылдайды, қызмет ақысы оның берілуіне кепілдік бермейді. Консулдық және сервистік алымдар ресми ұйымдарға тікелей, бөлек төленеді.",
"k.legal":"Астана, Достық көшесі, 1 · +7 775 902 0897 · алдын ала жазылу бойынша қабылдау",
"s.k":"Компания мәртебесі",
"s.h":"Мемлекеттік орган емес, жеке агенттік",
"s.l":"Кім екенімізді және нақты неге ақы төлейтініңізді ашық айтамыз.",
"s.t1":"Біз жеке компаниямыз","s.p1":"Visair.kz елшілік, консулдық немесе ресми виза орталығы емес. Мемлекеттік органдармен байланысты емеспіз және олардың атынан әрекет етпейміз.",
"s.t2":"Визаны консулдық береді","s.p2":"Шешімді сапар шегетін елдің консулдығы немесе көші-қон қызметі қабылдайды. Біз оған әсер ете алмаймыз және уәде бере алмаймыз.",
"s.t3":"Қызметке не кіреді","s.p3":"Консультация, құжаттарды тексеру және дайындау, сауалнама толтыру, тапсыруға жазылу және шешім шыққанға дейін қолдау.",
"s.t4":"Өз бетіңізше де болады","s.p4":"Құжатты консулдықтар мен виза орталықтарының ресми сайттары арқылы өзіңіз де тапсыра аласыз. Сіз құжаттың өзіне емес, маманның жұмысына ақы төлейсіз.",
"s.t5":"Алымдар бөлек төленеді","s.p5":"Консулдық және сервистік алымдар қызмет құнына кірмейді: олардың мөлшерін консулдықтар белгілейді, ақы тікелей оларға төленеді.",
"s.t6":"Төлемге дейінгі шарттар","s.p6":"Төлемге дейін құжаттар тізімін, қызмет құнын және мерзімін аласыз. Кеңсе Астанада, Достық көшесі, 1, қабылдау алдын ала жазылу бойынша.",
"dock.call":"Қоңырау"
};

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
  },
  kk:{
    "wa.main":"Сәлеметсіз бе! Виза құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтып жіберіңізші.",
    "wa.shengen":"Сәлеметсіз бе! Шенген визасының (Еуропа) құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтыңызшы.",
    "wa.usa":"Сәлеметсіз бе! АҚШ визасының құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтыңызшы.",
    "wa.uk":"Сәлеметсіз бе! Ұлыбритания визасының құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтыңызшы.",
    "wa.canada":"Сәлеметсіз бе! Канада визасының құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтыңызшы.",
    "wa.japan":"Сәлеметсіз бе! Жапония (немесе басқа Азия елі) визасының құжаттарына көмек керек. Мерзімін, қызмет құнын және құжаттар тізімін айтыңызшы.",
    "wa.price":"Сәлеметсіз бе! Құжат дайындау қызметінің құнын және оған не кіретінін айтып жіберіңізші."
  }
};
var UI = {
  ru:{ msg:"Здравствуйте! Меня зовут {n}. Нужна помощь с документами на визу: {d}. Телефон: {p}." },
  kk:{ msg:"Сәлеметсіз бе! Менің атым {n}. Виза құжаттарына көмек керек: {d}. Телефон: {p}." }
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
function pick(k, kk){ return (kk && KZ[k] !== undefined) ? KZ[k] : RU[k]; }
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
    var m = WAT[kk ? "kk" : "ru"][a.dataset.wa] || WAT.ru["wa.main"];
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
var form = document.getElementById("form"), ferr = document.getElementById("ferr"), thanks = document.getElementById("thanks");
if (form) form.addEventListener("submit", function(ev){
  ev.preventDefault();
  if (form.site && form.site.value) return; /* honeypot */
  var name = form.name.value.trim(), phone = form.phone.value.trim(), dir = form.dir.value, msg = form.msg.value.trim();
  var okPhone = phone.replace(/\D/g, "").length >= 10;
  form.querySelectorAll(".field").forEach(function(f){ f.classList.remove("bad"); });
  if (!name) form.name.closest(".field").classList.add("bad");
  if (!okPhone) form.phone.closest(".field").classList.add("bad");
  if (!name || !okPhone) { ferr.hidden = false; return; }
  ferr.hidden = true;
  var text = UI[curLang()].msg.replace("{n}", name).replace("{d}", dir).replace("{p}", phone) + (msg ? " " + msg : "");
  var url = "https://wa.me/" + WA + "?text=" + encodeURIComponent(text);
  var w = window.open(url, "_blank", "noopener");
  if (!w) location.href = url;
  form.hidden = true; thanks.hidden = false;
  conv(CONV.lead); /* конверсия «Отправка формы для потенциальных клиентов» */
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
applyLang(startLang());
var y = document.getElementById("year"); if (y) y.textContent = String(new Date().getFullYear());
measureHero(); update();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ measureHero(); update(); buildTicker(); });

document.querySelectorAll(".lang button").forEach(function(b){
  b.addEventListener("click", function(){
    var l = b.getAttribute("data-lang");
    if (doc.lang === l) return;
    if (RED) { applyLang(l); return; }
    document.body.classList.add("lang-swap");
    setTimeout(function(){
      applyLang(l);
      document.body.classList.remove("lang-swap");
      measureHero(); update();
    }, 180);
  });
});
})();
