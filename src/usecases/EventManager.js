// usecases/EventManager.js
import { EventAPIAdapter } from "../adapters/EventAPIAdapter.js";
import { EventFormComponent } from "../components/dev/EventFormComponent.js";
import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

export class EventManager {
  static async renderEventsInGrid(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      const events = await EventAPIAdapter.getAllEvents();
      container.innerHTML = "";

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
              console.error(`Error al eliminar evento con ID ${eventId}:, error.message`);
              eventCard.setErrorText(`Error: ${error.message}`);
            }
          }
        });


        container.appendChild(eventCard.getElement());
      });
    } catch (error) {
      console.error("Error al renderizar eventos:", error);
    }
  }

  static async renderEventForm(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      // Obtener usuarios para el select
      const users = await UserAPIAdapter.getAllUsers();

      // Crear el formulario
      const eventForm = new EventFormComponent(users, async (formData) => {
        try {
          const newEvent = await EventAPIAdapter.createEvent(formData);
          console.log("Evento creado con éxito:", newEvent);

          alert("Evento creado correctamente.");
          // Recargar la lista
          await this.renderEventsInGrid("results-events");
        } catch (error) {
          console.error("Error al crear el evento:", error.message || error);
          alert("Hubo un error al crear el evento.");
        }
      });

      container.innerHTML = "";
      container.appendChild(eventForm.getElement());
    } catch (error) {
      console.error("Error al renderizar el formulario:", error);
    }
  }
}
