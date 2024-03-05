(async function() {
  let elementoLista = (await cargarTemplateElementoLista()).outerHTML

  await cargarTemplateElementoLista()
  let entradas = ["Entrada 1", "Entrada 2", "Entrada 3", "Entrada x"]
  let productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4"]

  let ulDivEntradas = document.querySelector("section#lista-entradas div ul");
  for (var i = 0; i < entradas.length; i++) {
    ulDivEntradas.innerHTML += `<li>${elementoLista}</li>`
  }

  let ulDivMerchandising = document.querySelector("section#lista-merchandising div ul")
  for (var i = 0; i < productos.length; i++) {
    ulDivMerchandising.innerHTML += `<li>${elementoLista}</li>`
  }
})();

// Función que carga el template del elemento de la lista y lo devuelve
async function cargarTemplateElementoLista() {
  let response = await fetch("../html/ListadoCarrito.html");
  let text = await response.text();
  let templateElement = document.createElement("template");
  templateElement.innerHTML = text

  let linkElement = templateElement.content.querySelector("link");
  document.querySelector("main").appendChild(linkElement)

  return templateElement.content.querySelector("main ul li ul");
}
