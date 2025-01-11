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
      const response = await apiClient.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar usuario con ID ${userId}:`, error);
      throw error;
    }
  }

  // Transformar datos del backend a entidad User
  static transformToEntity(rawData) {
    console.log("Datos crudos del backend:", rawData); // Verifica la estructura y valores
    return new User({
      userId: rawData.userId, // Asignar correctamente los nombres
      userFirebaseId: rawData.userFirebaseId,
      userEmail: rawData.userEmail,
      userImage: rawData.userImage,
      userTypeId: rawData.userTypeId,
      userName: rawData.userName,
      userAddress: rawData.userAddress,
      userPhone: rawData.userPhone,
      userDob: rawData.userDob,
      isUserAdmin: rawData.isUserAdmin,
      createdAt: rawData.createdAt,
      updatedAt: rawData.updatedAt,
      UserType: rawData.UserType,
    });
  }
  

  // Transformar datos de User para enviarlos al backend
  static transformToBackend(userEntity) {
    return {
      userId: userEntity.id, // Mapeamos nuestras propiedades internas al formato esperado por el backend
      userFirebaseId: userEntity.firebaseId,
      userEmail: userEntity.email,
      userImage: userEntity.image,
      userTypeId: userEntity.typeId,
      userName: userEntity.name,
      userAddress: userEntity.address,
      userPhone: userEntity.phone,
      userDob: userEntity.dob,
      isUserAdmin: userEntity.isAdmin,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}  