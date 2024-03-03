document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
    cargarContenidoDinamico();
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

function cargarContenidoDinamico() {
    // Ahora esta función no recibe mainContent, ya que buscará en el DOM actualizado
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            let dynamicContentSection = document.querySelector('#dynamicContent');
            if (!dynamicContentSection) {
                console.error('No se encontró #dynamicContent en el DOM');
                return;
            }
            data.forEach(item => {
                let article = document.createElement('article');
                article.innerHTML = `<h2>${item.title}</h2><p>${item.description}</p>`;
                dynamicContentSection.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
}

async function cargarPagina(e) {
  e.preventDefault();
  let target = e.target;
  let nombreArchivo;
  if (target.tagName.toLowerCase() === 'img') {
    target = target.parentElement;
  }
  if (target.tagName.toLowerCase() === "button") {
    nombreArchivo = "../html/" + target.getAttribute("name") + ".html"
  }
  else {
    nombreArchivo = "../html/" + target.getAttribute('href');
  }

  // Eliminar los listener internos de la página
  let enlacesInternosEliminar = document.querySelectorAll("main .nav-item");
  enlacesInternosEliminar.forEach(enlace => {
    enlace.removeEventListener('click', cargarPagina)
  })

  let mainSection = document.querySelector('main');
  mainSection.innerHTML = '';  // Limpiar el contenido existente

  // Eliminar los scripts antiguos
  let oldScripts = document.querySelectorAll('script.dynamic-script');
  oldScripts.forEach(script => script.remove());

  mainSection.appendChild(await cargarTemplate(nombreArchivo));

  // Añadir los listeners internos de la página
  let enlacesInternos = document.querySelectorAll("main .nav-item");
  enlacesInternos.forEach(enlace => {
    enlace.addEventListener('click', cargarPagina)
  })

  // Para cada script en el contenido cargado
  let scripts = mainSection.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src) {
      let script = document.createElement('script');
      script.src = scripts[i].src;
      script.className = 'dynamic-script';  // Añadir una clase para poder eliminarlo más tarde
      document.body.appendChild(script);
    }
  }
}
