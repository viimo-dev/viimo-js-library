import { EventAPIAdapter } from "../../adapters/EventAPIAdapter.js";
import { EventList } from "../../components/events/EventList.js";
import { Calendy } from "../../components/events/EventCalendy.js";

export class EventCalendar {
  static async renderEvents(eventsContainerId, calendyContainerID) {
    try {
      const eventsContainer = document.getElementById(eventsContainerId);
      const calendyContainer = document.getElementById(calendyContainerID);
      if (!eventsContainer) {
        throw new Error(`No se encontró el contenedor con ID: ${eventsContainerId}`);
      }
      if (!calendyContainer) {
        throw new Error(`No se encontró el contenedor con ID: ${calendyContainerID}`);
      }
      
      // Obtener eventos del backend
      const events = await EventAPIAdapter.getAllEvents();

      // Crear instancia de Calendy
      const today = new Date();
      const calendy = new Calendy({
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        events: events.map(event => ({
          date: event.startDate.split("T")[0], // Asegúrate de que startDate está en formato ISO
          count: 1, // Asume un evento por día inicialmente, ajusta según la lógica
        })),
      });

      // Crear instancia de EventList
      const eventList = new EventList(`${calendy.getMonthName()} ${calendy.currentYear}`);

      // Añadir cada evento al EventList
      events.forEach((event) => {
        eventList.addEvent(event);
      });

      // Renderizar Calendy y EventList en el DOM
      calendyContainer.innerHTML = ""; // Limpiar contenedor antes de añadir
      eventsContainer.innerHTML = ""; // Limpiar contenedor antes de añadir
      calendyContainer.appendChild(calendy.getElement());
      eventsContainer.appendChild(eventList.getElement());
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }
}
