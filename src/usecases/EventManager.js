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
        // Tu lógica para pintar tarjetas de eventos, etc.
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
