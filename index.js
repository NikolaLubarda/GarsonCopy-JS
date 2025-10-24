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
