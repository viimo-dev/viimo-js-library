// usecases/EventManager.js

import { EventAPIAdapter } from "../adapters/EventAPIAdapter.js";
import { EventFormComponent } from "../components/dev/EventFormComponent.js";
import { EventCardComponent } from "../components/dev/EventCardComponent.js";
import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

export class EventManager {
  /**
   * Renderiza la lista (grid) de eventos en el contenedor indicado
   */
  static async renderEventsInGrid(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
      }

      // 1) Obtener la lista de eventos desde el backend
      const events = await EventAPIAdapter.getAllEvents();

      // 2) Limpiar el contenedor antes de pintar
      container.innerHTML = "";

      // 3) Crear una tarjeta (EventCardComponent) por cada evento
      events.forEach((event) => {
        const eventCard = new EventCardComponent(event);

        // 4) Asignar la acción de "Eliminar" a cada tarjeta
        eventCard.setDeleteAction(async (eventId) => {
          try {
            // Llamar al adapter para eliminar
            await EventAPIAdapter.deleteEvent(eventId);
            console.log(`Evento con ID ${eventId} eliminado correctamente`);

            // Recargar la lista de eventos
            await this.renderEventsInGrid(containerId);
          } catch (error) {
            console.error(`Error al eliminar el evento con ID ${eventId}:`, error);
            // Muestra un mensaje en la tarjeta
            eventCard.setErrorText("Error al eliminar");
          }
        });

        container.appendChild(eventCard.getElement());
      });

    } catch (error) {
      console.error("Error al renderizar eventos:", error);
    }
  }

  /**
   * Renderiza el formulario de creación de eventos en el contenedor indicado
   */
  static async renderEventForm(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
      }

      // 1) Obtener usuarios para rellenar el select
      const users = await UserAPIAdapter.getAllUsers();

      // 2) Crear la instancia del formulario
      const eventForm = new EventFormComponent(users, async (formData) => {
        try {
          // Crear el evento
          const newEvent = await EventAPIAdapter.createEvent(formData);
          console.log("Evento creado con éxito:", newEvent);
          alert("Evento creado correctamente.");

          // 3) Recargar la lista de eventos
          await this.renderEventsInGrid("results-events");
        } catch (error) {
          console.error("Error al crear el evento:", error.message || error);
          alert("Hubo un error al crear el evento.");
        }
      });

      // Limpiar e inyectar el formulario
      container.innerHTML = "";
      container.appendChild(eventForm.getElement());
    } catch (error) {
      console.error("Error al renderizar el formulario:", error);
    }
  }
}
