// Configuración del cliente Axios
const apiClient = axios.create({
  baseURL: "https://tu-backend-api.com", // Cambia por tu URL de backend
  timeout: 10000,
  withCredentials: false, // No usar cookies
});

export default apiClient;


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
