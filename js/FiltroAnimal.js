
  (async function () {
    function filterAnimals(category) {
      const animals = document.querySelectorAll(".Animal");

      animals.forEach(function (animal) {
        const animalCategories = animal.classList;
        if (category === "All" || animalCategories.contains(category)) {
          // Mostrar el animal si la categoría es "All" o coincide con la categoría del botón
          animal.style.display = "block";
        } else {
          // Ocultar el animal si no coincide con la categoría del botón
          animal.style.display = "none";
        }
      });
    }

    function addListeners() {
      for (const filtro of document.querySelectorAll(".filtro-catalogo")) {
        filtro.addEventListener("click", (ev) => filtrar(filtro.id, ev));
      }
    }

    function filtrar(category, event) {
      event.preventDefault();
      const filterButtons = document.querySelectorAll(".filtro-catalogo");

      // Remover la clase 'active-btn' de todos los botones
      filterButtons.forEach(function (btn) {
        btn.classList.remove("active-btn");
      });

      // Agregar la clase 'active-btn' al botón clickeado
      event.target.classList.add("active-btn");
      filterAnimals(category);
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addListeners);
    } else {
      addListeners();
    }
  })();
