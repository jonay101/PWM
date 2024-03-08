(function () {
  for (const boton of document.querySelectorAll("main section#formulario-pago input[type=radio]")) {
    boton.addEventListener('click', cambiarFormulario)
  }
})();

function cambiarFormulario(evt) {
  for (const formulario of document.querySelectorAll("main section#formulario-pago div#contenedor-form-tarjeta, div#contenedor-form-paypal")) {
    formulario.className = "inactivo"
  }

  let formularioAMostrar = evt.target.parentElement.querySelector(`div#contenedor-form-${evt.target.getAttribute("id").split("-")[1]}`);
  formularioAMostrar.className = "activo"
}
