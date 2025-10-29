const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

const key = sto;

const racun = document.getElementById("racun");

const btns = document.querySelectorAll("button");

let ukupnoElement = document.querySelector(".ukupno1");
let ukupno = 0;
let racun1 = "";

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const t = e.target.parentElement;
    const naziv = t.querySelector(".naziv").textContent;
    const cijena = t.querySelector(".cijena").textContent;
    const napomena = t.querySelector(".napomena").value;
    const kolicina = t.querySelector(".kolicina").value;
    // console.log(cijena, naziv, napomena, kolicina);
    console.log(naziv, cijena, napomena, kolicina);
    let cijenaKolicina = cijena * kolicina;
    let racun1 = `artikl: ${naziv} napomena: ${napomena} kolicina: ${kolicina} cijena: ${cijenaKolicina}`;
    console.log(racun1);
    dodajURacun(racun1, cijenaKolicina);
  });
});

function dodajURacun(racun1, cijenaKolicina) {
  const para = document.createElement("p");
  para.textContent = racun1;
  racun.appendChild(para);
  ukupno += cijenaKolicina;
  ukupnoElement.textContent = ukupno;
}

function sacuvaj() {
  localStorage.setItem(sto, racun1);
  let sacuvano = localStorage.getItem(sto);
  console.log(sacuvano);
}
