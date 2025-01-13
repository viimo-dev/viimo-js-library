export class EventListCard {
    constructor(eventData) {
      this.eventData = eventData;
      this.element = this.createElement();
    }
  
    // Crear el componente de la card
    createElement() {
      const placeholderImage =
        "https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6780046890aebffffeff9458_products-bg4.png";
  
      const formattedDate = this.formatDate(this.eventData.startDate);
  
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="event-card">
          <div class="event-card-top">
            <div class="event-card-date">
              <div class="text-small caps">${formattedDate || "DATE N/A"}</div>
            </div>
            <img 
              src="${this.eventData.image || placeholderImage}" 
              alt="Event Image" 
              class="event-card-img" 
            >
            <div class="event-card-topoverlay"></div>
            <a href="#" class="event-card-options w-inline-block">
              <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67800f4b9499e2f65462cdee_event-card-options-icon.svg" alt="Options">
            </a>
          </div>
          <div class="event-card-bottom">
            <div class="paragraph">${this.eventData.name || "Event Title N/A"}</div>
            <div class="event-card-icons">
              <img 
                src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67800b972ce7e761a6dd1414_toogle.png" 
                alt="Toggle Icon"
              >
              ${
                this.eventData.recurrent
                  ? `<img 
                      src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67800bf0cefebd4c58d08e27_calendar-check.svg" 
                      alt="Recurrent Icon"
                    >`
                  : ""
              }
            </div>
          </div>
        </div>
      `.trim();
  
      return template.content.firstChild;
    }
  
    // Método para formatear la fecha
    formatDate(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      const options = { weekday: "short", day: "2-digit", month: "short" };
      return date.toLocaleDateString("en-US", options).toUpperCase();
    }
  
    // Obtener el elemento HTML del componente
    getElement() {
      return this.element;
    }
  }
  