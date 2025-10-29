const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

const racun = document.getElementById("racun");

const btns = document.querySelectorAll("button");

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const t = e.target.parentElement;
    const naziv = t.querySelector(".naziv").textContent;
    const cijena = t.querySelector(".cijena").textContent;
    const napomena = t.querySelector(".napomena").value;
    const kolicina = t.querySelector(".kolicina").value;
    // console.log(cijena, naziv, napomena, kolicina);
    console.log(naziv, cijena, napomena, kolicina);
  });
});
