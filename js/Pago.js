(function () {
  for (const boton of document.querySelectorAll("main section#formulario-pago input[type=radio]")) {
    boton.addEventListener('click', cambiarFormulario)
  }

  document.querySelector("form button").addEventListener('click', botonPago)
})();

function cambiarFormulario(evt) {
  for (const formulario of document.querySelectorAll("main section#formulario-pago div#contenedor-form-tarjeta, div#contenedor-form-paypal")) {
    formulario.className = "inactivo"
    for (const input of formulario.querySelectorAll("input")) {
      input.disabled = true
    }
  }

  let formularioAMostrar = evt.target.parentElement.querySelector(`div#contenedor-form-${evt.target.getAttribute("id").split("-")[1]}`);
  formularioAMostrar.className = "activo"
  for (const input of formularioAMostrar.querySelectorAll("input")) {
    input.disabled = false
  }
}

async function botonPago(evt) {
  let formulario = document.querySelector("main form");
  if(formulario.checkValidity()) {
    evt.preventDefault()
    await window.cargarPagina(evt)
  }
}
