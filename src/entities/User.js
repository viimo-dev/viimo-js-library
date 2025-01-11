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
    this.Id = Id;
    this.FirebaseId = FirebaseId;
    this.Email = Email;
    this.Image = Image;
    this.TypeId = TypeId;
    this.Name = Name;
    this.Address = Address;
    this.Phone = Phone;
    this.Dob = Dob;
    this.isUserAdmin = isUserAdmin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.Type = Type?.userTypeName || "Unknown"; // Valor por defecto
    console.log("ID asignado al user:",this.Id)
  }
  
  
  
    // Método para verificar si el email es válido
    isValidEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    }
  
    // Método para obtener la edad del usuario basado en su fecha de nacimiento
    getAge() {
      if (!this.Dob) return null;
      const dob = new Date(this.Dob);
      const diff = Date.now() - dob.getTime();
      const ageDate = new Date(diff);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
  