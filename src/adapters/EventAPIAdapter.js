// adapters/EventAPIAdapter.js

import apiClient from "../frameworks/apiClient.js";
import { Event } from "../entities/Events.js";

export class EventAPIAdapter {
  /**
   * Obtiene todos los eventos desde el backend
   * (GET /events)
   */
  static async getAllEvents() {
    try {
      const response = await apiClient.get("/events");
      // response.data debería ser un array de eventos
      return response.data.map((rawEvent) => this.transformToEntity(rawEvent));
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }
  }

  /**
   * Crea un nuevo evento en el backend
   * (POST /events)
   */
  static async createEvent(formData) {
    try {
      // 1) Transformar los datos del formulario al payload que espera el backend
      const payload = this.transformToBackend(formData);

      // OPCIONAL: Imprime en consola lo que estás enviando al backend, para depurar
      console.log("Payload que se envía a /events:", payload);

      // 2) Hacer la petición POST
      const response = await apiClient.post("/events", payload);
      console.log("Payload 2 que se envía a /events:", response);

      // 3) Devolver la respuesta convertida a la entidad Event (opcional)
      return this.transformToEntity(response.data);
    } catch (error) {
      // Aquí puedes imprimir con más detalle el error
      console.error("Error al crear el evento:", error);

      // Si el backend mandó un objeto en data, imprímelo en formato legible
      if (error?.response?.data) {
        console.error("Detalle del error (error.response.data):", JSON.stringify(error.response.data, null, 2));
      }

      throw error;
    }
  }

  /**
   * Convierte el objeto crudo del backend (rawEvent)
   * a nuestra entidad interna "Event"
   */
  static transformToEntity(rawEvent) {
    return new Event({
      id: rawEvent.eventId,
      name: rawEvent.eventName,
      title: rawEvent.eventTitle,
      startDate: rawEvent.eventStart,
      endDate: rawEvent.eventEnd,
      // Suponiendo que eventStatusId=1 significa "activo"
      active: rawEvent.eventStatusId === 1,
      recurrent: rawEvent.isRecurrent || false,
      // Ajusta más propiedades si es necesario
    });
  }

  /**
   * Toma los datos de formData (del formulario) y
   * los convierte al formato que exige el backend para crear un evento
   */
  static transformToBackend(formData) {
    // Asegurarnos de que userId, day, month, year sean números
    const userId = formData.userId;
    const day = parseInt(formData.day, 10) || 1;
    const month = parseInt(formData.month, 10) || 1;
    const year = parseInt(formData.year, 10) || 2025;

    // Generar fecha de inicio y fin (formato ISO8601)
    // Por ejemplo, un evento que empieza a las 10:00 y acaba a las 11:00
    const startDate = new Date(year, month - 1, day, 10, 0, 0).toISOString();
    const endDate = new Date(year, month - 1, day, 11, 0, 0).toISOString();

    // Determinar el status ID según si está activo o no (1=Activo, 2=Inactivo, etc.)
    const eventStatusId = formData.isActive ? 1 : 2;

    // Retornamos el objeto tal y como el backend lo espera
    return {
      userId: userId,
      companyId: "2",                  // Valor fijo por ahora
      eventName: formData.internalName || "No internal name",
      eventTypeId: "2",               // Valor fijo por ahora
      eventDescription: formData.description || "",
      addressId: "1",                 // Asegúrate de que exista un address con ID=1
      eventStart: startDate,
      eventEnd: endDate,
      eventSaleStart: startDate,
      eventSaleEnd: endDate,
      eventTitle: formData.eventName || "No public name",
      eventSubtitle: "im a Subtitle",
      eventStatusId: eventStatusId || "0",
      isRecurrent: true,
    };
  }
}
