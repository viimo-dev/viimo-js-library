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
        console.log(user.userID);

        // Agregar los datos del usuario
        card.innerHTML = `
          <div class="dev-user-data" data-field="name">${user.name}</div>
          <div class="dev-user-data" data-field="email">${user.email}</div>
          <div class="dev-user-data" data-field="isAdmin">${user.isAdmin ? "Sí" : "No"}</div>
          <div class="dev-user-data" data-field="age">${user.getAge() || "N/A"}</div>
          <div class="dev-delete-user" data-user-id="${user.userId}">Eliminar</div>
        `;

        // Depurar para confirmar que el botón se está creando
        console.log("Card generada:", card);

        // Añadir el evento al botón de eliminar
        const deleteButton = card.querySelector(".dev-delete-user");
        console.log("Botón encontrado:", deleteButton);

        if (deleteButton) {
          deleteButton.addEventListener("click", async (e) => {
            const userId = e.target.getAttribute("data-user-id");
            await UserManager.deleteUser(userId); // Llamar a la función de eliminación
            await UserManager.renderUsersInGrid(containerId); // Recargar la lista
          });
        } else {
          console.error("Botón eliminar no encontrado en la card:", card);
        }

        // Añadir la card al grid
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error al renderizar usuarios en el grid:", error);
    }

    
  }

  static async deleteUser(userId) {
    try {
      const response = await UserAPIAdapter.deleteUser(userId);
      console.log(`Usuario con ID ${userId} eliminado:`, response);
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);
    }
  }
  
}
