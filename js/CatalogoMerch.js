(async function() {
  let template = (await window.cargarSubTemplate("../html/ElementoMerch.html"));
  let datos = await window.cargarJSON("Merchandising.json");
  let catalogoMerchandising = document.querySelector("main ul");
  let fragmento = document.createDocumentFragment();
  let objetosMerch=datos["Merchandising"];
  for (var i = 0; i < objetosMerch.length; i++) {
    let nuevoElemento = template.cloneNode(true);
    nuevoElemento.querySelector('.info').textContent = objetosMerch[i]["nombre"];
    nuevoElemento.querySelector('.precio').textContent = `${objetosMerch[i]["coste"]} €`;
    nuevoElemento.querySelector('.cantidad').value = "1";
    nuevoElemento.querySelector('.producto__img').src = "../img/merch/"+objetosMerch[i]["imagen"];
    fragmento.appendChild(nuevoElemento);
  }

  catalogoMerchandising.appendChild(fragmento);
  cargarListeners();

  //Añadir json del carrito para añadir los objetos
  let carrito = await window.cargarJSON("Carrito.json");
  function agregarAlCarrito(event) {
    let objeto = event.target.parentElement;
    let nombreObjeto = objeto.querySelector('.info').textContent;
    let producto = objetosMerch.find(p => p.nombre === nombreObjeto);
    let cantidad = objeto.querySelector('.cantidad').value;
    let valor = parseInt(cantidad);
    if (producto && !isNaN(valor) && valor > 0) {
      let productoCarrito = {
        nombre: producto.nombre,
        precio: producto.coste,
        imagen: producto.imagen,
        cantidad: valor
      };
      console.log(producto.coste);
      carrito["merchandising"].push(productoCarrito);
      //let carritoJSON = JSON.stringify(carrito, null, 2);
      console.log("Añadido "+productoCarrito.cantidad+" con nombre "+ productoCarrito.nombre);
      //fs.writeFileSync('ruta/a/carrito.json', carritoJSON); tendria que
      //guardar el archivo o algo pero no puedo hacerlo utilizando fetch y no se si deberia utilizar node fs
    }
    else {
      console.log(`No se pudo realizar la operacion ${valor} | ${nombreObjeto} en el archivo de merchandising.`);
    }
  }
  function cargarListeners() {
    // Listener para los botones de incrementar
    for (const boton of document.querySelectorAll(".boton-mas")) {
      boton.addEventListener('click', incrementarCantidad);
    }

    // Listener para los botones de decrementar
    for (const boton of document.querySelectorAll(".boton-menos")) {
      boton.addEventListener('click', decrementarCantidad);
    }

    // Listener para los botones de comprar
    for (const boton of document.querySelectorAll(".boton-comprar")) {
      boton.addEventListener('click', agregarAlCarrito);
    }
  }
})();

function incrementarCantidad(event) {
  let inputCantidad = event.target.parentElement.querySelector('.cantidad');
  let valorActual = parseInt(inputCantidad.value);
  if (isNaN(valorActual)) {
    inputCantidad.value = '1';
  } else {
    inputCantidad.value = valorActual + 1;
  }
}

function decrementarCantidad(event) {
  let inputCantidad = event.target.parentElement.querySelector('.cantidad');
  let valorActual = parseInt(inputCantidad.value);
  if (isNaN(valorActual) || valorActual <= 0) {
    inputCantidad.value = '1';
  } else {
    inputCantidad.value = valorActual - 1;
  }
}
