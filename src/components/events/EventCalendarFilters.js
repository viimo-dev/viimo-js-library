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
        <form id="events-filters-container" class="events-header-filters">
          <div class="filter-group">
            <label>
              <input type="radio" name="event-type" value="all" checked>
              All events
            </label>
            <label>
              <input type="radio" name="event-type" value="upcoming">
              Only upcoming
            </label>
          </div>
          <div class="filter-group">
            <label>
              <input type="radio" name="time-frame" value="month" checked>
              Month
            </label>
            <label>
              <input type="radio" name="time-frame" value="year">
              Year
            </label>
          </div>
          <div class="filters-separator"></div>
          <div class="events-name-filter">
            <input 
              type="text" 
              placeholder="Filter by name" 
              id="filter-by-name" 
              class="name-filter-input"
            />
          </div>
        </form>
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
  