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

let narudzbe = [];

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

    dodajURacun(racun1, cijenaKolicina);
    narudzbe.push({ racun1 });
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
  localStorage.setItem(key, narudzbe);
  let sacuvano = localStorage.getItem(key);
  console.log(sacuvano);
}
