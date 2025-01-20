export class Calendy {
    constructor({ currentMonth, currentYear, events = [], onMonthChange = null }) {
      this.currentMonth = currentMonth; // Mes actual (0 = Enero, 11 = Diciembre)
      this.currentYear = currentYear; // Año actual
      this.events = events; // Lista de eventos [{ date: '2025-01-04', count: 1 }, ...]
      this.selectedDate = new Date(); // Fecha seleccionada (por defecto, hoy)
      this.onMonthChange = onMonthChange; // Callback para notificar cambios de mes
      this.element = this.createElement();
    }
  
    createElement() {
      const template = document.createElement("template");
      template.innerHTML = `
        <div class="events-calendy">
          <div class="calendy-header">
            <div class="calendy-left">
              <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67851ea8d3471d574dde01c8_chevron-left.svg" alt="Prev Month">
            </div>
            <div class="calendly-selector">
              <div class="paragraph">${this.getMonthName()} ${this.currentYear}</div>
              <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67851ec0b13a76f3e5cb088b_chevron-down.svg" alt="Select Month">
            </div>
            <div class="calendy-right">
              <img src="https://cdn.prod.website-files.com/677e577ef5b94953b8c1831e/67851eaf498f5ef4021e59bc_chevron-right.svg" alt="Next Month">
            </div>
          </div>
          <div class="calendy-main">
            <div class="calendy-week">
              ${["MO", "TU", "WE", "TH", "FR", "SA", "SU"]
                .map(day => `<div class="calendy-week-day"><div class="paragraph">${day}</div></div>`)
                .join("")}
            </div>
            <div class="calendy-month">
              ${this.renderDays()}
            </div>
          </div>
        </div>
      `.trim();
  
      const element = template.content.firstChild;
      this.addEventListeners(element);
      return element;
    }
  
    renderDays() {
      const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      const startDay = new Date(this.currentYear, this.currentMonth, 1).getDay(); // Día de inicio (0 = Domingo)
      const days = [];
  
      // Días previos al inicio del mes (vacíos)
      for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
        days.push(`<div class="calendy-month-day is-disabled"></div>`);
      }
  
      // Días del mes
      for (let day = 1; day <= daysInMonth; day++) {
        const eventCount = this.getEventCount(day);
        const isSelected = this.isSelectedDay(day);
        const hasEvent = eventCount > 0 ? "has-event" : "";
        const isCurrent = isSelected ? "is-current" : "";
        const multiEvent = eventCount > 1 ? `<div class="calendy-multievent">${eventCount}</div>` : "";
  
        days.push(`
          <div class="calendy-month-day ${hasEvent} ${isCurrent}">
            <div>${day}</div>
            ${multiEvent}
          </div>
        `);
      }
  
      return days.join("");
    }
  
    getEventCount(day) {
      const date = new Date(this.currentYear, this.currentMonth, day).toISOString().split("T")[0];
      const event = this.events.find(e => e.date === date);
      return event ? event.count : 0;
    }
  
    isSelectedDay(day) {
      const selectedDate = new Date(this.selectedDate);
      return (
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === this.currentMonth &&
        selectedDate.getFullYear() === this.currentYear
      );
    }
  
    getMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString("en-US", { month: "long" });
    }
  
    addEventListeners(element) {
      element.querySelector(".calendy-left").addEventListener("click", () => this.changeMonth(-1));
      element.querySelector(".calendy-right").addEventListener("click", () => this.changeMonth(1));
      element.querySelectorAll(".calendy-month-day").forEach(dayElement => {
        dayElement.addEventListener("click", () => this.selectDay(dayElement));
      });
    }
  
    changeMonth(offset) {
      this.currentMonth += offset;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
  
      // Notificar cambio de mes
      if (this.onMonthChange) {
        this.onMonthChange(this.currentMonth, this.currentYear);
      }
  
      this.updateCalendar();
    }
  
    selectDay(dayElement) {
      const day = parseInt(dayElement.textContent, 10);
      this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
      this.updateCalendar();
    }
  
    updateCalendar() {
      const newElement = this.createElement();
      this.element.replaceWith(newElement);
      this.element = newElement;
    }
  
    getElement() {
      return this.element;
    }
  }
  