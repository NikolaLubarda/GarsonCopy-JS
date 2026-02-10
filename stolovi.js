// stolovi.js

function getKonobar() {
  return localStorage.getItem("konobar");
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

function goBack() {
  if (window.history.length > 1) window.history.back();
  else window.location.href = "./index.html";
}

function dodavanje(sto) {
  localStorage.setItem("sto", sto);
  window.location.href = "./narudzba.html";
}

function setStatusClass(el, status) {
  el.classList.remove(
    "table-card--free",
    "table-card--open",
    "table-card--paid"
  );
  el.classList.add(status);
}

function bojaStola() {
  const konobar = getKonobar();
  if (!konobar) {
    window.location.href = "./index.html";
    return;
  }

  for (let i = 1; i <= 12; i++) {
    const placeno = localStorage.getItem(kPaidFlag(konobar, i));
    const narudzba = localStorage.getItem(kOrder(konobar, i));

    const stoEl = document.getElementById(`sto${i}`);
    if (!stoEl) continue;

    if (placeno === "true") setStatusClass(stoEl, "table-card--paid");
    else if (narudzba) setStatusClass(stoEl, "table-card--open");
    else setStatusClass(stoEl, "table-card--free");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const btnNazad = document.getElementById("btnNazad");
  if (btnNazad) btnNazad.addEventListener("click", goBack);

  const grid = document.querySelector(".tables-grid");
  if (grid) {
    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-sto]");
      if (!btn) return;
      const sto = btn.getAttribute("data-sto");
      if (sto) dodavanje(sto);
    });
  }

  bojaStola();
});
