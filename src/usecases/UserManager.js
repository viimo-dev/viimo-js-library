import { UserAPIAdapter } from "../adapters/UserAPIAdapter.js";

//******* OBTENER USUARIOS PARA TABLA EN DEVELOPMENT */
export class UserManager {
  // Obtener usuarios formateados para la tabla
  static async getUsersForTable() {
    try {
      const users = await UserAPIAdapter.getAllUsers();
      // Transformar los datos al formato necesario para el front
      return users.map((user) => ({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin ? "Sí" : "No", // Convertir booleano a texto
        age: user.getAge() || "N/A", // Si no hay fecha de nacimiento, mostrar "N/A"
      }));
    } catch (error) {
      console.error("Error al obtener usuarios para la tabla:", error);
      throw error;
    }
  }
}
