export class EventCardComponent {
    constructor(eventData) {
      this.eventData = eventData;
      this.element = this.createElement();
    }
  
    // Crear el componente del Event Card
    createElement() {
      const template = document.createElement("template");
  
      // Formatear la fecha
      const formattedDate = this.formatDate(this.eventData.startDate);
  
      template.innerHTML = `
        <div class="dev-card">
          <div class="dev-card-info">
            <div data-field="name" class="dev-event-data">${this.eventData.name || "Internal name no disponible"}</div>
            <div class="filters-separator"></div>
            <div data-field="title" class="dev-event-data">${this.eventData.title || "Public name no disponible"}</div>
            <div class="filters-separator"></div>
            <div class="dev-event-data">Fecha: ${formattedDate || "Fecha no disponible"}</div>
            <div class="filters-separator"></div>
            <div data-field="active" class="dev-event-data">${this.eventData.active ? "Activo" : "Inactivo"}</div>
            <div class="filters-separator"></div>
            <div data-field="recurrent" class="dev-event-data">${this.eventData.recurrent ? "Recurrente" : "No recurrente"}</div>
          </div>
          <article class="dev-delete">
            <div class="paragraph">Eliminar</div>
            <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/6781491bf42c0aa629f3ceb3_delete.svg" loading="lazy" alt="Eliminar evento">
          </article>
        </div>
      `.trim();
      return template.content.firstChild;
    }
  
    // Método para formatear la fecha
    formatDate(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options).toUpperCase();
    }
  
    // Método para establecer un mensaje de error en el botón de eliminar
    setErrorText(text) {
      const deleteButton = this.element.querySelector(".dev-delete");
      const paragraph = deleteButton.querySelector(".paragraph");
      if (paragraph) {
        paragraph.innerText = text;
        deleteButton.style.pointerEvents = "none"; // Desactiva el botón
        deleteButton.style.opacity = "0.5"; // Opcional: cambia el estilo para indicar que está desactivado
      }
    }
  
    // Método para asignar una acción de eliminación
    setDeleteAction(action) {
      const deleteButton = this.element.querySelector(".dev-delete");
      if (deleteButton) {
        deleteButton.addEventListener("click", () => action(this.eventData.id));
      }
    }
  
    // Obtener el elemento HTML del componente
    getElement() {
      return this.element;
    }
  }
  