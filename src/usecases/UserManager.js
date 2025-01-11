import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

export class UserManager {
  static async renderUsersInGrid(containerId) {
    try {
      const users = await UserAPIAdapter.getAllUsers();
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      container.innerHTML = "";

      users.forEach((user) => {
        const card = document.createElement("div");
        card.className = "dev-user-card";

        card.innerHTML = `
          <div class="dev-user-data" data-field="name">${user.Name}</div>
          <div class="dev-user-data" data-field="email">${user.Email}</div>
          <div class="dev-user-data" data-field="isAdmin">${user.isUserAdmin ? "Sí" : "No"}</div>
          <div class="dev-user-data" data-field="age">${user.getAge() || "N/A"}</div>
          <div class="dev-delete-user" data-user-id="${user.Id}">Eliminar usuario</div>
        `;

        const deleteButton = card.querySelector(".dev-delete-user");

        if (deleteButton) {
          deleteButton.addEventListener("click", async () => {
            const userId = deleteButton.getAttribute("data-user-id");
            try {
              await UserManager.deleteUser(userId);
              console.log(`Usuario con ID ${userId} eliminado correctamente.`);
              await UserManager.renderUsersInGrid(containerId); // Recargar el grid
            } catch (error) {
              console.error(`Error en la eliminación de usuario ${userId}:`, error);
              if (error.status === 404) {
                console.warn(`El usuario con ID ${userId} no se pudo eliminar del backend.`);
                deleteButton.innerText = "No se puede eliminar del backend. API devuelve 404.";
                deleteButton.disabled = true;
              } else {
                deleteButton.innerText = `Error: ${error.message}`;
              }
            }
          });
        }

        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error al renderizar usuarios en el grid:", error.message || error);
    }
  }

  static async deleteUser(userId) {
    try {
      console.log(`Intentando eliminar usuario con ID ${userId}`);
      const response = await UserAPIAdapter.deleteUser(userId);
      console.log(`Usuario con ID ${userId} eliminado correctamente:`, response);
    } catch (error) {
      // Depurar el error completo para verificar qué contiene
      console.error("Error capturado en deleteUser:", error);

      const status = error.status || error.response?.status || "Sin respuesta del servidor";
      const message =
      error.response?.data?.message || error.message || "No se pudo eliminar el usuario.";

    console.error(
      `Error al eliminar usuario con ID ${userId}: Status: ${status}, Mensaje: ${message}`
    );

    // Lanzar el error estructurado con status y message
    throw { status, message };
    }
  }
}