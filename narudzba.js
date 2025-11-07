const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

const key = sto;

let racunElement = document.getElementById("racun");
const btns = document.querySelectorAll("button");
let ukupnoElement = document.querySelector(".ukupno1");

let ukupno = 0;
let narudzbe = [];

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const t = e.target.parentElement;
    const naziv = t.querySelector(".naziv").textContent;
    const cijena = parseFloat(t.querySelector(".cijena").textContent);
    const napomena = t.querySelector(".napomena").value;
    const kolicina = parseInt(t.querySelector(".kolicina").value);

    const cijenaKolicina = cijena * kolicina;

    const item = { naziv, napomena, kolicina, cijenaKolicina };

    narudzbe.push(item);
    dodajURacun(item);

    ukupno += cijenaKolicina;
    ukupnoElement.textContent = ukupno;
  });
});

function dodajURacun(artikl) {
  const para = document.createElement("p");
  para.textContent = `Artikl: ${artikl.naziv} | Napomena: ${artikl.napomena} | Količina: ${artikl.kolicina} | Cijena: ${artikl.cijenaKolicina}`;

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "X";

  btnDelete.addEventListener("click", () => {
    racunElement.removeChild(para);

    narudzbe = narudzbe.filter((nar) => nar !== artikl);

    ukupno -= artikl.cijenaKolicina;
    ukupnoElement.textContent = ukupno;
  });

  para.appendChild(btnDelete);
  racunElement.appendChild(para);
}
function sacuvaj() {
  localStorage.setItem(key, JSON.stringify(narudzbe));
  console.log(`Račun za sto ${key} sačuvan`, localStorage.getItem(key));
}

window.onload = function () {
  const sacuvano = JSON.parse(localStorage.getItem(key)) || [];
  racunElement.innerHTML = "";
  ukupno = 0;

  sacuvano.forEach((artikl) => {
    narudzbe.push(artikl);
    dodajURacun(artikl);
    ukupno += artikl.cijenaKolicina;
  });

  ukupnoElement.textContent = ukupno;
};

const btnObrisiSve = document.getElementById("obrisiSve");

btnObrisiSve.addEventListener("click", () => {
  localStorage.removeItem(key);

  racunElement.innerHTML = "";
  ukupno = 0;
  ukupnoElement.textContent = ukupno;

  narudzbe = [];

  console.log(`racun za ovaj sto je obrisan ${key}`);
});
