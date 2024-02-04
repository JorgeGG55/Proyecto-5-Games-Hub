export default function renderHeader() {
  const header = document.createElement("header");
  header.innerHTML = `
      <button onclick="mostrarJuego('piedra-papel-tijera')">Piedra, Papel o Tijera</button>
      <button onclick="mostrarJuego('ahorcado')">Ahorcado</button>
      <button onclick="mostrarJuego('tres-en-raya')">Tres en Raya</button>
    `;
  return header;
}
