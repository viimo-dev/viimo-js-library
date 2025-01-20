import { EventAPIAdapter } from "../../adapters/EventAPIAdapter.js";
import { EventList } from "../../components/events/EventList.js";
import { Calendy } from "../../components/events/EventCalendy.js";
import { EventCalendarFilters } from "../../components/events/EventCalendarFilters.js";

export class EventCalendar {
  static async renderEvents(eventsContainerId, calendyContainerId, filtersContainerId) {
    try {
      const eventsContainer = document.getElementById(eventsContainerId);
      const calendyContainer = document.getElementById(calendyContainerId);
      const filtersContainer = document.getElementById(filtersContainerId);

      if (!eventsContainer || !calendyContainer || !filtersContainer) {
        throw new Error("Uno o más contenedores no se encontraron en el DOM.");
      }

      // Obtener eventos del backend
      const events = await EventAPIAdapter.getAllEvents();

      // Crear y renderizar los filtros
      const filters = new EventCalendarFilters({
        onFilterChange: () => {
          EventCalendar.updateEventList(
            calendy.currentMonth,
            calendy.currentYear,
            events,
            eventsContainer,
            filters.getFilters()
          );
        },
      });

      filtersContainer.innerHTML = ""; // Limpiar el contenedor de filtros
      filtersContainer.appendChild(filters.getElement());

      // Crear y renderizar Calendy
      const today = new Date();
      const calendy = new Calendy({
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        events: events.map((event) => ({
          date: event.startDate.split("T")[0],
          count: 1,
        })),
        onMonthChange: (newMonth, newYear) => {
          EventCalendar.updateEventList(newMonth, newYear, events, eventsContainer, filters.getFilters());
        },
      });

      calendyContainer.innerHTML = ""; // Limpiar el contenedor de calendy
      calendyContainer.appendChild(calendy.getElement());

      // Renderizar la lista de eventos inicial
      EventCalendar.updateEventList(
        calendy.currentMonth,
        calendy.currentYear,
        events,
        eventsContainer,
        filters.getFilters()
      );
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }

  static updateEventList(month, year, allEvents, eventsContainer, filters) {
    // Filtrar eventos para el mes y año dados según filtros
    const filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.startDate);
      const isUpcoming = filters.upcomingOnly ? eventDate >= new Date() : true;
      const matchesTemporalidad =
        filters.temporalidad === "Month"
          ? eventDate.getMonth() === month && eventDate.getFullYear() === year
          : eventDate.getFullYear() === year;
      const matchesSearch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return isUpcoming && matchesTemporalidad && matchesSearch;
    });

    // Crear instancia de EventList
    const eventListTitle =
      filters.temporalidad === "Month"
        ? `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month))} ${year}`
        : `Events in ${year}`;
    const eventList = new EventList(eventListTitle);

    // Añadir eventos filtrados
    filteredEvents.forEach((event) => eventList.addEvent(event));

    // Renderizar EventList en el contenedor
    eventsContainer.innerHTML = "";
    eventsContainer.appendChild(eventList.getElement());
  }
}
