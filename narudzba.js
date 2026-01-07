const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;
let hranaAPIdiv = document.getElementById("hranaAPI");

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

const key = sto;

let racunElement = document.getElementById("racun");
// const btns = document.querySelectorAll("button"); // OVO NAM VIŠE NE TREBA OVDJE
let ukupnoElement = document.querySelector(".ukupno1");

let ukupno = 0;
let narudzbe = [];
let oznaka = key + "oznaka";

function dodajURacun(artikl) {
  const para = document.createElement("p");
  para.textContent = `Artikl: ${artikl.naziv} | Napomena: ${artikl.napomena} | Količina: ${artikl.kolicina} | Cijena: ${artikl.cijenaKolicina}`;

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "X";
  // Da spriječimo da delete dugme okinu event listener na hranaAPI (ako je racun unutar njega)
  btnDelete.stopPropagation = true;

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

if (btnObrisiSve) {
  // Provjera da ne puca kod ako dugme ne postoji
  btnObrisiSve.addEventListener("click", () => {
    localStorage.removeItem(key);
    localStorage.removeItem(oznaka);

    racunElement.innerHTML = "";
    ukupno = 0;
    ukupnoElement.textContent = ukupno;

    narudzbe = [];

    console.log(`racun za ovaj sto je obrisan ${key}`);
  });
}

const btnPlaceno = document.getElementById("placeno");

if (btnPlaceno) {
  // Provjera
  btnPlaceno.addEventListener("click", () => {
    localStorage.setItem(oznaka, true);
    localStorage.setItem(`${key}ukupnaCijena`, ukupno);

    localStorage.removeItem(`ukupno2${key}`);

    localStorage.removeItem(key);
    console.log(localStorage.getItem(oznaka));
    console.log(localStorage.getItem(`${key}ukupnaCijena`));
  });
}

// ---------------------------------------------------------
// GENERISANJE HRANE (POPRAVLJENO)
// ---------------------------------------------------------

const hrana = JSON.parse(localStorage.getItem("hrana"));

if (hrana) {
  // --- JELO 1 ---
  // Pravimo div omotač za prvo jelo
  let div1 = document.createElement("div");
  div1.className = "jelo-item";

  let meal1 = document.createElement("p");
  meal1.className = "naziv";
  meal1.textContent = hrana[0].strMeal;
  div1.appendChild(meal1);

  let cijena1 = document.createElement("p");
  cijena1.className = "cijena";
  cijena1.textContent = 550;
  div1.appendChild(cijena1);

  let napomena1 = document.createElement("input");
  napomena1.className = "napomena";
  napomena1.placeholder = "napomena";
  div1.appendChild(napomena1);

  let kolicina1 = document.createElement("input");
  kolicina1.className = "kolicina";
  kolicina1.placeholder = "kolicina";
  div1.appendChild(kolicina1);

  let btn1 = document.createElement("button");
  btn1.textContent = "Dodaj";
  btn1.className = "btn-dodaj-hranu"; // Dodajemo klasu da ga lakše prepoznamo
  div1.appendChild(btn1);

  hranaAPIdiv.appendChild(div1); // Dodajemo div1 u glavni div

  // --- JELO 2 ---
  // Pravimo div omotač za drugo jelo
  let div2 = document.createElement("div");
  div2.className = "jelo-item";

  let meal2 = document.createElement("p");
  meal2.className = "naziv"; // DODATA KLASA
  meal2.textContent = hrana[1].strMeal;
  div2.appendChild(meal2);

  let cijena2 = document.createElement("p");
  cijena2.className = "cijena"; // DODATA KLASA
  cijena2.textContent = 750;
  div2.appendChild(cijena2);

  let napomena2 = document.createElement("input");
  napomena2.className = "napomena"; // DODATA KLASA
  napomena2.placeholder = "napomena";
  div2.appendChild(napomena2);

  let kolicina2 = document.createElement("input");
  kolicina2.className = "kolicina"; // DODATA KLASA
  kolicina2.placeholder = "kolicina";
  div2.appendChild(kolicina2);

  let btn2 = document.createElement("button");
  btn2.textContent = "dodaj";
  btn2.className = "btn-dodaj-hranu";
  div2.appendChild(btn2);

  hranaAPIdiv.appendChild(div2); // Dodajemo div2 u glavni div

  // --- JELO 3 ---
  // Pravimo div omotač za treće jelo
  let div3 = document.createElement("div");
  div3.className = "jelo-item";

  let meal3 = document.createElement("p");
  meal3.className = "naziv"; // DODATA KLASA
  meal3.textContent = hrana[2].strMeal;
  div3.appendChild(meal3);

  let cijena3 = document.createElement("p");
  cijena3.className = "cijena"; // DODATA KLASA
  cijena3.textContent = 800;
  div3.appendChild(cijena3);

  let napomena3 = document.createElement("input");
  napomena3.className = "napomena"; // DODATA KLASA
  napomena3.placeholder = "napomena";
  div3.appendChild(napomena3);

  let kolicina3 = document.createElement("input");
  kolicina3.className = "kolicina"; // DODATA KLASA
  kolicina3.placeholder = "kolicina";
  div3.appendChild(kolicina3);

  let btn3 = document.createElement("button");
  btn3.textContent = "dodaj";
  btn3.className = "btn-dodaj-hranu";
  div3.appendChild(btn3);

  hranaAPIdiv.appendChild(div3); // Dodajemo div3 u glavni div
}

// ---------------------------------------------------------
// EVENT LISTENER (UNIVERZALNA LOGIKA KLIKA ZA SVE)
// ---------------------------------------------------------

document.body.addEventListener("click", function (e) {
  // Provjeravamo je li kliknuto na dugme "Dodaj" (ili "dodaj")
  // Koristimo toLowerCase() da pokrijemo i velika i mala slova
  if (
    e.target.tagName === "BUTTON" &&
    e.target.textContent.toLowerCase() === "dodaj"
  ) {
    const t = e.target.parentElement; // Ovo je div u kojem se nalazi dugme

    // Tražimo elemente unutar tog diva
    const nazivElement = t.querySelector(".naziv");
    const cijenaElement = t.querySelector(".cijena");
    const napomenaElement = t.querySelector(".napomena");
    const kolicinaElement = t.querySelector(".kolicina");

    // Provjera da li smo kliknuli na pravo dugme za narudžbu (da ne bi hvatali dugme "Obrisi sve" i sl.)
    // Ako nema naziva i cijene pored dugmeta, onda to nije dugme za hranu/piće
    if (nazivElement && cijenaElement) {
      const naziv = nazivElement.textContent;
      const cijena = parseFloat(cijenaElement.textContent);

      // Napomena i količina su inputi, pa uzimamo .value
      // Ako input za napomenu ne postoji (možda ga negdje nisi stavio), stavimo prazan string
      const napomena = napomenaElement ? napomenaElement.value : "";

      let kolicinaVal = kolicinaElement ? kolicinaElement.value : 1;
      // Ako je polje prazno ili nije broj, računamo kao 1
      const kolicina =
        kolicinaVal && kolicinaVal > 0 ? parseInt(kolicinaVal) : 1;

      const cijenaKolicina = cijena * kolicina;

      const item = { naziv, napomena, kolicina, cijenaKolicina };

      narudzbe.push(item);
      dodajURacun(item);

      ukupno += cijenaKolicina;
      ukupnoElement.textContent = ukupno;
    }
  }
});
