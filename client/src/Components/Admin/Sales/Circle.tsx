import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PluginOptionsByType,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js/auto";

ChartJS.register(ArcElement, Tooltip, Legend);
const user = [
  { id: 1, nombre: "Pedro", totalCompra: 185 },
  { id: 2, nombre: "Juan", totalCompra: 180 },
  { id: 3, nombre: "Jacinta", totalCompra: 180 },
];
const data = {
  labels: user.map((item) => item.nombre),
  datasets: [
    {
      data: user.map((item) => item.totalCompra),
      backgroundColor: ["#9086f8", "#f7d87b", "#f5779c"],
      borderColor: "#3a3b5b",
    },
  ],
};

const options: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      onClick: (_, legendItem, legend) => {
        if (legendItem && legend) {
          console.log(`Clic en la leyenda: ${legendItem.text}`);
          console.log(`Índice de la leyenda: ${legendItem.index}`);
          console.log(
            `Estado de la leyenda: ${legendItem.hidden ? "oculto" : "visible"}`,
          );
          console.log(`Lista de todas las leyendas:`, legend.legendItems);
        }
      },
    },
  },
};
const Circle = () => {
  return (
    <div className="flex flex-col p-6 ">
      <p className="text-2xl pb-4">Area</p>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Circle;
