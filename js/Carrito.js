(async function() {
  let template = (await window.cargarSubTemplate("../html/ListadoCarrito.html"));
  let elementoLista = template.querySelector("ul li");

  //let datos = await window.cargarJSON("Carrito.json");
  let datos = JSON.parse(localStorage.getItem('carrito'));

  let mainElement = document.querySelector("main");
  mainElement.appendChild(template.querySelector("link"));

  insertarFragmento("entradas", datos, elementoLista);
  insertarFragmento("merchandising", datos, elementoLista);

  cargarListenersEliminar();
})();
function cargarListenersEliminar() {
  for (const botonEliminar of document.querySelectorAll("main button.boton-eliminar")) {
    botonEliminar.addEventListener('click', eliminarElemento);
  }
}

function eliminarElemento(evt) {
  let carrito = JSON.parse(window.localStorage.getItem("carrito"));

  let elementoCarrito = evt.target.parentNode.parentNode.parentNode;
  let nombreListado = obtenerTituloListado(elementoCarrito);
  let datosCarrito = carrito[nombreListado];

  let nombreElementoEliminar = elementoCarrito.querySelectorAll("li ul li")[1].textContent;
  let elementoCarritoEliminar = datosCarrito.find(e => e.nombre === nombreElementoEliminar);
  if (elementoCarritoEliminar) {
    let indice = datosCarrito.indexOf(elementoCarritoEliminar);
    datosCarrito.splice(indice, 1);
    console.log(`Eliminado elemento ${nombreElementoEliminar} del carrito`);
  }
  else {
    console.log(`No se ha podido eliminar ${nombreElementoEliminar} del carrito`);
  }

  window.localStorage.setItem("carrito", JSON.stringify(carrito));
  elementoCarrito.parentNode.removeChild(elementoCarrito);
}

function insertarFragmento(listado, datos, elementoLista) {
  let elementos = datos[listado];
  let fragmento = document.createDocumentFragment();
  let ulDivListado = document.querySelector(`section#lista-${listado} div ul`);
  for (var i = 0; i < elementos.length; i++) {
    let nuevoElemento = elementoLista.cloneNode(true);
    nuevoElemento.querySelector('.informacion').textContent = elementos[i]["nombre"];
    nuevoElemento.querySelector('.precio').textContent = `${elementos[i]["coste"]} €`;
    nuevoElemento.querySelector('.cantidad').textContent = elementos[i]["cantidad"];
    nuevoElemento.querySelector('.imagen').src = "../img/"+elementos[i]["imagen"];
    fragmento.appendChild(nuevoElemento);
  }
  ulDivListado.appendChild(fragmento);
}

function obtenerTituloListado(elementoCarrito) {
  return elementoCarrito.parentNode.parentNode.parentNode.querySelector("header").textContent.trim().toLowerCase();
}
