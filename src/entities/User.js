export class User {
  constructor({
    userId,
    userFirebaseId,
    userEmail,
    userImage,
    userTypeId,
    userName,
    userAddress,
    userPhone,
    userDob,
    isUserAdmin,
    createdAt,
    updatedAt,
    UserType,
  }) {
    console.log("Valores recibidos en User:", {
      userId,
      userFirebaseId,
      userEmail,
      userImage,
      userTypeId,
      userName,
      userAddress,
      userPhone,
      userDob,
      isUserAdmin,
      createdAt,
      updatedAt,
      UserType,
    });
  
    // Asignación exacta
    this.userId = userId;
    this.userFirebaseId = userFirebaseId;
    this.userEmail = userEmail;
    this.userImage = userImage;
    this.userTypeId = userTypeId;
    this.userName = userName;
    this.userAddress = userAddress;
    this.userPhone = userPhone;
    this.userDob = userDob;
    this.isUserAdmin = isUserAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.userType = UserType?.userTypeName || "Unknown"; // Valor por defecto
  }
  
  
  
    // Método para verificar si el email es válido
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }
  
    // Método para obtener la edad del usuario basado en su fecha de nacimiento
    getAge() {
      if (!this.dob) return null;
      const dob = new Date(this.dob);
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
  