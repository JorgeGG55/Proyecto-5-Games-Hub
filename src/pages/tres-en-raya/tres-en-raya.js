import "./tres-en-raya.css";

export default function renderTresEnRaya() {
  const container = document.createElement("div");
  container.classList.add("tres-en-raya-container");
  container.innerHTML = `
    <h1 class="tres-en-raya-title">3 en raya</h1>
    <div class="tres-en-raya-buttons">
      <button onclick="iniciarJuego('X')">Jugar como X</button>
      <button onclick="iniciarJuego('O')">Jugar como O</button>
    </div>
    <p id="turno"></p>
    <div class="tres-en-raya-board" id="tablero"></div>
  `;

  return container;
}

window.iniciarJuego = function (jugador) {
  const tablero = document.getElementById("tablero");
  const turnoP = document.getElementById("turno");

  tablero.innerHTML = "";
  turnoP.textContent = `Turno: ${jugador}`;

  const estadoJuego = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const casillas = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const casilla = document.createElement("div");
      casilla.classList.add("tres-en-raya-cell");
      casilla.dataset.row = i;
      casilla.dataset.col = j;
      casilla.addEventListener("click", () => realizarJugada(i, j));
      tablero.appendChild(casilla);
      casillas.push(casilla);
    }
  }

  function realizarJugada(row, col) {
    if (estadoJuego[row][col] === null) {
      estadoJuego[row][col] = jugador;

      const texto = document.createElement("span");
      texto.textContent = jugador;
      if (jugador === "O") {
        texto.classList.add("rojo");
      }

      casillas[row * 3 + col].innerHTML = "";
      casillas[row * 3 + col].appendChild(texto);

      const ganador = comprobarGanador();
      const empate = comprobarEmpate();

      setTimeout(() => {
        if (ganador) {
          alert(`¡El jugador ${ganador} ha ganado!`);
          reiniciarJuego();
        } else if (empate) {
          alert("¡Empate!");
          reiniciarJuego();
        } else {
          jugador = jugador === "X" ? "O" : "X";
          turnoP.textContent = `Turno: ${jugador}`;
        }
      }, 0);
    }
  }

  function comprobarGanador() {
    for (let i = 0; i < 3; i++) {
      if (
        estadoJuego[i][0] === estadoJuego[i][1] &&
        estadoJuego[i][1] === estadoJuego[i][2] &&
        estadoJuego[i][0] !== null
      ) {
        return estadoJuego[i][0];
      }

      if (
        estadoJuego[0][i] === estadoJuego[1][i] &&
        estadoJuego[1][i] === estadoJuego[2][i] &&
        estadoJuego[0][i] !== null
      ) {
        return estadoJuego[0][i];
      }
    }

    if (
      estadoJuego[0][0] === estadoJuego[1][1] &&
      estadoJuego[1][1] === estadoJuego[2][2] &&
      estadoJuego[0][0] !== null
    ) {
      return estadoJuego[0][0];
    }

    if (
      estadoJuego[0][2] === estadoJuego[1][1] &&
      estadoJuego[1][1] === estadoJuego[2][0] &&
      estadoJuego[0][2] !== null
    ) {
      return estadoJuego[0][2];
    }

    return null;
  }

  function comprobarEmpate() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (estadoJuego[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }

  function reiniciarJuego() {
    iniciarJuego(jugador);
  }
};
