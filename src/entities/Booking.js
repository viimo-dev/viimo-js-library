export class Booking {
    constructor({
      bookingId,
      createdDate,
      paidTotal,
      itemsQuantity,
      openBarRegularQty,
      openBarRegularValue,
      openBarPremiumQty,
      openBarPremiumValue,
      vipTableQty,
      vipTableValue,
      totalPax,
      transportBavaroCentralQty,
      transportBavaroCentralValue,
      transportUveroAltoQty,
      transportUveroAltoValue,
    }) {
      this.bookingId = bookingId; // Código de reserva
      this.createdDate = createdDate; // Fecha de creación
      this.paidTotal = paidTotal; // Total pagado
      this.itemsQuantity = itemsQuantity; // Cantidad de items
      this.openBarRegularQty = openBarRegularQty; // Cantidad de Open Bar Regular
      this.openBarRegularValue = openBarRegularValue; // Valor económico de Open Bar Regular
      this.openBarPremiumQty = openBarPremiumQty; // Cantidad de Open Bar Premium
      this.openBarPremiumValue = openBarPremiumValue; // Valor económico de Open Bar Premium
      this.vipTableQty = vipTableQty; // Cantidad de Mesas VIP
      this.vipTableValue = vipTableValue; // Valor económico de Mesas VIP
      this.totalPax = totalPax; // Total de personas (calculado)
      this.transportBavaroCentralQty = transportBavaroCentralQty; // Cantidad de transportes Bávaro Central
      this.transportBavaroCentralValue = transportBavaroCentralValue; // Valor económico del transporte Bávaro Central
      this.transportUveroAltoQty = transportUveroAltoQty; // Cantidad de transportes Uvero Alto/Macao
      this.transportUveroAltoValue = transportUveroAltoValue; // Valor económico del transporte Uvero Alto/Macao
    }
  }
  