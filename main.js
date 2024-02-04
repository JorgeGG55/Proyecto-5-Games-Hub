import "./style.css";
import renderHeader from "./src/components/header.js";
import renderPiedraPapelTijera from "./src/pages/ppt/ppt.js";
import renderAhorcado from "./src/pages/ahorcado/ahorcado.js";
import renderTresEnRaya from "./src/pages/tres-en-raya/tres-en-raya.js";

const appContainer = document.querySelector("#app");
let juegoActual = null;

window.mostrarJuego = function (juego) {
  if (juegoActual) {
    appContainer.removeChild(juegoActual);
  }

  switch (juego) {
    case "piedra-papel-tijera":
      juegoActual = renderPiedraPapelTijera();
      break;
    case "ahorcado":
      juegoActual = renderAhorcado();
      break;
    case "tres-en-raya":
      juegoActual = renderTresEnRaya();
      break;
    default:
      juegoActual = document.createElement("div");
      juegoActual.innerHTML = "<p>Juego no encontrado</p>";
  }

  appContainer.appendChild(juegoActual);
};

appContainer.appendChild(renderHeader());
