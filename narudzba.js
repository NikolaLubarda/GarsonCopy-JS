const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;
let hranaAPIdiv = document.getElementById("hranaAPI");

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

const key = sto;

let racunElement = document.getElementById("racun");
const btns = document.querySelectorAll("button");
let ukupnoElement = document.querySelector(".ukupno1");

let ukupno = 0;
let narudzbe = [];
let oznaka = key + "oznaka";

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
  localStorage.setItem(`ukupno2${key}`, ukupno);
  console.log(localStorage.getItem(`ukupno2${key}`) + "radi");
  console.log(`Račun za sto ${key} sačuvan`, localStorage.getItem(key));
  localStorage.removeItem(oznaka);
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
  localStorage.removeItem(oznaka);

  racunElement.innerHTML = "";
  ukupno = 0;
  ukupnoElement.textContent = ukupno;

  narudzbe = [];

  console.log(`racun za ovaj sto je obrisan ${key}`);
});

const btnPlaceno = document.getElementById("placeno");

btnPlaceno.addEventListener("click", () => {
  localStorage.setItem(oznaka, true);
  localStorage.setItem(`${key}ukupnaCijena`, ukupno);
  console.log(localStorage.getItem(oznaka));
  console.log(localStorage.getItem(`${key}ukupnaCijena`));
});
// Hrana iz API-ja
const hrana = JSON.parse(localStorage.getItem("hrana"));
console.log(hrana[0].strMeal);
console.log(hrana[1].strMeal);
console.log(hrana[2].strMeal);
//naziv 1
let meal1 = document.createElement("p");
meal1.textContent = hrana[0].strMeal;
hranaAPIdiv.appendChild(meal1);
//cijena 1
let cijena1 = document.createElement("p");
cijena1.textContent = 550;
hranaAPIdiv.appendChild(cijena1);
//napomena 1
let napomena1 = document.createElement("input");
napomena1.placeholder = "napomena";
hranaAPIdiv.appendChild(napomena1);
//kolicina 1
let kolicina1 = document.createElement("input");
kolicina1.placeholder = "kolicina";
hranaAPIdiv.appendChild(kolicina1);
//btn 1
let btn1 = document.createElement("button");
btn1.textContent = "dodaj";
hranaAPIdiv.appendChild(btn1);

//naziv 2
let meal2 = document.createElement("p");
meal2.textContent = hrana[1].strMeal;
hranaAPIdiv.appendChild(meal2);
//cijena 2
let cijena2 = document.createElement("p");
cijena2.textContent = 750;
hranaAPIdiv.appendChild(cijena2);
//napomena 2
let napomena2 = document.createElement("input");
napomena2.placeholder = "napomena";
hranaAPIdiv.appendChild(napomena2);
//kolicina 2
let kolicina2 = document.createElement("input");
kolicina2.placeholder = "kolicina";
hranaAPIdiv.appendChild(kolicina2);
//btn 2
let btn2 = document.createElement("button");
btn2.textContent = "dodaj";
hranaAPIdiv.appendChild(btn2);

//naziv 3
let meal3 = document.createElement("p");
meal2.textContent = hrana[2].strMeal;
hranaAPIdiv.appendChild(meal3);
//cijena 3
let cijena3 = document.createElement("p");
cijena3.textContent = 750;
hranaAPIdiv.appendChild(cijena3);
//napomena 3
let napomena3 = document.createElement("input");
napomena3.placeholder = "napomena";
hranaAPIdiv.appendChild(napomena3);
//kolicina 3
let kolicina3 = document.createElement("input");
kolicina3.placeholder = "kolicina";
hranaAPIdiv.appendChild(kolicina3);
//btn 3
let btn3 = document.createElement("button");
btn3.textContent = "dodaj";
hranaAPIdiv.appendChild(btn3);
