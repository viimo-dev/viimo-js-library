/*
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
*/

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
          this.updateEventList(
            calendy.currentMonth,
            calendy.currentYear,
            events,
            eventsContainer,
            filters.getFilters()
          );
        },
      });

      filtersContainer.innerHTML = "";
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
          if (filters.getFilters().temporalidad === "Month") {
            this.updateEventList(newMonth, newYear, events, eventsContainer, filters.getFilters());
          }
        },
      });

      calendyContainer.innerHTML = "";
      calendyContainer.appendChild(calendy.getElement());

      // Listener para manejar cambios entre "Month" y "Year"
      filters.setOnTemporalidadChange((newTemporalidad) => {
        if (newTemporalidad === "Month") {
          this.updateEventList(calendy.currentMonth, calendy.currentYear, events, eventsContainer, filters.getFilters());
        } else if (newTemporalidad === "Year") {
          this.renderYearView(calendy.currentYear, events, eventsContainer, filters.getFilters());
        }
      });

      // Renderizar la lista inicial
      this.updateEventList(
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

    const eventListTitle =
      filters.temporalidad === "Month"
        ? `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month))} ${year}`
        : `Events in ${year}`;
    const eventList = new EventList(eventListTitle);

    filteredEvents.forEach((event) => eventList.addEvent(event));
    eventsContainer.innerHTML = "";
    eventsContainer.appendChild(eventList.getElement());
  }

  static renderYearView(year, allEvents, eventsContainer, filters) {
    const filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.startDate);
      const isUpcoming = filters.upcomingOnly ? eventDate >= new Date() : true;
      const matchesSearch = event.title.toLowerCase().includes(filters.searchQuery.toLowerCase());

      return isUpcoming && eventDate.getFullYear() === year && matchesSearch;
    });

    const groupedEvents = filteredEvents.reduce((acc, event) => {
      const month = new Date(event.startDate).getMonth();
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {});

    eventsContainer.innerHTML = "";
    for (const [month, events] of Object.entries(groupedEvents)) {
      const eventListTitle = `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(year, month))} ${year}`;
      const eventList = new EventList(eventListTitle);
      events.forEach((event) => eventList.addEvent(event));
      eventsContainer.appendChild(eventList.getElement());
    }
  }
}
