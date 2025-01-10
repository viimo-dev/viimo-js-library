import { apiClient } from "./src/frameworks/apiClient.js";

(async () => {
  try {
    // Hacer una solicitud GET a un endpoint de prueba (cámbialo si es necesario)
    const response = await apiClient.get("/users");
    console.log("Datos obtenidos del backend:", response.data);
  } catch (error) {
    console.error("Error al obtener datos del backend:", error);
  }
})();
