export class EventCalendarFilters {
    constructor({ onFilterChange }) {
      this.filters = {
        upcomingOnly: false, // "All events" o "Only upcoming"
        temporalidad: "Month", // "Month" o "Year"
        searchQuery: "", // Texto del input de búsqueda
      };
      this.onFilterChange = onFilterChange;
  
      // Crear el elemento y validar que se cree correctamente
      this.element = this.createElement();
      if (!this.element || !(this.element instanceof HTMLElement)) {
        throw new Error("Error al crear el elemento: template está vacío o malformado.");
      }
  
      // Añadir event listeners
      this.addEventListeners();
    }
  
    createElement() {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="form w-form">
          <form id="events-filters" class="events-header-filters">
            <label class="filtro w-radio">
              <div class="w-form-formradioinput radio-buton w-radio-input"></div>
              <input type="radio" name="upcoming" value="all" checked>
              <span>All events</span>
            </label>
            <label class="filtro w-radio">
              <div class="w-form-formradioinput radio-buton w-radio-input"></div>
              <input type="radio" name="upcoming" value="upcoming">
              <span>Only upcoming</span>
            </label>
            <div class="filters-separator"></div>
            <label class="filtro w-radio">
              <div class="w-form-formradioinput radio-buton w-radio-input"></div>
              <input type="radio" name="temporalidad" value="Month" checked>
              <span>Month</span>
            </label>
            <label class="filtro w-radio">
              <div class="w-form-formradioinput radio-buton w-radio-input"></div>
              <input type="radio" name="temporalidad" value="Year">
              <span>Year</span>
            </label>
            <div class="filters-separator"></div>
            <div class="events-name-filter">
              <input class="events-name-filter-field" placeholder="Filter by name" type="text">
            </div>
          </form>
        </div>
      `.trim(); // Asegurarnos de eliminar espacios innecesarios
  
      const element = template.content.firstChild;
  
      if (!element || !(element instanceof HTMLElement)) {
        console.error("El template no generó un elemento válido.");
      }
  
      return element;
    }
  
    addEventListeners() {
      const form = this.element.querySelector("#events-filters");
      if (!form) {
        throw new Error("No se encontró el formulario #events-filters en el elemento.");
      }
  
      form.addEventListener("change", () => {
        const formData = new FormData(form);
        this.filters.upcomingOnly = formData.get("upcoming") === "upcoming";
        this.filters.temporalidad = formData.get("temporalidad");
        this.onFilterChange();
      });
  
      const searchInput = this.element.querySelector(".events-name-filter-field");
      if (!searchInput) {
        throw new Error("No se encontró el input .events-name-filter-field en el elemento.");
      }
  
      searchInput.addEventListener("input", (event) => {
        this.filters.searchQuery = event.target.value;
        this.onFilterChange();
      });
    }
  
    getFilters() {
      return this.filters;
    }
  
    getElement() {
      return this.element;
    }
  }
  
  