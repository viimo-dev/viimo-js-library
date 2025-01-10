import { UserManager } from "./src/usecases/UserManager.js";

(async () => {
  try {
    console.log("Obteniendo usuarios formateados para la tabla...");
    const tableData = await UserManager.getUsersForTable();
    console.log("Datos para la tabla:", tableData);
  } catch (error) {
    console.error("Error durante las pruebas del caso de uso:", error);
  }
})();
