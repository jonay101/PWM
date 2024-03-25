(async function() {
  let template = (await window.cargarSubTemplate("../html/ListadoCarrito.html"));
  let elementoLista = template.querySelector("ul li");
  let entradas = ["Entrada 1", "Entrada 2", "Entrada 3", "Entrada x"];
  let productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4"];
  let precios = ["15 €", "25 €", "35 €", "45 €"];

  let mainElement = document.querySelector("main");
  mainElement.appendChild(template.querySelector("link"));

  let fragmentoEntradas = document.createDocumentFragment();
  let ulDivEntradas = document.querySelector("section#lista-entradas div ul");
  for (var i = 0; i < entradas.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.informacion').textContent = entradas[i];
    nuevoElemento.querySelector('.precio').textContent = precios[i];
    fragmentoEntradas.appendChild(nuevoElemento);
  }
  ulDivEntradas.appendChild(fragmentoEntradas);

  let fragmentoMerchandising = document.createDocumentFragment();
  let ulDivMerchandising = document.querySelector("section#lista-merchandising div ul");
  for (i = 0; i < productos.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.informacion').textContent = productos[i];
    nuevoElemento.querySelector('.precio').textContent = precios[i];
    fragmentoMerchandising.appendChild(nuevoElemento);
  }
  ulDivMerchandising.appendChild(fragmentoMerchandising);

  cargarListenersEliminar();
})();
function cargarListenersEliminar() {
  for (const botonEliminar of document.querySelectorAll("main button.boton-eliminar")) {
    botonEliminar.addEventListener('click', eliminarElemento);
  }
}

function eliminarElemento(evt) {
  let elementoCarrito = evt.target.parentNode.parentNode.parentNode;
  elementoCarrito.parentNode.removeChild(elementoCarrito);
}
