(async function() {
  agregarListeners();
})();

function agregarListeners() {
  for (const botonMenos of document.querySelectorAll("main section#entradas button.boton-menos")) {
    botonMenos.addEventListener('click', decrementarValor);
  }

  for (const botonMas of document.querySelectorAll("main section#entradas button.boton-mas")) {
    botonMas.addEventListener('click', incrementarValor);
  }
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
