(async function() {
  let template = (await window.cargarSubTemplate("../html/ElementoMerch.html"));
  let productos = ["Producto 1", "Producto 2", "Producto 3", "Producto 4", "Producto 5"];
  let precios = ["15 €", "25 €", "35 €", "45 €", "55 €"];

  let catalogoMerchandising = document.querySelector("main ul");
  let fragmento = document.createDocumentFragment();

  for (i = 0; i < productos.length; i++) {
    let nuevoElemento = template.cloneNode(true);
    nuevoElemento.querySelector('.info').textContent = productos[i];
    nuevoElemento.querySelector('.precio').textContent = precios[i];
    nuevoElemento.querySelector('.cantidad').textContent = "1";
    fragmento.appendChild(nuevoElemento);
  }

  catalogoMerchandising.appendChild(fragmento);
})();
