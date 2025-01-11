import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

//******* OBTENER USUARIOS PARA GRID EN DEVELOPMENT */
export class UserManager {


  // Renderizar usuarios dinámicamente como cards en el grid
  static async renderUsersInGrid(containerId) {
    try {
      const users = await UserAPIAdapter.getAllUsers();
      console.log("Usuarios obtenidos del backend:", users);
  
      const container = document.getElementById(containerId);
      if (!container) throw new Error(`No se encontró el contenedor con ID: ${containerId}`);
  
      container.innerHTML = "";
  
      users.forEach((user) => {
        console.log("Procesando usuario:", user);
  
        const card = document.createElement("div");
        card.className = "dev-user-card";
  
        card.innerHTML = `
          <div class="dev-user-data" data-field="name">${user.Name}</div>
          <div class="dev-user-data" data-field="email">${user.Email}</div>
          <div class="dev-user-data" data-field="isAdmin">${user.isUserAdmin ? "Sí" : "No"}</div>
          <div class="dev-user-data" data-field="age">${user.getAge() || "N/A"}</div>
          <button class="dev-delete-user" data-user-id="${user.Id}">Eliminar</button>
        `;
  
        // Seleccionar el botón de eliminar
        const deleteButton = card.querySelector(".dev-delete-user");
        if (!deleteButton) {
          console.error("Botón eliminar no encontrado en la card:", card);
          return; // Salimos de la iteración actual si no se encuentra el botón
        }
  
        console.log("Botón encontrado:", deleteButton);
  
        // Añadir evento al botón eliminar
        deleteButton.addEventListener("click", async (e) => {
          const userId = e.target.getAttribute("data-user-id");
          try {
            await UserManager.deleteUser(userId);
            console.log(`Usuario con ID ${userId} eliminado correctamente.`);
            await UserManager.renderUsersInGrid(containerId); // Recargar el grid
          } catch (error) {
            const status = error.status || "Desconocido";
            const message = error.message || "Error desconocido";
  
            if (status === 404) {
              console.warn(`El usuario con ID ${userId} no se pudo eliminar del backend`);
              deleteButton.innerText = "No se puede eliminar del backend. API devuelve 404 al ID del user --> Culpa de Iago";
              deleteButton.disabled = true;
            } else {
              console.error(`Error al eliminar usuario con ID ${userId}:`, message);
              deleteButton.innerText = `Error: ${message}`;
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
      const response = await apiClient.delete(`/users/${userId}`);
      console.log(`Usuario con ID ${userId} eliminado correctamente:`, response);
      return response.data; // Retorna la respuesta si la eliminación es exitosa
    } catch (error) {
      console.error("Error capturado en deleteUser:", error);
  
      // Manejo del error: obtenemos status y mensaje, con valores por defecto si no existen
      const status = error.response?.status || "Sin respuesta del servidor";
      const message =
        error.response?.data?.message || error.message || "No se pudo eliminar el usuario.";
  
      console.error(`Error al eliminar usuario con ID ${userId}: Status: ${status}, Mensaje: ${message}`);
  
      // Lanzamos un error estructurado con status y message
      throw { status, message };
    }
  }
  
  
  
}
