import "./ahorcado.css";

const palabras = ["javascript", "html", "css", "developer", "programming"];

export default function renderAhorcado() {
  const container = document.createElement("div");
  container.classList.add("ahorcado-container");

  let palabraSeleccionada = obtenerNuevaPalabra();
  let palabraAdivinada = Array(palabraSeleccionada.length).fill("_");
  let letrasIncorrectas = [];
  let intentosFallidos = 0;
  const maxIntentos = 6;

  function obtenerNuevaPalabra() {
    return palabras[Math.floor(Math.random() * palabras.length)];
  }

  function actualizarPalabraAdivinada() {
    const palabraElemento = container.querySelector(".palabra");
    palabraElemento.textContent = palabraAdivinada.join(" ");
  }

  function mostrarMensaje(mensaje) {
    const mensajeElemento = container.querySelector(".mensaje");
    mensajeElemento.textContent = mensaje;
  }

  function mostrarLetrasIncorrectas() {
    const letrasIncorrectasElemento = container.querySelector(
      ".letras-incorrectas"
    );
    letrasIncorrectasElemento.textContent = `Letras incorrectas: ${letrasIncorrectas.join(
      " - "
    )}`;
  }

  function mostrarIntentosRestantes() {
    const intentosRestantesElemento = container.querySelector(
      ".intentos-restantes"
    );
    intentosRestantesElemento.textContent = `Intentos restantes: ${
      maxIntentos - intentosFallidos
    }`;
  }

  function desactivarTecla(letra) {
    const teclaElemento = container.querySelector(
      `button[data-letra="${letra}"]`
    );
    if (teclaElemento) {
      teclaElemento.disabled = true;
    }
  }

  window.reiniciarJuego = function () {
    palabraSeleccionada = obtenerNuevaPalabra();
    palabraAdivinada = Array(palabraSeleccionada.length).fill("_");
    letrasIncorrectas = [];
    intentosFallidos = 0;

    actualizarPalabraAdivinada();
    mostrarMensaje("");
    mostrarLetrasIncorrectas();
    mostrarIntentosRestantes();

    const teclas = container.querySelectorAll(".letras button");
    teclas.forEach((tecla) => {
      tecla.disabled = false;
    });

    botonReiniciar.style.display = "none";
  };

  container.innerHTML = `
    <h1>Ahorcado</h1>
    <div class="ahorcado">
      <div class="imagen" id="imagen-ahorcado"></div>
      <div class="palabra"></div>
    </div>
    <div class="teclado">
      <p class="mensaje"></p>
      <p class="letras-incorrectas"></p>
      <p class="intentos-restantes"></p>
      <div class="letras">
        ${"abcdefghijklmnopqrstuvwxyz"
          .split("")
          .map(
            (letra) =>
              `<button data-letra="${letra}" onclick="jugar('${letra}')">${letra}</button>`
          )
          .join("")}
      </div>
    </div>
    <button id="boton-reiniciar" onclick="reiniciarJuego()" style="display: none;">Reiniciar Partida</button>
  `;

  const botonReiniciar = container.querySelector("#boton-reiniciar");

  actualizarPalabraAdivinada();
  mostrarLetrasIncorrectas();
  mostrarIntentosRestantes();

  window.jugar = function (letra) {
    if (intentosFallidos >= maxIntentos) {
      return;
    }

    if (palabraSeleccionada.includes(letra)) {
      for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
          palabraAdivinada[i] = letra;
        }
      }

      if (!palabraAdivinada.includes("_")) {
        mostrarMensaje("¡Has ganado!");
        botonReiniciar.style.display = "block";
      }
    } else {
      intentosFallidos++;
      letrasIncorrectas.push(letra);
      desactivarTecla(letra);

      if (intentosFallidos >= maxIntentos) {
        mostrarMensaje(`¡Has perdido! La palabra era: ${palabraSeleccionada}`);
        botonReiniciar.style.display = "block";
      }
    }

    mostrarLetrasIncorrectas();
    mostrarIntentosRestantes();
    actualizarPalabraAdivinada();
  };

  return container;
}
