export class User {
  constructor({
    Id,
    FirebaseId,
    Email,
    Image,
    TypeId,
    Name,
    Address,
    Phone,
    Dob,
    isUserAdmin,
    createdAt,
    updatedAt,
    Type,
  }) {
    console.log("Valores recibidos en User:", {
      Id,
      FirebaseId,
      Email,
      Image,
      TypeId,
      Name,
      Address,
      Phone,
      Dob,
      isUserAdmin,
      createdAt,
      updatedAt,
      Type,
    });
  
    // Asignación exacta
    this.Id = userId;
    this.FirebaseId = userFirebaseId;
    this.Email = userEmail;
    this.Image = userImage;
    this.TypeId = userTypeId;
    this.Name = userName;
    this.Address = userAddress;
    this.Phone = userPhone;
    this.Dob = userDob;
    this.isUserAdmin = isUserAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.Type = UserType?.userTypeName || "Unknown"; // Valor por defecto
    console.log("ID asignado al user:",this.Id)
  }
  
  
  
    // Método para verificar si el email es válido
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }
  
    // Método para obtener la edad del usuario basado en su fecha de nacimiento
    getAge() {
      if (!this.dob) return null;
      const dob = new Date(this.Dob);
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
  