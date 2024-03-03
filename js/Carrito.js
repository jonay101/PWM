(function() {
  let elementoLista = `<ul>
      <li><img src="../img/twitter-outlined.png"> </li>
      <li>Información del producto</li>
      <li>Precio del producto</li>
      <li>Cantidad del producto</li>
  </ul>`

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
