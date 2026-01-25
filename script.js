const PASSWORD = "1234"; // CAMBIA ESTO
let games = [];
let favorites = JSON.parse(localStorage.getItem("fav")) || [];

// ---- BLOQUEO ----
function unlock(){
  const pass = document.getElementById("password").value;
  if(pass === PASSWORD){
    localStorage.setItem("unlocked","true");
    showContent();
  } else {
    document.getElementById("lockMsg").textContent = "❌ Contraseña incorrecta";
  }
}

function lock(){
  localStorage.removeItem("unlocked");
  location.reload();
}

function showContent(){
  document.getElementById("lockScreen").style.display = "none";
  document.getElementById("content").style.display = "block";
}

if(localStorage.getItem("unlocked") === "true"){
  showContent();
}

// ---- JUEGOS ----
fetch("games.json")
.then(r => r.json())
.then(data => {
  games = data;
  render(games);
});

function render(list){
  const div = document.getElementById("games");
  div.innerHTML = "";
  list.forEach(g => {
    div.innerHTML += `
      <div class="card">
        <img src="${g.img}">
        <h3>${g.name}</h3>
        <button onclick="play('${g.url}')">Jugar</button>
        <button onclick="fav('${g.name}')">⭐</button>
      </div>
    `;
  });
}

function play(url){
  location.href = "juego.html?url=" + encodeURIComponent(url);
}

// ---- FAVORITOS ----
function fav(name){
  if(!favorites.includes(name)){
    favorites.push(name);
    localStorage.setItem("fav", JSON.stringify(favorites));
  }
}

function showFavorites(){
  render(games.filter(g => favorites.includes(g.name)));
}

// ---- BUSCADOR ----
document.getElementById("search").addEventListener("input", e=>{
  const q = e.target.value.toLowerCase();
  render(games.filter(g => g.name.toLowerCase().includes(q)));
});
