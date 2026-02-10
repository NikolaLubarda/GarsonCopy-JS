// narudzba.js
import { initApis } from "./apiPoziv.js";

function getKonobar() {
  return localStorage.getItem("konobar");
}
function getSto() {
  return localStorage.getItem("sto");
}
function ns(konobar) {
  return `k:${konobar}:`;
}
function kOrder(konobar, sto) {
  return `${ns(konobar)}${sto}`;
}
function kPaidFlag(konobar, sto) {
  return `${ns(konobar)}${sto}oznaka`;
}
function kPaidTotal(konobar, sto) {
  return `${ns(konobar)}${sto}ukupnaCijena`;
}
function kUnpaidTotal(konobar, sto) {
  return `${ns(konobar)}ukupno2${sto}`;
}

const konobarElement = document.getElementById("konobar1");
const stoElement = document.getElementById("sto");

const racunElement = document.getElementById("racun");
const ukupnoElement = document.querySelector(".ukupno1");

const hranaAPIdiv = document.getElementById("hranaAPI");
const kokteliAPIdiv = document.getElementById("kokteliAPI");

const btnObrisiSve = document.getElementById("obrisiSve");
const btnPlaceno = document.getElementById("placeno");
const btnSacuvaj = document.getElementById("btnSacuvaj");

const btnNazad = document.getElementById("btnNazad");
const btnRefreshApi = document.getElementById("btnRefreshApi");

const menuSearch = document.getElementById("menuSearch");
const btnClearSearch = document.getElementById("btnClearSearch");

const btnCopyRacun = document.getElementById("btnCopyRacun");
const btnPrintRacun = document.getElementById("btnPrintRacun");

/* --------------------------------------------------
   KONOBAR / STO
-------------------------------------------------- */
const konobar = getKonobar();
const sto = getSto();

if (!konobar) window.location.href = "./index.html";
if (!sto) window.location.href = "./stolovi.html";

konobarElement.textContent = `Konobar: ${konobar}`;
stoElement.textContent = `Broj stola: ${sto}`;

const ORDER_KEY = kOrder(konobar, sto);
const PAID_FLAG_KEY = kPaidFlag(konobar, sto);
const PAID_TOTAL_KEY = kPaidTotal(konobar, sto);
const UNPAID_TOTAL_KEY = kUnpaidTotal(konobar, sto);

/* --------------------------------------------------
   STATE
-------------------------------------------------- */
let ukupno = 0;
let narudzbe = [];

/* --------------------------------------------------
   NAZAD
-------------------------------------------------- */
btnNazad.addEventListener("click", () => {
  if (history.length > 1) history.back();
  else window.location.href = "./stolovi.html";
});

/* --------------------------------------------------
   TABOVI
-------------------------------------------------- */
function initTabs() {
  const tabs = document.querySelectorAll(".tab");
  const panes = {
    pice: document.getElementById("pane-pice"),
    hrana: document.getElementById("pane-hrana"),
    kokteli: document.getElementById("pane-kokteli"),
  };

  tabs.forEach((t) => {
    t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.remove("tab--active"));
      t.classList.add("tab--active");

      const tabKey = t.getAttribute("data-tab");
      Object.values(panes).forEach((p) => p.classList.remove("pane--active"));
      panes[tabKey].classList.add("pane--active");

      // re-apply search on new tab
      applyMenuFilter(menuSearch?.value || "");
    });
  });
}
initTabs();

/* --------------------------------------------------
   RACUN UI
-------------------------------------------------- */
function dodajURacun(artikl) {
  const row = document.createElement("div");
  row.className = "racun-item";

  const text = document.createElement("p");
  text.className = "racun-item__text";
  text.textContent = `Artikl: ${artikl.naziv} | Napomena: ${artikl.napomena} | Količina: ${artikl.kolicina} | Cijena: ${artikl.cijenaKolicina}`;

  const btnDelete = document.createElement("button");
  btnDelete.className = "btn btn--danger";
  btnDelete.type = "button";
  btnDelete.textContent = "X";

  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    row.remove();
    narudzbe = narudzbe.filter((n) => n !== artikl);
    ukupno -= artikl.cijenaKolicina;
    ukupnoElement.textContent = ukupno;
  });

  row.append(text, btnDelete);
  racunElement.appendChild(row);
}

