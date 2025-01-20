/*import { EventAPIAdapter } from "../../adapters/EventAPIAdapter.js";
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
    console.log(`Updating Event List for ${month + 1}/${year}`);
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
*/

import { EventAPIAdapter } from "../../adapters/EventAPIAdapter.js";
import { EventList } from "../../components/events/EventList.js";
import { Calendy } from "../../components/events/EventCalendy.js";
import { EventCalendarFilters } from "../../components/events/EventCalendarFilters.js";

export class EventCalendar {
  static async renderEvents(eventsContainerId, calendyContainerID, filtersContainerID) {
    try {
      const eventsContainer = document.getElementById(eventsContainerId);
      const calendyContainer = document.getElementById(calendyContainerID);
      const filtersContainer = document.getElementById(filtersContainerID);

      if (!eventsContainer || !calendyContainer || !filtersContainer) {
        throw new Error("No se encontraron uno o más contenedores necesarios.");
      }

      // Obtener eventos del backend
      const events = await EventAPIAdapter.getAllEvents();

      // Crear y renderizar filtros
      const filters = new EventCalendarFilters({
        onFilterChange: (selectedFilters) => {
          EventCalendar.updateEventList(events, selectedFilters, eventsContainer, calendyContainer);
        },
      });

      filtersContainer.innerHTML = "";
      filtersContainer.appendChild(filters.getElement());

      // Crear instancia de Calendy
      const today = new Date();
      const calendy = new Calendy({
        currentMonth: today.getMonth(),
        currentYear: today.getFullYear(),
        events: events.map((event) => ({
          date: event.startDate.split("T")[0], // Asegúrate de que startDate está en formato ISO
          count: 1, // Asume un evento por día inicialmente, ajusta según la lógica
        })),
        onMonthChange: (newMonth, newYear) => {
          EventCalendar.updateEventList(events, filters.filters, eventsContainer, calendyContainer, {
            month: newMonth,
            year: newYear,
          });
        },
      });

      // Renderizar Calendy en el contenedor
      calendyContainer.innerHTML = "";
      calendyContainer.appendChild(calendy.getElement());

      // Renderizar la lista inicial de eventos
      EventCalendar.updateEventList(events, filters.filters, eventsContainer, calendyContainer);
    } catch (error) {
      console.error("Error al renderizar el calendario de eventos:", error.message || error);
    }
  }

  static updateEventList(allEvents, filters, eventsContainer, calendyContainer, selectedDate = null) {
    const today = new Date();
    const { showUpcoming, viewByMonth, searchQuery } = filters;

    // Filtrar eventos
    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.startDate);

      // Filtrar por próximos eventos
      if (showUpcoming && eventDate < today) {
        return false;
      }

      // Filtrar por tiempo (mes o año)
      if (viewByMonth) {
        const month = selectedDate?.month ?? today.getMonth();
        const year = selectedDate?.year ?? today.getFullYear();
        if (eventDate.getMonth() !== month || eventDate.getFullYear() !== year) {
          return false;
        }
      } else {
        const year = selectedDate?.year ?? today.getFullYear();
        if (eventDate.getFullYear() !== year) {
          return false;
        }
      }

      // Filtrar por nombre
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery)) {
        return false;
      }

      return true;
    });

    // Crear instancia de EventList
    const headerText = viewByMonth
      ? `${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
          new Date(today.getFullYear(), today.getMonth())
        )} ${today.getFullYear()}`
      : `${today.getFullYear()}`;

    const eventList = new EventList(headerText);

    // Agrupar por meses si es vista por año
    if (!viewByMonth) {
      const groupedByMonth = filteredEvents.reduce((acc, event) => {
        const month = new Date(event.startDate).getMonth();
        if (!acc[month]) acc[month] = [];
        acc[month].push(event);
        return acc;
      }, {});

      Object.keys(groupedByMonth).forEach((month) => {
        const monthList = new EventList(
          new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(today.getFullYear(), month))
        );
        groupedByMonth[month].forEach((event) => monthList.addEvent(event));
        eventsContainer.appendChild(monthList.getElement());
      });
    } else {
      // Añadir eventos filtrados
      filteredEvents.forEach((event) => eventList.addEvent(event));
      eventsContainer.innerHTML = "";
      eventsContainer.appendChild(eventList.getElement());
    }
  }
}
