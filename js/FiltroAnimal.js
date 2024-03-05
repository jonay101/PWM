
  document.addEventListener("DOMContentLoaded", function () {
    // Obtener los botones de filtro
    var filterButtons = document.querySelectorAll(".filtro-catalogo");

    // Agregar un event listener a cada botón de filtro
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        // Remover la clase 'active-btn' de todos los botones
        filterButtons.forEach(function (btn) {
          btn.classList.remove("active-btn");
        });

        // Agregar la clase 'active-btn' al botón clickeado
        button.classList.add("active-btn");

        // Filtrar animales según la categoría del botón clickeado
        var category = button.id;
        filterAnimals(category);
      });
    });

    // Función para filtrar animales según la categoría
    function filterAnimals(category) {
      var animals = document.querySelectorAll(".Animal");

      animals.forEach(function (animal) {
        var animalCategories = animal.classList;
        if (category === "All" || animalCategories.contains(category)) {
          // Mostrar el animal si la categoría es "All" o coincide con la categoría del botón
          animal.style.display = "block";
        } else {
          // Ocultar el animal si no coincide con la categoría del botón
          animal.style.display = "none";
        }
      });
    }
  });
