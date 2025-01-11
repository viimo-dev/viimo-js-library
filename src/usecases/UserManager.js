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
        const userCardHTML = Components.dev.UserCard(user);
        console.log("HTML generado para la card:", userCardHTML);

        const template = document.createElement("template");
        template.innerHTML = userCardHTML.trim();
        const userCardNode = template.content.firstChild;

        const deleteButton = userCardNode.querySelector(".dev-delete-user");
        const paragraph = deleteButton?.querySelector(".paragraph");

        if (deleteButton) {
          deleteButton.addEventListener("click", async () => {
            let userId = deleteButton.getAttribute("data-user-id");
            try {
              await UserManager.deleteUser(userId);
              console.log(`Usuario con ID ${userId} eliminado correctamente.`);
              await UserManager.renderUsersInGrid(containerId); // Recargar el grid
            } catch (error) {
              const status = error.status || "Desconocido";
              let message = error.message || "Error desconocido";
              console.log("Este es el status antes del if: ", error.status)

              if (status === 404) {
                console.warn(`El usuario con ID ${userId} no se pudo eliminar del backend`);
                if (paragraph) {
                  paragraph.innerText =
                    "No se puede eliminar del backend. API devuelve 404 al ID del user --> Culpa de Iago";
                }
                deleteButton.disabled = true; // Opcional: desactiva el botón
              } else {
                console.error(`Error al eliminar usuario con ID ${userId}:`, message);

                if (paragraph) {
                  // Si el mensaje contiene HTML, lo limpiamos
                  if (typeof message === "string" && message.includes("<")) {
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = message;
                    message = tempDiv.innerText.trim(); // Convertir HTML a texto plano
                  }
                  paragraph.innerText = `Error: ${message}`;
                }
              }
            }
          });
        }

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
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);

      const status = error.response?.status || "Sin respuesta del servidor";
      let message =
        error.response?.data?.message || error.message || "No se pudo eliminar el usuario.";

      if (typeof message === "string" && message.includes("<")) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = message;
        message = tempDiv.innerText.trim();
      }

      throw { status, message }; // Lanza el error para que `renderUsersInGrid` lo maneje
    }
  }
}
