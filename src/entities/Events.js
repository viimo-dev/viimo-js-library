export class Event {
    constructor({
      id,
      name,
      title,
      startDate,
      endDate,
      active,
      recurrent,
    }) {
      this.id = id || null;
      this.name = name || "Internal name no disponible";
      this.title = title || "Public name no disponible";
      this.startDate = startDate || null;
      this.endDate = endDate || null;
      this.active = active || false;
      this.recurrent = recurrent || false;
    }
  
    // Método para formatear la fecha
    formatDate(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      const options = { weekday: "short", day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options).toUpperCase();
    }
  
    // Obtener la fecha de inicio formateada
    getFormattedStartDate() {
      return this.formatDate(this.startDate) || "Fecha no disponible";
    }
  }
  