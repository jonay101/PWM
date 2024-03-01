const textos = new Map()

textos.set("Politica de privacidad", "Política de privacidad de ejemplo")
textos.set("Aviso legal", "Aviso legal de ejemplo")
textos.set("Normativa del Zoo", "Normativa del zoo de ejemplo")
textos.set("Terminos y condiciones", "Términos y condiciones del zoo de ejemplo")
textos.set("Sobre nosotros", "Ejemplo de sobre nosotros")

function cambiarTexto(seleccion, ev) {
  ev.preventDefault()
  let textoLegal = document.querySelector("article span.texto-legal");
  textoLegal.innerHTML = textos.get(seleccion)
}

for (const enlace of document.querySelectorAll("aside ul li")) {
  console.log(enlace)
  enlace.addEventListener("click", (ev) => cambiarTexto(enlace.innerText, ev)
  )
}
