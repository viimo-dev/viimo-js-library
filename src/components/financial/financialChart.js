import Chart from 'chart.js/auto';

export class ChartComponent {
  constructor(canvasId, type, data, customOptions = {}) {
    this.canvasId = canvasId;
    this.type = type;
    this.data = data;

    // Configuración básica que puede ser sobrescrita
    this.defaultOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: { color: '#fff' },
          grid: { display: false },
        },
        y: {
          ticks: { color: '#fff' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
        },
      },
      plugins: {
        legend: {
          labels: { color: '#fff' },
        },
        tooltip: { enabled: true },
      },
    };

    // Fusionar opciones por defecto con opciones personalizadas
    this.options = { ...this.defaultOptions, ...customOptions };

    // Renderizar el gráfico
    this.renderChart();
  }

  renderChart() {
    const ctx = document.getElementById(this.canvasId).getContext('2d');
    new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: this.options,
    });
  }
}
