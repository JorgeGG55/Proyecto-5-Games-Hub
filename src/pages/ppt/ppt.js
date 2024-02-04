import "./ppt.css";

export default function renderPiedraPapelTijera() {
  const container = document.createElement("div");
  container.classList.add("ppt-container");

  container.innerHTML = `
    <h1 class="ppt-title">Piedra, Papel o Tijera</h1>
    <div class="choices">
      <button onclick="jugar('piedra')">Piedra</button>
      <button onclick="jugar('papel')">Papel</button>
      <button onclick="jugar('tijera')">Tijera</button>
    </div>
    <div class="result">
      <p>Victorias: <span id="victorias">0</span></p>
      <p>Derrotas: <span id="derrotas">0</span></p>
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
      <p>Victorias: <span id="victorias">${victorias}</span></p>
      <p>Derrotas: <span id="derrotas">${derrotas}</span></p>
    `;

    localStorage.setItem("victorias", victorias.toString());
    localStorage.setItem("derrotas", derrotas.toString());
  };

  return container;
}
