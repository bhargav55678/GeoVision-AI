import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const AnalysisTrendChart = ({ data }) => {
  if (!data || !data.daily_analyses) {
    return null;
  }

  const labels = data.daily_analyses.map(
    (item) => item.date
  );

  const values = data.daily_analyses.map(
    (item) => item.count
  );

  const chartData = {
    labels,

    datasets: [
      {
        label: "Analyses",
        data: values,

        borderColor: "#22d3ee",

        backgroundColor: "rgba(34, 211, 238, 0.15)",

        tension: 0.4,

        fill: true,

        pointBackgroundColor: "#22d3ee",

        pointBorderColor: "#0f172a",

        pointBorderWidth: 2,

        pointRadius: 5,

        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },

      tooltip: {
        callbacks: {
          label: (context) => {
            return ` Analyses: ${context.raw}`;
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },

        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#94a3b8",

          stepSize: 1,
        },

        grid: {
          color: "rgba(148, 163, 184, 0.1)",
        },
      },
    },
  };

 return (
  <div className="h-80">
    <Line
      data={chartData}
      options={options}
    />
  </div>
);
};

export default AnalysisTrendChart;