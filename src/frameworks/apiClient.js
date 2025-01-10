import axios from "axios";

// Configuración del cliente Axios
export const apiClient = axios.create({
  baseURL: "https://backend.viimo.app/api/v1", // URL base de tu backend
  timeout: 5000, // Tiempo máximo de espera en milisegundos
  headers: {
    "Content-Type": "application/json", // Tipo de contenido
  },
});

// Manejo de errores y respuestas
apiClient.interceptors.response.use(
  (response) => {
    console.log("Respuesta de la API:", response.data); // Log para verificar respuestas
    return response;
  },
  (error) => {
    console.error("Error en la API:", error.response?.data || error.message); // Log de errores
    return Promise.reject(error.response?.data || error.message); // Propaga el error
  }
);
