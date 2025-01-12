// adapters/EventAPIAdapter.js
import apiClient from "../frameworks/apiClient.js";
import { Event } from "../entities/Events.js";

export class EventAPIAdapter {
  static async getAllEvents() {
    try {
      const response = await apiClient.get("/events");
      return response.data.map((rawEvent) => this.transformToEntity(rawEvent));
    } catch (error) {
      console.error("Error al obtener eventos:", error);
      throw error;
    }
  }

  // Nuevo método para crear un evento
  static async createEvent(formData) {
    try {
      // 1) Transformar el formData en el payload que espera el backend
      const payload = this.transformToBackend(formData);

      // 2) Hacer el POST
      const response = await apiClient.post("/events", payload);

      // 3) Devolver (opcionalmente, parseado a entidad)
      return this.transformToEntity(response.data);
    } catch (error) {
      console.error("Error al crear el evento:", error);
      throw error;
    }
  }

  // Transforma la respuesta del backend a tu entidad
  static transformToEntity(rawEvent) {
    return new Event({
      id: rawEvent.eventId,
      name: rawEvent.eventName,
      title: rawEvent.eventTitle,
      startDate: rawEvent.eventStart,
      endDate: rawEvent.eventEnd,
      active: rawEvent.eventStatusId === 1,
      recurrent: rawEvent.isRecurrent || false,
      // etc. Ajusta según tu clase Event
    });
  }

  // Transforma formData a lo que pide el backend
  static transformToBackend(formData) {
    // parsear a int
    const userId = parseInt(formData.userId, 10) || 1;  
    const day = parseInt(formData.day, 10) || 1;
    const month = parseInt(formData.month, 10) || 1;
    const year = parseInt(formData.year, 10) || 2025;

    // Crear fecha start y end
    const startDate = new Date(year, month - 1, day, 10, 0, 0).toISOString();
    const endDate = new Date(year, month - 1, day, 11, 0, 0).toISOString();

    // Por ejemplo, si tu backend usa 1 para "Activo", 2 para "Inactivo"
    const eventStatusId = formData.isActive ? 1 : 2;

    return {
      // Campos que el backend requiere (valores fijos o calculados)
      userId: userId,
      companyId: 1,                // valor por defecto
      eventName: formData.internalName || "No internal name",
      eventTypeId: 1,             // valor por defecto
      eventDescription: formData.description || "",
      addresId: 1,                // valor por defecto (ojo: la API dice addressId)
      eventStart: startDate,
      eventEnd: endDate,
      eventSaleStart: startDate,  // EJ: la venta inicia al mismo tiempo
      eventSaleEnd: endDate,
      eventTitle: formData.eventName || "No public name",
      eventSubtitle: formData.image || "No image",
      eventStatusId: eventStatusId,
      eventSaleIsOpen: formData.isActive,
      isRecurrent: formData.isRecurrent,
    };
  }
}
