// usecases/EventManager.js

import { EventAPIAdapter } from "../adapters/EventAPIAdapter.js";
import { EventFormComponent } from "../components/dev/EventFormComponent.js";
import { EventCardComponent } from "../components/dev/EventCardComponent.js"; // <-- Aquí importas tu componente de tarjeta
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
        // Instanciar la tarjeta
        const eventCard = new EventCardComponent(event);
        // Insertarla en el contenedor
        container.appendChild(eventCard.getElement());
      });

    } catch (error) {
      console.error("Error al renderizar eventos:", error);
    }
  }

  /**
   * Renderiza el formulario de creación/edición de eventos en el contenedor indicado
   */
  static async renderEventForm(containerId) {
    try {
      const container = document.getElementById(containerId);
      if (!container) {
        throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
      }

      // 1) Obtener usuarios para rellenar el select de "usuario" en el formulario
      const users = await UserAPIAdapter.getAllUsers();

      // 2) Crear la instancia del formulario de eventos
      const eventForm = new EventFormComponent(users, async (formData) => {
        try {
          // 3) Llamar a createEvent en el adapter
          const newEvent = await EventAPIAdapter.createEvent(formData);
          console.log("Evento creado con éxito:", newEvent);

          alert("Evento creado correctamente.");

          // 4) Recargar la lista de eventos (asumiendo que el ID del contenedor de eventos es "results-events")
          await this.renderEventsInGrid("results-events");

        } catch (error) {
          console.error("Error al crear el evento:", error.message || error);
          alert("Hubo un error al crear el evento.");
        }
      });

      // 3) Limpiar el contenedor antes de renderizar
      container.innerHTML = "";
      // 4) Insertar el formulario en la página
      container.appendChild(eventForm.getElement());

    } catch (error) {
      console.error("Error al renderizar el formulario:", error);
    }
  }
}
