import apiClient from "../frameworks/apiClient.js";
import { User } from "../entities/User.js";

export class UserAPIAdapter {
  // Obtener todos los usuarios
  static async getAllUsers() {
    try {
      const response = await apiClient.get("/users");
      return response.data.map((rawUser) => this.transformToEntity(rawUser));
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  // Obtener un usuario por ID
  static async getUserById(userId) {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return this.transformToEntity(response.data);
    } catch (error) {
      console.error(`Error al obtener el usuario con ID ${userId}:`, error);
      throw error;
    }
  }

  // Crear un nuevo usuario
  static async createUser(userData) {
    try {
      const response = await apiClient.post("/users", this.transformToBackend(userData));
      return this.transformToEntity(response.data);
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      console.log(`Intentando eliminar usuario con ID ${userId}`);
      const response = await apiClient.delete(`/users/${userId}`);
      console.log(`Usuario con ID ${userId} eliminado correctamente:`, response);
      return response.data; // Retorna la respuesta del backend si todo va bien
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);
  
      // Manejo del error para asegurar que status y message estén definidos
      const status = error.response?.status || "Sin respuesta del servidor";
      const message = error.response?.data || "No se pudo eliminar el usuario.";
      throw { status, message }; // Lanza un error estructurado
    }
  }
  
  

  // Transformar datos del backend a entidad User
  static transformToEntity(rawData) {
    console.log("Datos crudos del backend:", rawData); // Verifica la estructura y valores
    return new User({
      Id: rawData.userId, // Asignar correctamente los nombres
      FirebaseId: rawData.userFirebaseId,
      Email: rawData.userEmail,
      Image: rawData.userImage,
      TypeId: rawData.userTypeId,
      Name: rawData.userName,
      Address: rawData.userAddress,
      Phone: rawData.userPhone,
      Dob: rawData.userDob,
      isUserAdmin: rawData.isUserAdmin,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
      Type: rawData.UserType,
    });
  }
  

  // Transformar datos de User para enviarlos al backend
  static transformToBackend(userEntity) {
    return {
      userId: userEntity.Idd, // Mapeamos nuestras propiedades internas al formato esperado por el backend
      userFirebaseId: userEntity.FirebaseId,
      userEmail: userEntity.Email,
      userImage: userEntity.Image,
      userTypeId: userEntity.TypeId,
      userName: userEntity.Name,
      userAddress: userEntity.Address,
      userPhone: userEntity.Phone,
      userDob: userEntity.Dob,
      isUserAdmin: userEntity.isAdmin,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}  