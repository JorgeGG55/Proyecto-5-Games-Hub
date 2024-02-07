import "./ppt.css";

export default function renderPiedraPapelTijera() {
  const container = document.createElement("div");
  container.classList.add("ppt-container");

  container.innerHTML = `
    <h1 class="ppt-title">Piedra, Papel o Tijera</h1>
    <div class="choices">
      <button class="choiceButton" onclick="jugar('piedra')">Piedra</button>
      <button class="choiceButton" onclick="jugar('papel')">Papel</button>
      <button class="choiceButton" onclick="jugar('tijera')">Tijera</button>
    </div>
    <div class="result">
    </div>
    <div class="score">
      <div class="scoreNames">
        <p class="namesText">Tú</p>
        <p class="namesText">|</p>
        <p class="namesText">IA</p>
      </div>
      <div class="scoreNumbers">
        <p>0</p>
        <p>:</p>
        <p>0</p>
      </div>
    </div>
  `;

  let victorias = parseInt(localStorage.getItem("victorias")) || 0;
  let derrotas = parseInt(localStorage.getItem("derrotas")) || 0;

  window.jugar = function (eleccionUsuario) {
    const elecciones = ["piedra", "papel", "tijera"];
    const eleccionMaquina = elecciones[Math.floor(Math.random() * 3)];

    let resultado = "";
    if (eleccionUsuario === eleccionMaquina) {
      resultado = "Empate";
    } else if (
      (eleccionUsuario === "piedra" && eleccionMaquina === "tijera") ||
      (eleccionUsuario === "papel" && eleccionMaquina === "piedra") ||
      (eleccionUsuario === "tijera" && eleccionMaquina === "papel")
    ) {
      resultado = "¡Ganaste!";
      victorias++;
    } else {
      resultado = "¡Perdiste!";
      derrotas++;
    }

    const resultContainer = container.querySelector(".result");
    resultContainer.innerHTML = `
      <p>${resultado}</p>
      <p>La máquina eligió: ${eleccionMaquina}</p>
    `;

    const scoreContainer = container.querySelector(".score");
    scoreContainer.innerHTML = `
      <div class="scoreNames">
        <p class="namesText">Tú</p>
        <p class="namesText">|</p>
        <p class="namesText">IA</p>
      </div>
      <div class="scoreNumbers">
        <p><span id="victorias">${victorias}</span></p>
        <p>:</p>
        <p><span id="derrotas">${derrotas}</span></p>
      </div>
    `;

    localStorage.setItem("victorias", victorias.toString());
    localStorage.setItem("derrotas", derrotas.toString());
  };

  return container;
}
