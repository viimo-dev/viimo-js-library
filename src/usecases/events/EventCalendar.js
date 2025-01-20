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
        onMonthChange: (newMonth, newYear) => {
          // Actualizar la lista de eventos cuando cambie el mes en Calendy
          EventCalendar.updateEventList(newMonth, newYear, events, eventsContainer);
        },
      });

      // Renderizar el mes actual en EventList
      EventCalendar.updateEventList(today.getMonth(), today.getFullYear(), events, eventsContainer);

      // Renderizar Calendy en el contenedor
      calendyContainer.innerHTML = "";
      calendyContainer.appendChild(calendy.getElement());
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }

  static updateEventList(month, year, allEvents, eventsContainer) {
    // Filtrar eventos para el mes y año dados
    const filteredEvents = allEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });

    // Crear instancia de EventList
    const eventList = new EventList(`${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month))} ${year}`);

    // Añadir eventos filtrados
    filteredEvents.forEach(event => eventList.addEvent(event));

    // Renderizar EventList en el contenedor
    eventsContainer.innerHTML = "";
    eventsContainer.appendChild(eventList.getElement());
  }
}
