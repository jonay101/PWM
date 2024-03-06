(async function() {
  let entradas = ["Entrada 1", "Entrada 2", "Entrada 3", "Entrada x"];
  let productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4"];
  let precios = ["15", "25", "35", "45"];

  let template = await window.cargarSubTemplate('../html/ListadoCarrito.html');

  let ulDivEntradas = document.querySelector("section#lista-entradas div ul");
  for (var i = 0; i < entradas.length; i++) {
    let elementoLista = template.cloneNode(true);
    elementoLista.querySelector('.info').textContent = entradas[i];
    elementoLista.querySelector('.precio').textContent = precios[i];
    ulDivEntradas.appendChild(elementoLista);
  }

  let ulDivMerchandising = document.querySelector("section#lista-merchandising div ul");
  for (var i = 0; i < productos.length; i++) {
    let elementoLista = template.cloneNode(true);
    elementoLista.querySelector('.info').textContent = productos[i];
    elementoLista.querySelector('.precio').textContent = precios[i];
    ulDivMerchandising.appendChild(elementoLista);
  }
})();
