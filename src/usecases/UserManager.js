import { UserCardComponent } from "../components/dev/UserCardComponent.js";
import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

export class UserManager {
  static async renderUsersInGrid(containerId) {
    try {
      const users = await UserAPIAdapter.getAllUsers();
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      container.innerHTML = "";

      users.forEach((user) => {
        const userCard = new UserCardComponent(user);

        userCard.setDeleteAction(async (userId) => {
          try {
            await UserManager.deleteUser(userId);
            console.log(`Usuario con ID ${userId} eliminado correctamente.`);
            await UserManager.renderUsersInGrid(containerId); // Recargar el grid
          } catch (error) {
            const status = error.status || "Desconocido";
            if (status === 404) {
              userCard.setErrorText("No se puede eliminar del backend. API devuelve 404 al ID del user --> Culpa de Iago");
            } else {
              userCard.setErrorText(`Error: ${error.message || "Desconocido"}`);
            }
          }
        });

        container.appendChild(userCard.getElement());
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
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);
      throw error;
    }
  }
}