/* --------------------------------------------------
   INIT RACUN IZ STORAGE
-------------------------------------------------- */
function initRacunIzStorage() {
  const sacuvano = JSON.parse(localStorage.getItem(ORDER_KEY)) || [];
  racunElement.innerHTML = "";
  narudzbe = [];
  ukupno = 0;

  sacuvano.forEach((artikl) => {
    narudzbe.push(artikl);
    dodajURacun(artikl);
    ukupno += artikl.cijenaKolicina;
  });

  ukupnoElement.textContent = ukupno;
}
initRacunIzStorage();

/* --------------------------------------------------
   SACUVAJ -> NARANDŽAST (otvoren)
-------------------------------------------------- */
function sacuvaj() {
  localStorage.setItem(ORDER_KEY, JSON.stringify(narudzbe));
  localStorage.setItem(UNPAID_TOTAL_KEY, ukupno);

  // ukloni markere "plaćeno" da bude otvoren
  localStorage.removeItem(PAID_FLAG_KEY);
  localStorage.removeItem(PAID_TOTAL_KEY);
}
btnSacuvaj.addEventListener("click", sacuvaj);

/* --------------------------------------------------
   PLAĆENO -> ZELEN
-------------------------------------------------- */
btnPlaceno.addEventListener("click", () => {
  localStorage.setItem(PAID_FLAG_KEY, "true");
  localStorage.setItem(PAID_TOTAL_KEY, ukupno);

  localStorage.removeItem(UNPAID_TOTAL_KEY);
  localStorage.removeItem(ORDER_KEY);

  window.location.href = "./stolovi.html";
});

/* --------------------------------------------------
   OBRIŠI SVE
-------------------------------------------------- */
btnObrisiSve.addEventListener("click", () => {
  localStorage.removeItem(ORDER_KEY);
  localStorage.removeItem(PAID_FLAG_KEY);
  localStorage.removeItem(PAID_TOTAL_KEY);
  localStorage.removeItem(UNPAID_TOTAL_KEY);

  racunElement.innerHTML = "";
  narudzbe = [];
  ukupno = 0;
  ukupnoElement.textContent = ukupno;
});

/* --------------------------------------------------
   API INIT + RENDER
-------------------------------------------------- */
async function initApiData(force = false) {
  const { hrana, kokteli } = await initApis({ force });

  hranaAPIdiv.innerHTML = "";
  kokteliAPIdiv.innerHTML = "";

  renderHranaApi(hrana || []);
  renderKokteliApi(kokteli || []);

  applyMenuFilter(menuSearch?.value || "");
}
initApiData();

btnRefreshApi.addEventListener("click", () => initApiData(true));

function makeApiCard({ naziv, cijena }) {
  const wrap = document.createElement("div");
  wrap.className = "item-card";

  const nameEl = document.createElement("div");
  nameEl.className = "item-card__name naziv";
  nameEl.textContent = naziv;

  const priceEl = document.createElement("div");
  priceEl.className = "item-card__price cijena";
  priceEl.textContent = String(cijena);

  const napomena = document.createElement("input");
  napomena.className = "input napomena";
  napomena.placeholder = "napomena";

  const kolicina = document.createElement("input");
  kolicina.className = "input kolicina";
  kolicina.type = "number";
  kolicina.min = "1";
  kolicina.placeholder = "količina";

  const btn = document.createElement("button");
  btn.className = "btn btn--primary btn-dodaj-hranu";
  btn.type = "button";
  btn.textContent = "Dodaj";

  wrap.append(nameEl, priceEl, napomena, kolicina, btn);
  return wrap;
}

function renderHranaApi(hrana) {
  hrana.slice(0, 6).forEach((m, idx) => {
    hranaAPIdiv.appendChild(
      makeApiCard({
        naziv: m.strMeal || `Jelo ${idx + 1}`,
        cijena: 600 + idx * 80,
      })
    );
  });
}

