(async function() {
  let template = (await window.cargarSubTemplate("../html/ListadoCarrito.html"));
  let elementoLista = template.querySelector("ul li");

  let datos = await window.cargarJSON("Carrito.json");

  let mainElement = document.querySelector("main");
  mainElement.appendChild(template.querySelector("link"));

  let entradas = datos["Entradas"];
  let fragmentoEntradas = document.createDocumentFragment();
  let ulDivEntradas = document.querySelector("section#lista-entradas div ul");
  for (var i = 0; i < entradas.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.informacion').textContent = entradas[i]["nombre"];
    nuevoElemento.querySelector('.precio').textContent = `${entradas[i]["coste"]} €`;
    nuevoElemento.querySelector('.cantidad').textContent = entradas[i]["cantidad"];
    nuevoElemento.querySelector('.imagen').src = entradas[i]["imagen"];
    fragmentoEntradas.appendChild(nuevoElemento);
  }
  ulDivEntradas.appendChild(fragmentoEntradas);

  let productos = datos["Merchandising"];
  let fragmentoMerchandising = document.createDocumentFragment();
  let ulDivMerchandising = document.querySelector("section#lista-merchandising div ul");
  for (i = 0; i < productos.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.informacion').textContent = productos[i]["nombre"];
    nuevoElemento.querySelector('.precio').textContent = `${productos[i]["coste"]} €`;
    nuevoElemento.querySelector('.cantidad').textContent = productos[i]["cantidad"];
    nuevoElemento.querySelector('.imagen').src = productos[i]["imagen"];
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
