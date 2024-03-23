(async function() {
  let data = await window.cargarJSON("Legal.json");

  function cambiarTexto(seleccion, ev) {
    ev.preventDefault()
    let textoLegal = document.querySelector("article span.texto-legal");
    console.log(seleccion);
    textoLegal.innerHTML = data[seleccion];
  }

  function addListeners() {
    for (const enlace of document.querySelectorAll("aside ul li")) {
      enlace.addEventListener("click", (ev) => cambiarTexto(enlace.innerText, ev))
    }
  }

  if (document.readyState === 'loading') {  // Si el documento aún se está cargando
    document.addEventListener('DOMContentLoaded', addListeners);
  } else {  // Si el documento ya está cargado
    addListeners();
    let textoLegal = document.querySelector("article span.texto-legal");
    textoLegal.innerHTML = data["Politica de privacidad"];
  }
})();
