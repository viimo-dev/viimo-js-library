// adapters/EventAPIAdapter.js

import apiClient from "../frameworks/apiClient.js";
import { Event } from "../entities/Events.js";

export class EventAPIAdapter {
  /**
   * Obtiene todos los eventos desde el backend (GET /events)
   */
  static async getAllEvents() {
    try {
      const response = await apiClient.get("/events");
      return response.data.map((rawEvent) => this.transformToEntity(rawEvent));
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo evento en el backend (POST /events)
   */
  static async createEvent(formData) {
    try {
      const payload = this.transformToBackend(formData);
      console.log("Payload que se envía a /events:", payload);

      const response = await apiClient.post("/events", payload);
      console.log("Respuesta de la API en createEvent:", response);

      return this.transformToEntity(response.data);
    } catch (error) {
      console.error("Error al crear el evento:", error);
      if (error?.response?.data) {
        console.error(
          "Detalle del error (error.response.data):",
          JSON.stringify(error.response.data, null, 2)
        );
      }
      throw error;
    }
  }

  /**
   * Elimina un evento por su ID (DELETE /events/:id)
   */
  static async deleteEvent(eventId) {
    try {
      console.log(`Intentando eliminar evento con ID ${eventId}`);
      // Petición DELETE al endpoint
      const response = await apiClient.delete(`/events/${eventId}`);
      console.log(`Evento con ID ${eventId} eliminado correctamente`, response.data);

      // Puedes devolver lo que tu backend responda, o un simple "OK"
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar el evento con ID ${eventId}:`, error);
      if (error?.response?.data) {
        console.error(
          "Detalle del error (error.response.data):",
          JSON.stringify(error.response.data, null, 2)
        );
      }
      throw error;
    }
  }

  /**
   * Convierte el objeto crudo del backend (rawEvent) a nuestra entidad interna "Event"
   */
  static transformToEntity(rawEvent) {
    return new Event({
      id: rawEvent.eventId,
      name: rawEvent.eventName,
      title: rawEvent.eventTitle,
      startDate: rawEvent.eventStart,
      endDate: rawEvent.eventEnd,
      active: rawEvent.eventStatusId === 1,
      recurrent: rawEvent.isRecurrent || false,
    });
  }

  /**
   * Toma los datos de formData (del formulario) y los convierte al formato
   * que exige el backend para crear un evento (POST /events).
   */
  static transformToBackend(formData) {
    const userId = formData.userId;
    const day = parseInt(formData.day, 10) || 1;
    const month = parseInt(formData.month, 10) || 1;
    const year = parseInt(formData.year, 10) || 2025;

    const startDate = new Date(year, month - 1, day, 10, 0, 0).toISOString();
    const endDate = new Date(year, month - 1, day, 11, 0, 0).toISOString();

    const eventStatusId = formData.isActive ? 1 : 2;

    return {
      userId: userId,
      companyId: "2",
      eventName: formData.internalName || "No internal name",
      eventTypeId: "2",
      eventDescription: formData.description || "",
      addressId: "1",
      eventStart: startDate,
      eventEnd: endDate,
      eventSaleStart: startDate,
      eventSaleEnd: endDate,
      eventTitle: formData.eventName || "No public name",
      eventSubtitle: "im a Subtitle",
      eventStatusId: eventStatusId || "0",
      isRecurrent: true
    };
  }
}
