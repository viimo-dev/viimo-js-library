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
        throw new Error("No se encontraron uno o más contenedores especificados.");
      }

      // Obtener eventos del backend
      const allEvents = await EventAPIAdapter.getAllEvents();

      // Crear instancia de filtros
      const filters = new EventCalendarFilters({
        onFilterChange: () => {
          this.updateEventList(calendy, allEvents, eventsContainer, filters.getFilters());
        },
      });

      // Crear instancia de Calendy
      const today = new Date();
      const calendy = new Calendy({
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        events: allEvents.map(event => ({
          date: event.startDate.split("T")[0],
          count: 1,
        })),
        onMonthChange: () => {
          this.updateEventList(calendy, allEvents, eventsContainer, filters.getFilters());
        },
      });

      // Renderizar Calendy y filtros
      calendyContainer.innerHTML = "";
      calendyContainer.appendChild(calendy.getElement());

      filtersContainer.innerHTML = "";
      filtersContainer.appendChild(filters.getElement());

      // Renderizar lista de eventos inicial
      this.updateEventList(calendy, allEvents, eventsContainer, filters.getFilters());
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }

  static updateEventList(calendy, allEvents, eventsContainer, filters) {
    const { currentMonth, currentYear } = calendy;

    // Filtrar eventos por mes/año
    let filteredEvents = allEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      if (filters.temporalidad === "Month") {
        return (
          eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear
        );
      } else if (filters.temporalidad === "Year") {
        return eventDate.getFullYear() === currentYear;
      }
      return false; // Fallback (no debería ocurrir)
    });

    // Aplicar filtro de "Only upcoming"
    if (filters.upcomingOnly) {
      const today = new Date();
      filteredEvents = filteredEvents.filter(event => new Date(event.startDate) >= today);
    }

    // Aplicar filtro por nombre
    if (filters.searchQuery) {
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Crear instancia de EventList con los eventos filtrados
    const eventListTitle =
      filters.temporalidad === "Month"
        ? `${calendy.getMonthName()} ${currentYear}`
        : `Events of ${currentYear}`;
    const eventList = new EventList(eventListTitle);

    filteredEvents.forEach(event => eventList.addEvent(event));

    // Renderizar EventList en el contenedor
    eventsContainer.innerHTML = "";
    eventsContainer.appendChild(eventList.getElement());
  }
}
