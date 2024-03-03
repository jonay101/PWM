(function() {
  function cambiarTexto(seleccion, ev) {
    ev.preventDefault()
    let textoLegal = document.querySelector("article span.texto-legal");
    textoLegal.innerHTML = textos.get(seleccion);
  }

  const textos = new Map()
  textos.set("Politica de privacidad", "Política de privacidad de ejemplo......... ............ ................. ................... ............., ,,, ,,,,,,,, .........................................................................................................................................................................................................................................................................................................." +
    "continuael testhastaelfin................................ .................................................................... ..................................................................................................................... ........................................................................ ")
  textos.set("Aviso legal", "Aviso legal de ejemplo")
  textos.set("Normativa del Zoo", "Normativa del zoo de ejemplo")
  textos.set("Terminos y condiciones", "Términos y condiciones del zoo de ejemplo")
  textos.set("Sobre nosotros", "Ejemplo de sobre nosotros")

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
    textoLegal.innerHTML = textos.get("Politica de privacidad");
  }
})();
