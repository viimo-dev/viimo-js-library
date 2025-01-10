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
      console.log("Valores recibidos en User:", userId); // Verifica si userId tiene un valor
      this.id = userId;
      this.firebaseId = userFirebaseId;
      this.email = userEmail;
      this.image = userImage;
      this.typeId = userTypeId;
      this.name = userName;
      this.address = userAddress;
      this.phone = userPhone;
      this.dob = userDob;
      this.isAdmin = isUserAdmin;
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
  