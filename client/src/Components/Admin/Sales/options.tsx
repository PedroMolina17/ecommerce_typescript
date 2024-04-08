const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "#ffffff",
      },
    },
    title: {
      display: true,
      text: "2024",
      color: "#ffffff",
    },
  },
  scales: {
    x: {
      type: "category" as const,
      ticks: {
        color: "#ffffff",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "#ffffff",
      },
    },
  },
};

export default options;
