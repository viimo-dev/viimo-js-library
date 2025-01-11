// Configuración del cliente Axios
const apiClient = axios.create({
  baseURL: "https://backend.viimo.app/api/v1", // Cambia por tu URL de backend
  timeout: 10000,
  withCredentials: false, // No usar cookies
});

export default apiClient;


// Manejo de errores y respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || "Sin respuesta del servidor";
    const message = error.response?.data || error.message || "Error desconocido";
    console.error(`Error en la API: Status: ${status}, Mensaje: ${message}`);
    return Promise.reject({ status, message });
  }
);

