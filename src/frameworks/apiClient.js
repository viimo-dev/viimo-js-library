// Detectar si axios ya está disponible (Webflow) o importarlo (Node.js)
let axiosInstance;

if (typeof axios !== "undefined") {
  axiosInstance = axios; // Ya está definido (Webflow)
} else {
  // Importación dinámica para Node.js
  const axiosModule = await import("axios");
  axiosInstance = axiosModule.default;
}

// Configuración del cliente Axios
const apiClient = axiosInstance.create({
  baseURL: "https://backend.viimo.app/api/v1", // Cambia por tu URL de backend
  timeout: 10000,
  withCredentials: false, // No usar cookies
});

// Manejo de errores y respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || "Sin respuesta del servidor";
    const message = error.response?.data || error.message || "Error desconocido";
    console.error(`Error en la API: Status: ${status}, Mensaje: ${message}`);
    console.log("Estamos en apiclient", JSON.stringify(error.response));
    return Promise.reject({ status, message });
  }
);

export default apiClient;
