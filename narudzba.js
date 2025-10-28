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
    let cijena = document.getElementsByClassName("cijena");
    console.log(e, "klikno", cijena);
  });
});
