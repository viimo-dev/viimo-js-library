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
        const card = document.createElement("div");
        card.className = "dev-user-card";
  
        card.innerHTML = `
          <div class="dev-user-data" data-field="name">${user.Name}</div>
          <div class="dev-user-data" data-field="email">${user.Email}</div>
          <div class="dev-user-data" data-field="isAdmin">${user.isUserAdmin ? "Sí" : "No"}</div>
          <div class="dev-user-data" data-field="age">${user.getAge() || "N/A"}</div>
          <button class="dev-delete-user" data-user-id="${user.Id}">Eliminar</button>
        `;
  
        // Añadir evento al botón eliminar
        deleteButton.addEventListener("click", async (e) => {
          const userId = e.target.getAttribute("data-user-id");
          try {
            await UserManager.deleteUser(userId);
            await UserManager.renderUsersInGrid(containerId); // Recargar el grid
          } catch (error) {
            const status = error.status || "Desconocido";
            const message = error.message || "Error desconocido";
        
            if (status === 404) {
              console.warn(`El usuario con ID ${userId} no se pudo eliminar del backend`);
              deleteButton.innerText = "No se puede eliminar del backend";
              deleteButton.disabled = true; // Desactivar el botón después
            } else {
              console.error(`Error al eliminar usuario con ID ${userId}:`, message);
              deleteButton.innerText = "Error al eliminar";
            }
          }
        });
        
  
        // Añadir la card al grid
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
      const status = error.status || "Desconocido";
      const message = error.message || "No se pudo eliminar el usuario.";
      console.error(`Error al eliminar usuario con ID ${userId}: Status: ${status}, Mensaje: ${message}`);
      throw { status, message }; // Lanza el error para que `renderUsersInGrid` lo gestione
    }
  }
  
}
