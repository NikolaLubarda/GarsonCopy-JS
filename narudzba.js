const konobarElement = document.getElementById("konobar1");
const konobar = localStorage.getItem("konobar");
konobarElement.innerHTML = `Konobar: ${konobar}`;

const stoElement = document.getElementById("sto");
const sto = localStorage.getItem("sto");
stoElement.innerHTML = `Broj stola: ${sto}`;

console.log(sto);
