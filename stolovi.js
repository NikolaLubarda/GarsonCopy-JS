function dodavanje(sto) {
  localStorage.setItem("sto", sto);
  console.log(localStorage.getItem("sto"));
  window.location.href = "./narudzba.html";
}

window.onload = function () {
  bojaStola();
};

function bojaStola() {
  for (let i = 1; i <= 12; i++) {
    let brojStola = i;
    const placeno = localStorage.getItem(`${brojStola}oznaka`);
    const narudzba = localStorage.getItem(`${brojStola}`);

    const sto = document.getElementById(`sto${brojStola}`);
    if (placeno === "true") {
      sto.style.backgroundColor = "green";
    } else if (narudzba) {
      sto.style.backgroundColor = "orange";
    } else {
      sto.style.backgroundColor = "#bbb";
    }
  }
}
