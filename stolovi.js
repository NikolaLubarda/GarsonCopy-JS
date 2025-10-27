function dodavanje(sto) {
  localStorage.setItem("sto", sto);
  console.log(localStorage.getItem("sto"));
  window.location.href = "./narudzba.html";
}
