(async function() {
  let datos = await window.cargarJSON("Entradas.json");
  let listaEntradas = datos["Entradas"]
  agregarListeners(listaEntradas);
})();

function agregarListeners(listaEntradas) {
  for (const botonMenos of document.querySelectorAll("main section#entradas button.boton-menos")) {
    botonMenos.addEventListener('click', decrementarValor);
  }

  for (const botonMas of document.querySelectorAll("main section#entradas button.boton-mas")) {
    botonMas.addEventListener('click', incrementarValor);
  }

  let botonComprar = document.querySelector("main button#boton-comprar");
  botonComprar.addEventListener('click', (evt) => agregarAlCarrito(evt, listaEntradas));
}

function decrementarValor(evt) {
  let divPadre = evt.target.parentNode;
  let inputElement = divPadre.querySelector("input");
  let valor = parseInt(inputElement.value);

  if (valor <= 0 || isNaN(valor)) {
    inputElement.value = '0';
  }
  else {
    inputElement.value = (valor - 1).toString()
  }
}

function incrementarValor(evt) {
  let divPadre = evt.target.parentNode;
  let inputElement = divPadre.querySelector("input");
  let valor = parseInt(inputElement.value);

  if(isNaN(valor)) {
    inputElement.value = '0';
  }
  else {
    inputElement.value = (valor + 1).toString();
  }
}

async function agregarAlCarrito(evt, listaEntradas) {
  let carrito = JSON.parse(window.localStorage.getItem("carrito"));
  for (const divEntrada of document.querySelectorAll("main section#entradas div#formulario-entradas div")) {
    let cantidad = parseInt(divEntrada.querySelector("input").value);
    let etiqueta = divEntrada.querySelector("label").textContent.trim();
    let entrada = listaEntradas.find(p => p.nombre === etiqueta.trim().substring(0, etiqueta.length - 1));
    if (cantidad > 0 && !isNaN(cantidad) && entrada) {
      let nombre = entrada.nombre;
      let coste = entrada.coste;
      let entradaCarrito = {
        nombre: nombre,
        coste: coste,
        cantidad: cantidad,
        imagen: "icono_entrada.png"
      }
      carrito["entradas"].push(entradaCarrito);
      console.log(`Añadido ${entrada.nombre} | ${cantidad} al carrito`);
    }
    else {
      console.log(`No se ha podido añadir ${entrada.nombre} | ${cantidad} al carrito`);
    }
  }
  window.localStorage.setItem("carrito", JSON.stringify(carrito));
}