function renderKokteliApi(kokteli) {
  kokteli.slice(0, 6).forEach((d, idx) => {
    kokteliAPIdiv.appendChild(
      makeApiCard({
        naziv: d.strDrink || `Koktel ${idx + 1}`,
        cijena: 450 + idx * 40,
      })
    );
  });
}

/* --------------------------------------------------
   DODAJ 
-------------------------------------------------- */
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const isAdd =
    btn.classList.contains("btn-dodaj-hranu") ||
    (btn.textContent || "").trim().toLowerCase() === "dodaj";

  if (!isAdd) return;

  const card = btn.closest(".item-card");
  if (!card) return;

  const nazivEl = card.querySelector(".naziv");
  const cijenaEl = card.querySelector(".cijena");
  if (!nazivEl || !cijenaEl) return;

  const naziv = nazivEl.textContent.trim();
  const cijena = parseFloat(cijenaEl.textContent);
  const napomena = card.querySelector(".napomena")?.value || "";

  const kolRaw = card.querySelector(".kolicina")?.value;
  const kol = kolRaw && parseInt(kolRaw) > 0 ? parseInt(kolRaw) : 1;

  const cijenaKolicina = cijena * kol;
  const item = { naziv, napomena, kolicina: kol, cijenaKolicina };

  narudzbe.push(item);
  dodajURacun(item);

  ukupno += cijenaKolicina;
  ukupnoElement.textContent = ukupno;

  // resetza sev
  const kEl = card.querySelector(".kolicina");
  if (kEl) kEl.value = "";
  const nEl = card.querySelector(".napomena");
  if (nEl) nEl.value = "";
});

/* --------------------------------------------------
   SEARCH MENI 
-------------------------------------------------- */
function normalize(s) {
  return (s || "").toString().trim().toLowerCase();
}

function getActivePane() {
  return document.querySelector(".pane.pane--active");
}

function applyMenuFilter(query) {
  const q = normalize(query);
  const pane = getActivePane();
  if (!pane) return;

  const cards = pane.querySelectorAll(".item-card");

  cards.forEach((card) => {
    const nameEl = card.querySelector(".naziv");
    const name = normalize(nameEl ? nameEl.textContent : "");
    const show = !q || name.includes(q);
    card.style.display = show ? "" : "none";
  });
}

if (menuSearch) {
  menuSearch.addEventListener("input", (e) => {
    applyMenuFilter(e.target.value);
  });
}

if (btnClearSearch) {
  btnClearSearch.addEventListener("click", () => {
    menuSearch.value = "";
    applyMenuFilter("");
    menuSearch.focus();
  });
}

/* --------------------------------------------------
   COPY + PRINT RAČUNA
-------------------------------------------------- */
function buildReceiptText() {
  const lines = [];
  lines.push("GARSON RAČUN");
  lines.push(`Konobar: ${konobar}`);
  lines.push(`Sto: ${sto}`);
  lines.push("--------------------------------");

  if (!narudzbe.length) {
    lines.push("(Nema stavki)");
  } else {
    narudzbe.forEach((it, idx) => {
      const nap = it.napomena ? ` | ${it.napomena}` : "";
      lines.push(
        `${idx + 1}. ${it.naziv} x${it.kolicina} = ${it.cijenaKolicina}${nap}`
      );
    });
  }

  lines.push("--------------------------------");
  lines.push(`UKUPNO: ${ukupno}`);
  return lines.join("\n");
}

async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

btnCopyRacun.addEventListener("click", async () => {
  const text = buildReceiptText();
  try {
    await copyToClipboard(text);
    btnCopyRacun.textContent = "Kopirano ✅";
    setTimeout(() => (btnCopyRacun.textContent = "Kopiraj račun"), 1200);
  } catch (e) {
    alert("Ne mogu kopirati račun. Probaj Print.");
  }
});

btnPrintRacun.addEventListener("click", () => {
  window.print();
});
