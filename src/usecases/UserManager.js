import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

//******* OBTENER USUARIOS PARA GRID EN DEVELOPMENT */
export class UserManager {

  static async deleteUser(userId) {
    try {
      const response = await UserAPIAdapter.deleteUser(userId);
      console.log(`Usuario con ID ${userId} eliminado:`, response);
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);
    }
  }
  
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
          <button class="dev-delete-user" data-user-id="${user.userId}">
        `;
        // Añadir el evento al botón de eliminar
        card.querySelector(".dev-delete-user").addEventListener("click", async (e) => {
          const userId = e.target.getAttribute("data-user-id");
          await UserManager.deleteUser(userId); // Llamar a la función de eliminación
          await UserManager.renderUsersInGrid(containerId); // Recargar la lista
        });

        // Añadir la card al grid
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error al renderizar usuarios en el grid:", error);
    }
  }
}
