import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

//******* OBTENER USUARIOS PARA GRID EN DEVELOPMENT */

export class UserManager {
  // Renderizar usuarios dinámicamente como cards en el grid
  static async renderUsersInGrid(containerId) {
    try {
      const users = await UserAPIAdapter.getAllUsers();

      // Seleccionar el contenedor del grid
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      // Limpiar el contenedor antes de agregar contenido
      container.innerHTML = "";

      // Crear dinámicamente las cards para cada usuario
      users.forEach((user) => {
        // Crear el contenedor de la card
        const card = document.createElement("div");
        card.className = "dev-user-card";

        // Agregar los datos del usuario
        card.innerHTML = `
          <div class="dev-user-data" data-field="name">${user.name}</div>
          <div class="dev-user-data" data-field="email">${user.email}</div>
          <div class="dev-user-data" data-field="isAdmin">${user.isAdmin ? "Sí" : "No"}</div>
          <div class="dev-user-data" data-field="age">${user.getAge() || "N/A"}</div>
        `;

        // Añadir la card al grid
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error al renderizar usuarios en el grid:", error);
    }
  }
}
