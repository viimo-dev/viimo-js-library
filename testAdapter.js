import { UserAPIAdapter } from "./src/adapters/UserAPIAdapter.js";

(async () => {
  try {
    // Probar obtener todos los usuarios
    console.log("Obteniendo todos los usuarios...");
    const users = await UserAPIAdapter.getAllUsers();
    console.log("Usuarios obtenidos:", users);

    // Probar obtener un usuario por ID (reemplaza "123" por un ID válido)
    console.log("\nObteniendo usuario por ID...");
    const user = await UserAPIAdapter.getUserById("123");
    console.log("Usuario obtenido:", user);

    // Probar crear un nuevo usuario (reemplaza con datos de prueba)
    console.log("\nCreando un nuevo usuario...");
    const newUser = await UserAPIAdapter.createUser({
      id: 999,
      firebaseId: "new-firebase-id",
      email: "test@example.com",
      image: null,
      typeId: 1,
      name: "Front Test User",
      address: "123 New Street",
      phone: "123-456-7890",
      dob: "2000-01-01",
      isAdmin: false,
    });
    console.log("Usuario creado:", newUser);
  } catch (error) {
    console.error("Error durante las pruebas:", error);
  }
})();
