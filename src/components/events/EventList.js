import { EventListCard } from "./EventListCard.js";

export class EventList {
  constructor(title = "Events") {
    this.title = title; // El título, por ejemplo, "January 2025"
    this.element = this.createElement();
  }

  // Crear el componente del EventList
  createElement() {
    const template = document.createElement("template");
    template.innerHTML = `
      <div id="event-results" class="events-results">
        <div id="events-result-container" class="event-result-container">
          <div class="events-results-header">
            <h3>${this.title}</h3>
          </div>
          <div class="padding-bottom"></div>
          <div id="events-list" class="events-list"></div>
          <div class="padding-bottom"></div>
        </div>
      </div>
    `.trim();
    return template.content.firstChild;
  }

  // Método para añadir un evento como card al grid
  addEvent(event) {
    try {
      const eventsList = this.element.querySelector("#events-list");
      if (!eventsList) {
        throw new Error("No se encontró el contenedor de la lista de eventos.");
      }

      // Crear un EventListCard para el evento
      const eventCard = new EventListCard(event);

      // Añadir la tarjeta al grid
      eventsList.appendChild(eventCard.getElement());
    } catch (error) {
      console.error("Error al añadir un evento al grid:", error.message || error);
    }
  }

  // Obtener el elemento HTML del componente
  getElement() {
    return this.element;
  }
}
