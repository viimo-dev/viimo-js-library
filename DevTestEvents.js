import { EventAPIAdapter } from "./src/adapters/EventAPIAdapter.js";

(async () => {
  try {
    // Obtener eventos desde la API
    const events = await EventAPIAdapter.getAllEvents();
    
    // Log para confirmar los datos obtenidos
    console.log("Lista de eventos transformados a entidades:", events);

    // Mostrar cada evento con su información básica
    events.forEach((event) => {
      console.log(`
        ID: ${event.id}
        Internal Name: ${event.name}
        Public Name: ${event.title}
        Fecha de inicio: ${event.getFormattedStartDate()}
        Activo: ${event.active ? "Sí" : "No"}
        Recurrente: ${event.recurrent ? "Sí" : "No"}
      `);
    });
  } catch (error) {
    console.error("Error al listar eventos:", error.message || error);
  }
})();
