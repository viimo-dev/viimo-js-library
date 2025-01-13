import { EventAPIAdapter } from "../../adapters/EventAPIAdapter.js";
import { EventList } from "../../components/events/EventList.js";

export class EventCalendar {
  static async renderEvents(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
      }

      // Obtener eventos del backend
      const events = await EventAPIAdapter.getAllEvents();

      // Crear instancia de EventList
      const eventList = new EventList("January 2025");

      // Añadir cada evento al EventList
      events.forEach((event) => {
        eventList.addEvent(event);
      });

      // Renderizar la lista de eventos en el DOM
      container.innerHTML = ""; // Limpiar contenedor antes de añadir
      container.appendChild(eventList.getElement());
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }
}
