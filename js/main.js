document.addEventListener('DOMContentLoaded', async function() {
    await cargarEstructura();
    cargarContenidoDinamico();
});

async function cargarEstructura() {
    let appDiv = document.getElementById('app');

    // Cargar estructura estática
    appDiv.appendChild(await cargarTemplate('../html/header.html'));
    appDiv.appendChild(await cargarTemplate('../html/home.html'));
    appDiv.appendChild(await cargarTemplate('../html/footer.html'));

    // Agregar controladores de eventos a los enlaces
    let enlaces = document.querySelectorAll('.nav-item, .nav-icon');
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
  let nombreArchivo = e.target.getAttribute('href');
  let mainSection = document.querySelector('main');
  mainSection.innerHTML = '';  // Limpiar el contenido existente
  mainSection.appendChild(await cargarTemplate(nombreArchivo));
}
