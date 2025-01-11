import { Components } from "../components/components.js";
import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

export class UserManager {
  static async renderUsersInGrid(containerId) {
    try {
      const users = await UserAPIAdapter.getAllUsers();
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);

      container.innerHTML = "";

      users.forEach((user) => {
        console.log("Procesando usuario:", user);

        const userCardHTML = Components.dev.UserCard(user);

        const template = document.createElement("template");
        template.innerHTML = userCardHTML.trim();
        const userCardNode = template.content.firstChild;

        const deleteButton = userCardNode.querySelector(".dev-delete-user");
        const paragraph = deleteButton?.querySelector(".paragraph");

        if (!deleteButton) {
          console.error("Botón eliminar no encontrado en la card:", userCardNode);
          return;
        }

        // Asegúrate de que el atributo data-user-id tiene el valor correcto
        const userId = deleteButton.getAttribute("data-user-id");
        if (!userId || userId === "null") {
          console.error(`ID de usuario inválido: ${userId}`);
          if (paragraph) {
            paragraph.innerText = "ID de usuario inválido. No se puede eliminar.";
          }
          deleteButton.disabled = true;
          return;
        }

        // Añadir evento al botón eliminar
        deleteButton.addEventListener("click", async () => {
          try {
            await UserManager.deleteUser(userId);
            console.log(`Usuario con ID ${userId} eliminado correctamente.`);
            await UserManager.renderUsersInGrid(containerId); // Recargar el grid
          } catch (error) {
            const status = error.status || "Desconocido";
            const message = error.message || "Error desconocido";

            if (status === 404 && paragraph) {
              console.warn(`El usuario con ID ${userId} no se pudo eliminar del backend`);
              paragraph.innerText =
                "No se puede eliminar del backend. API devuelve 404 al ID del user --> Culpa de Iago";
              deleteButton.disabled = true;
            } else if (paragraph) {
              paragraph.innerText = `Error: ${message}`;
            }
          }
        });

        container.appendChild(userCardNode);
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
      console.error("Error capturado en deleteUser:", error);

      const status = error.response?.status || "Sin respuesta del servidor";
      const message =
        error.response?.data?.message || error.message || "No se pudo eliminar el usuario.";

      throw { status, message }; // Lanzar error para ser manejado en `renderUsersInGrid`
    }
  }
}
