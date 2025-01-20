export class EventCalendarFilters {
    constructor({ onFilterChange }) {
      this.onFilterChange = onFilterChange;
      this.filters = {
        showUpcoming: false, // false: All events, true: Only upcoming
        viewByMonth: true,   // true: By month, false: By year
        searchQuery: "",     // Cadena de búsqueda para el filtro por nombre
      };
      this.element = this.createElement();
    }
  
    createElement() {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="form w-form">
          <form id="events-filters" name="events-filters" class="events-header-filters">
            <label id="all-events" class="filtro w-radio">
              <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input w--redirected-checked"></div>
              <input type="radio" name="event-type" value="all" style="opacity:0;position:absolute;z-index:-1" checked>
              <span class="paragraph w-form-label">All events</span>
            </label>
            <label id="upcoming-events" class="filtro w-radio">
              <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input"></div>
              <input type="radio" name="event-type" value="upcoming" style="opacity:0;position:absolute;z-index:-1">
              <span class="paragraph w-form-label">Only upcoming</span>
            </label>
            <div class="filters-separator"></div>
            <label id="month-events" class="filtro w-radio">
              <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input w--redirected-checked"></div>
              <input type="radio" name="time-frame" value="month" style="opacity:0;position:absolute;z-index:-1" checked>
              <span class="paragraph w-form-label">Month</span>
            </label>
            <label id="events-year" class="filtro w-radio">
              <div class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-buton w-radio-input"></div>
              <input type="radio" name="time-frame" value="year" style="opacity:0;position:absolute;z-index:-1">
              <span class="paragraph w-form-label">Year</span>
            </label>
            <div class="filters-separator"></div>
            <div class="events-name-filter">
              <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/677edba3ffe29468b361c65c_Vector.png" alt="">
              <input 
                type="text" 
                placeholder="Filter by name" 
                id="filter-by-name" 
                class="events-name-filter-field w-input"
              />
            </div>
          </form>
        </div>
      `.trim();
  
      const element = template.content.firstChild;
  
      // Añadir listeners a los inputs
      element.querySelectorAll("input[type='radio']").forEach((input) => {
        input.addEventListener("change", (e) => this.handleFilterChange(e));
      });
  
      const searchInput = element.querySelector("#filter-by-name");
      searchInput.addEventListener("input", (e) => this.handleSearchQueryChange(e));
  
      return element;
    }
  
    handleFilterChange(event) {
      const { name, value } = event.target;
  
      if (name === "event-type") {
        this.filters.showUpcoming = value === "upcoming";
      } else if (name === "time-frame") {
        this.filters.viewByMonth = value === "month";
      }
  
      this.emitFilterChange();
    }
  
    handleSearchQueryChange(event) {
      this.filters.searchQuery = event.target.value.trim().toLowerCase();
      this.emitFilterChange();
    }
  
    emitFilterChange() {
      if (this.onFilterChange) {
        this.onFilterChange(this.filters);
      }
    }
  
    getElement() {
      return this.element;
    }
  }
  