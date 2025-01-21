export class EventCalendarFilters {
  constructor({ onFilterChange }) {
    this.filters = {
      upcomingOnly: false, // "All events" o "Only upcoming"
      temporalidad: "Month", // "Month" o "Year"
      searchQuery: "", // Texto del input de búsqueda
    };
    this.onFilterChange = onFilterChange;
    this.onTemporalidadChange = null; // Callback para cambios de "temporalidad"
    this.element = this.createElement();
    this.addEventListeners();
  }

  createElement() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div class="form w-form">
        <form id="events-filters" class="events-header-filters">
          <label id="all-events" class="filtro w-radio">
            <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input w--redirected-checked"></div>
            <input type="radio" name="Upcoming" id="filter-upcoming" data-name="Upcoming" style="opacity:0;position:absolute;z-index:-1" checked>
            <span class="paragraph w-form-label" for="filter-upcoming">All events</span>
          </label>
          <label id="upcoming-events" class="filtro w-radio">
            <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input"></div>
            <input type="radio" name="Upcoming" id="radio-3" data-name="Upcoming" style="opacity:0;position:absolute;z-index:-1">
            <span class="paragraph w-form-label" for="radio-3">Only upcoming</span>
          </label>
          <div class="filters-separator"></div>
          <label id="month-events" class="filtro w-radio">
            <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input w--redirected-checked"></div>
            <input type="radio" name="Temporalidad" id="filter-month" data-name="Temporalidad" style="opacity:0;position:absolute;z-index:-1" checked>
            <span class="paragraph w-form-label" for="filter-month">Month</span>
          </label>
          <label id="events-year" class="filtro w-radio">
            <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input"></div>
            <input type="radio" name="Temporalidad" id="radio-2" data-name="Temporalidad" style="opacity:0;position:absolute;z-index:-1">
            <span class="paragraph w-form-label" for="radio-2">Year</span>
          </label>
          <div class="filters-separator"></div>
          <div class="events-name-filter">
            <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/677edba3ffe29468b361c65c_Vector.png" alt="">
            <input class="events-name-filter-field w-input" maxlength="256" name="field-2" data-name="Field 2" placeholder="Filter by name" type="text" id="field-2">
          </div>
        </form>
      </div>
    `.trim();
    return template.content.firstChild;
  }

  addEventListeners() {
    const form = this.element.querySelector("#events-filters");

    // Listener para cambios en los filtros
    form.addEventListener("change", () => {
      const formData = new FormData(form);
      this.filters.upcomingOnly = formData.get("Upcoming") === "Radio";
      const newTemporalidad = formData.get("Temporalidad");
      if (newTemporalidad !== this.filters.temporalidad) {
        this.filters.temporalidad = newTemporalidad;
        if (this.onTemporalidadChange) {
          this.onTemporalidadChange(this.filters.temporalidad);
        }
      }
      this.onFilterChange();
    });

    // Listener para el input de búsqueda
    const searchInput = this.element.querySelector(".events-name-filter-field");
    searchInput.addEventListener("input", (event) => {
      this.filters.searchQuery = event.target.value;
      this.onFilterChange();
    });
  }

  setOnTemporalidadChange(callback) {
    this.onTemporalidadChange = callback;
  }

  getFilters() {
    return this.filters;
  }

  getElement() {
    return this.element;
  }
}
