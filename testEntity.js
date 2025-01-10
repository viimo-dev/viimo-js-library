import { User } from "./src/entities/User.js";

const testUserData = {
  userId: "123",
  userFirebaseId: "firebase-123",
  userEmail: "test@example.com",
  userImage: "profile.jpg",
  userTypeId: 1,
  userName: "Test User",
  userAddress: "123 Main Street",
  userPhone: "555-555-5555",
  userDob: "1990-01-01",
  isUserAdmin: false,
  createdAt: "2023-01-01T10:00:00Z",
  updatedAt: "2023-01-01T12:00:00Z",
  UserType: { userTypeId: "1", userTypeName: "Administrator" },
};

const user = new User(testUserData);

console.log("Usuario creado:", user);
console.log("¿Email válido?", user.isValidEmail());
console.log("Edad del usuario:", user.getAge());
