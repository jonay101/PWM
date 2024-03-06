(async function() {
  let template = (await window.cargarSubTemplate("../html/ListadoCarrito.html"));
  let elementoLista = template.querySelector("ul li ul");
  let entradas = ["Entrada 1", "Entrada 2", "Entrada 3", "Entrada x"];
  let productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4"];
  let precios = ["15 €", "25 €", "35 €", "45 €"];

  let ulDivEntradas = document.querySelector("section#lista-entradas div ul");
  for (var i = 0; i < entradas.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.info').textContent = entradas[i];
    nuevoElemento.querySelector('.precio').textContent = precios[i];
    ulDivEntradas.innerHTML += `<li>${nuevoElemento.outerHTML}</li>`;
  }

  let ulDivMerchandising = document.querySelector("section#lista-merchandising div ul")
  for (i = 0; i < productos.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.info').textContent = entradas[i];
    nuevoElemento.querySelector('.precio').textContent = precios[i];
    ulDivMerchandising.innerHTML += `<li>${nuevoElemento.outerHTML}</li>`;
  }
  cargarListenersEliminar()
})();
function cargarListenersEliminar() {
  for (const botonEliminar of document.querySelectorAll("main button.boton-eliminar")) {
    botonEliminar.addEventListener('click', eliminarElemento)
  }
}

function eliminarElemento(evt) {
  let elementoCarrito = evt.target.parentNode.parentNode.parentNode;
  elementoCarrito.parentNode.removeChild(elementoCarrito)
}
