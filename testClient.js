import from "https://cdn.jsdelivr.net/npm/axios@1.3.5/dist/axios.min.js";
import apiClient from "./src/frameworks/apiClient.js";

(async () => {
  try {
    // Hacer una solicitud GET a un endpoint de prueba (cámbialo si es necesario)
    const response = await apiClient.get("/users");
    console.log("Datos obtenidos del backend:", response.data);
  } catch (error) {
    console.error("Error al obtener datos del backend:", error);
  }
})();
