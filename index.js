// index.js

const pillKonobar = document.getElementById("pillKonobar");
const btnDropdown = document.getElementById("btnDropdown");
const menuKonobari = document.getElementById("menuKonobari");
const btnSto = document.getElementById("btnSto");
const btnResetKonobar = document.getElementById("btnResetKonobar");

const otvoreniCountEl = document.getElementById("otvoreniCount");
const ukupnoPlacenoEl = document.getElementById("ukupnoPlaceno");
const ukupnoNenaplacenoEl = document.getElementById("ukupnoNenaplaceno");
const stoloviLine = document.getElementById("stolovi");

function getKonobar() {
  return localStorage.getItem("konobar");
}

function setKonobar(name) {
  localStorage.setItem("konobar", name);
  renderKonobar();
  calcStats();
}

function ns(konobar) {
  return `k:${konobar}:`;
}

function kOrder(konobar, sto) {
  return `${ns(konobar)}${sto}`; // narudžba
}
function kPaidFlag(konobar, sto) {
  return `${ns(konobar)}${sto}oznaka`; // "true"
}
function kPaidTotal(konobar, sto) {
  return `${ns(konobar)}${sto}ukupnaCijena`; // broj
}
function kUnpaidTotal(konobar, sto) {
  return `${ns(konobar)}ukupno2${sto}`; // broj
}

function renderKonobar() {
  const k = getKonobar();
  if (k) {
    pillKonobar.textContent = `Konobar: ${k}`;
    btnDropdown.textContent = `Konobar: ${k} ▾`;
  } else {
    pillKonobar.textContent = "Nije izabran konobar";
    btnDropdown.textContent = "Izaberi konobara ▾";
  }
}

function toggleMenu() {
  menuKonobari.classList.toggle("show");
}
function closeMenu() {
  menuKonobari.classList.remove("show");
}

function formatMoney(n) {
  return `${Math.round(n)}$`;
}

function calcStats() {
  const konobar = getKonobar();

  if (!konobar) {
    otvoreniCountEl.textContent = "—";
    ukupnoPlacenoEl.textContent = "—";
    ukupnoNenaplacenoEl.textContent = "—";
    stoloviLine.textContent = "Otvoreni stolovi: —";
    return;
  }

  let otvoreni = [];
  let zbirPlaceno = 0;
  let zbirNenaplaceno = 0;

  for (let i = 1; i <= 12; i++) {
    const narudzba = localStorage.getItem(kOrder(konobar, i));
    const placeni = localStorage.getItem(kPaidTotal(konobar, i));
    const nenaplaceno = parseFloat(
      localStorage.getItem(kUnpaidTotal(konobar, i))
    );

    if (narudzba) otvoreni.push(i);
    if (placeni) zbirPlaceno += parseFloat(placeni);
    if (!Number.isNaN(nenaplaceno) && nenaplaceno > 0)
      zbirNenaplaceno += nenaplaceno;
  }

  otvoreniCountEl.textContent = otvoreni.length;
  ukupnoPlacenoEl.textContent = formatMoney(zbirPlaceno);
  ukupnoNenaplacenoEl.textContent = formatMoney(zbirNenaplaceno);

  stoloviLine.textContent = otvoreni.length
    ? `Otvoreni stolovi: ${otvoreni.join(", ")}`
    : "Otvoreni stolovi: —";
}

btnDropdown.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleMenu();
});

document.addEventListener("click", () => closeMenu());

menuKonobari.addEventListener("click", (e) => {
  const item = e.target.closest("[data-konobar]");
  if (!item) return;
  const name = item.getAttribute("data-konobar");
  setKonobar(name);
  closeMenu();
});

btnSto.addEventListener("click", () => {
  const k = getKonobar();
  if (!k) {
    alert("Prvo izaberi konobara.");
    return;
  }
  window.location.href = "./stolovi.html";
});

btnResetKonobar.addEventListener("click", () => {
  localStorage.removeItem("konobar");
  renderKonobar();
  calcStats();
});

window.addEventListener("DOMContentLoaded", () => {
  renderKonobar();
  calcStats();
});
