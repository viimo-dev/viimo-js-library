import { EventAPIAdapter } from "../adapters/EventAPIAdapter.js";
import { EventCardComponent } from "../components/dev/EventCardComponent.js";

export class EventManager {
  static async renderEventsInGrid(containerId) {
    try {
      const events = await EventAPIAdapter.getAllEvents();
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      container.innerHTML = ""; // Limpia el grid antes de renderizar

      events.forEach((event) => {
        const eventCard = new EventCardComponent(event);

        // Opción para eliminar evento
        eventCard.setDeleteAction(async (eventId) => {
          try {
            console.log(`Intentando eliminar evento con ID ${eventId}`);
            await EventAPIAdapter.deleteEvent(eventId);
            console.log(`Evento con ID ${eventId} eliminado correctamente.`);
            await this.renderEventsInGrid(containerId); // Recargar el grid
          } catch (error) {
            if (error.status === 404) {
              console.warn(`El evento con ID ${eventId} no se pudo eliminar del backend`);
              eventCard.setErrorText("No se puede eliminar del backend. API devuelve 404.");
            } else {
              console.error(`Error al eliminar evento con ID ${eventId}:`, error.message);
              eventCard.setErrorText(`Error: ${error.message}`);
            }
          }
        });

        container.appendChild(eventCard.getElement());
      });
    } catch (error) {
      console.error("Error al renderizar eventos en el grid:", error.message || error);
    }
  }
}
