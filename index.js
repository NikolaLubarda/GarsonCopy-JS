const stoloviElement = document.getElementById("stolovi");
const naplacenoElement = document.getElementById("naplaceno");
const nenaplacenoElement = document.getElementById("nenaplaceno");

function izborPadajuciMeni() {
  document.getElementById("PLista").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".PMbtn")) {
    let dropdowns = document.getElementsByClassName("PL-konobari");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropDown = dropdowns[i];
      if (openDropDown.classList.contains("show")) {
        openDropDown.classList.remove("show");
      }
    }
  }
};

function izabraniKonobar(konobar) {
  localStorage.setItem("konobar", konobar);
  console.log(localStorage.getItem("konobar"));
}
function sledecaStranica() {
  let localStorage1 = localStorage.getItem("konobar");
  if (!localStorage1) {
    alert("izaberi konobara");
  } else {
    window.location.href = "./stolovi.html";
  }
}

window.onload = function () {
  OtvoreniStolovi();
};

function OtvoreniStolovi() {
  stoloviElement.textContent = "Otvoreni Stolovi: ";
  naplacenoElement.textContent = "Zarađeno:";
  nenaplacenoElement.textContent = "Nenaplaceno:";
  let zbirPlaceno = 0;
  let zbirNePlaceno = 0;
  for (let i = 1; i <= 12; i++) {
    let brojStola = i;
    const narudzba = localStorage.getItem(`${brojStola}`);
    //  const sto = document.getElementById(`sto${brojStola}`);
    const placeni = localStorage.getItem(`${brojStola}ukupnaCijena`);
    if (placeni) {
      zbirPlaceno += parseFloat(placeni);
      naplacenoElement.textContent = `Ukupno naplaceno: ${zbirPlaceno}$`;
    }
    //console.log(placeni);
    if (narudzba) {
      //  console.log(narudzba);
      stoloviElement.textContent += `sto:${brojStola} `;
    }

    const nenaplaceno = parseFloat(localStorage.getItem(`ukupno2${brojStola}`));
    if (nenaplaceno) {
      zbirNePlaceno += nenaplaceno;
      nenaplacenoElement.textContent = `nenaplaceno ukupno: ${zbirNePlaceno}$`;
      console.log(nenaplaceno);
    }
  }

  /* const stolovi = JSON.parse(localStorage.getItem("sto")) || [];

  let ukupno = 0;
  stolovi.forEach((sto) => {
    ukupno += parseFloat(sto.cijenakKolicina);
  });
  nenaplacenoElement.textContent = ukupno;
  */
}
