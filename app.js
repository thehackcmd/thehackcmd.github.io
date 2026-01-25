const PASSWORD = "thehackcmd";

const lockScreen = document.getElementById("lock");
const app = document.getElementById("app");

function unlock(){
  const input = document.getElementById("pass").value;
  if(input === PASSWORD){
    localStorage.setItem("auth", "1");
    lockScreen.style.display = "none";
    app.style.display = "block";
  } else {
    document.getElementById("error").textContent = "Contraseña incorrecta";
  }
}

function lock(){
  localStorage.removeItem("auth");
  location.reload();
}

if(localStorage.getItem("auth") === "1"){
  lockScreen.style.display = "none";
  app.style.display = "block";
}

// Registrar service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
