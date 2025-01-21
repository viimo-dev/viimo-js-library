import fs from "fs";
import csv from "csv-parser";

const outputPath = "./bookings2024.json";

const processCSV = (filePath) => {
  const bookings = [];

  // Variables para acumular totales
  const totals = {
    paidTotal: 0,
    openBarRegularQty: 0,
    openBarRegularValue: 0,
    openBarPremiumQty: 0,
    openBarPremiumValue: 0,
    vipTableQty: 0,
    vipTableValue: 0,
    transportBavaroQty: 0,
    transportBavaroValue: 0,
    transportUveroQty: 0,
    transportUveroValue: 0,
  };

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      try {
        // Extraer datos y asignarlos a las propiedades correctas
        const openBarRegularQty = parseInt(row["Open Bar regular #"]) || 0;
        const openBarPremiumQty = parseInt(row["Open Bar Premium #"]) || 0;
        const vipTableQty = parseInt(row["VIP Table for 6 #"]) || 0;
        const transportBavaroQty = parseInt(row["Bavaro Central - Número de Pasajeros #"]) || 0;
        const transportUveroQty = parseInt(row["Uvero Alto y Macao - Número de pasajeros #"]) || 0;

        const openBarRegularValue = parseFloat(row["Open Bar regular $"]) || 0;
        const openBarPremiumValue = parseFloat(row["Open Bar Premium $"]) || 0;
        const vipTableValue = parseFloat(row["VIP Table for 6 $"]) || 0;
        const transportBavaroValue = parseFloat(row["Bavaro Central - Número de Pasajeros $"]) || 0;
        const transportUveroValue = parseFloat(row["Uvero Alto y Macao - Número de pasajeros $"]) || 0;

        // Calcular el total pagado como suma de los valores económicos
        const paidTotal =
          openBarRegularValue +
          openBarPremiumValue +
          vipTableValue +
          transportBavaroValue +
          transportUveroValue;

        bookings.push({
          bookingId: row["Booking Code"] || "Unknown ID",
          createdDate: row["Created Date"] || "Unknown Date",
          paidTotal,
          itemsQuantity: parseInt(row["Item Quantity"]) || 0,
          openBarRegularQty,
          openBarRegularValue,
          openBarPremiumQty,
          openBarPremiumValue,
          vipTableQty,
          vipTableValue,
          totalPax: openBarRegularQty + openBarPremiumQty + vipTableQty * 6,
          transportBavaroQty,
          transportBavaroValue,
          transportUveroQty,
          transportUveroValue,
        });

        // Actualizar totales
        totals.paidTotal += paidTotal;
        totals.openBarRegularQty += openBarRegularQty;
        totals.openBarRegularValue += openBarRegularValue;
        totals.openBarPremiumQty += openBarPremiumQty;
        totals.openBarPremiumValue += openBarPremiumValue;
        totals.vipTableQty += vipTableQty;
        totals.vipTableValue += vipTableValue;
        totals.transportBavaroQty += transportBavaroQty;
        totals.transportBavaroValue += transportBavaroValue;
        totals.transportUveroQty += transportUveroQty;
        totals.transportUveroValue += transportUveroValue;
      } catch (error) {
        console.error("Error procesando fila:", row, error);
      }
    })
    .on("end", () => {
      // Guardar JSON
      fs.writeFileSync(outputPath, JSON.stringify(bookings, null, 2));
      console.log(`Datos procesados y guardados en ${outputPath}`);

      // Mostrar resultados en consola
      console.log("\n--- Resumen de ventas ---");
      console.log(`Total económico de ventas calculado: $${totals.paidTotal.toFixed(2)}`);
      console.log("\nPor producto:");
      console.log(`Open Bar Regular: ${totals.openBarRegularQty} unidades, $${totals.openBarRegularValue.toFixed(2)}`);
      console.log(`Open Bar Premium: ${totals.openBarPremiumQty} unidades, $${totals.openBarPremiumValue.toFixed(2)}`);
      console.log(`VIP Tables: ${totals.vipTableQty} unidades, $${totals.vipTableValue.toFixed(2)}`);
      console.log(`Transporte Bávaro Central: ${totals.transportBavaroQty} unidades, $${totals.transportBavaroValue.toFixed(2)}`);
      console.log(`Transporte Uvero Alto y Macao: ${totals.transportUveroQty} unidades, $${totals.transportUveroValue.toFixed(2)}`);
    })
    .on("error", (error) => {
      console.error("Error leyendo el archivo CSV:", error);
    });
};

// Ruta al archivo CSV
processCSV("./CheckfrontSales-imaginepuntacana FORMATEADO.csv");
