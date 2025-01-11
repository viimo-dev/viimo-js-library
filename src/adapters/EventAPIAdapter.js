import apiClient from "../frameworks/apiClient.js";
import { Event } from "../entities/Events.js";

export class EventAPIAdapter {
  // Obtener todos los eventos
  static async getAllEvents() {
    try {
      const response = await apiClient.get("/events");
      return response.data.map((rawEvent) => this.transformToEntity(rawEvent));
    } catch (error) {
      console.error("Error al obtener eventos:", error.message || error);
      throw error;
    }
  }

  static transformToEntity(rawData) {
    console.log("Datos crudos recibidos:", rawData); // Verifica los datos que llegan
  
    return new Event({
      id: rawData.eventId || null, // ID del evento
      name: rawData.eventName || "Internal name no disponible", // Nombre interno
      title: rawData.eventTitle || "Public name no disponible", // Título público
      startDate: rawData.eventStart || null, // Fecha de inicio
      endDate: rawData.eventEnd || null, // Fecha de fin
      active: rawData.eventStatusId === "1", // Si el status del evento indica activo (ajusta según la lógica real)
      recurrent: rawData.isRecurrent || false, // Si es recurrente
      address: rawData.Address?.addressName || "Ubicación no disponible", // Nombre del lugar
      addressLine: rawData.Address?.addressLine || "Dirección no disponible", // Dirección completa
      latitude: rawData.Address?.latitude || null, // Latitud
      longitude: rawData.Address?.longitude || null, // Longitud
      companyName: rawData.Company?.companyName || "Empresa no disponible", // Nombre de la empresa
      eventType: rawData.EventType?.eventTypeName || "Tipo no disponible", // Tipo de evento
      eventStatus: rawData.EventStatus?.eventStatusName || "Estado no disponible", // Estado del evento
      createdAt: rawData.createdAt || null, // Fecha de creación
      updatedAt: rawData.updatedAt || null, // Fecha de actualización
    });
  }
  
}
