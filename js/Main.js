document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
});

async function cargarEstructura() {
    let appDiv = document.getElementById('app');

    // Cargar estructura estática
    appDiv.appendChild(await cargarTemplate('../html/Header.html'));
    appDiv.appendChild(await cargarTemplate('../html/Home.html'));
    appDiv.appendChild(await cargarTemplate('../html/Footer.html'));

    // Agregar controladores de eventos a los enlaces
    let enlaces = document.querySelectorAll('.nav-item,.logo,.nav-icon');
    enlaces.forEach(enlace => {
      enlace.addEventListener('click', cargarPagina);
    });
}

async function cargarTemplate(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

//funcion que se encarga de cargar los json para las paginas que lo necesiten
window.cargarJSON = async function(url) {
  let response = await fetch("../json/"+url);
  return await response.json();
}

async function cargarPagina(e) {
  e.preventDefault();
  let target = e.target;
  if (target.tagName.toLowerCase() === 'img' || target.tagName.toLowerCase() === "button") {
    target = target.parentElement;
  }
  let nombreArchivo = "../html/" + target.getAttribute('href');

  limpiarElementos();
  let mainSection = document.querySelector('main');
  mainSection.innerHTML = '';  // Limpiar el contenido existente

  mainSection.appendChild(await cargarTemplate(nombreArchivo));

  cargarElementos(mainSection);
}

function limpiarElementos() {
  let enlacesInternosEliminar = document.querySelectorAll("main .nav-item");
  enlacesInternosEliminar.forEach(enlace => {
    enlace.removeEventListener('click', cargarPagina)
  })
  // Eliminar los scripts antiguos
  let oldScripts = document.querySelectorAll('script.dynamic-script');
  oldScripts.forEach(script => script.remove());
}
function cargarElementos(mainSection) {
  let enlacesInternos = mainSection.querySelectorAll("main .nav-item");
  enlacesInternos.forEach(enlace => {
    enlace.addEventListener('click', cargarPagina)
  })
  let scripts=mainSection.getElementsByTagName('script')
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src) {
      let script = document.createElement('script');
      script.src = scripts[i].src;
      script.className = 'dynamic-script';
      document.body.appendChild(script);
    }
  }
}

window.cargarSubTemplate = async function(url) {
  return cargarTemplate(url);
}

window.cargarPagina = async function(e) {
  return cargarPagina(e);
}
