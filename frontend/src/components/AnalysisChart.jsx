import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


const AnalysisChart = ({ data }) => {

  if (!data) {
    return null;
  }


  const chartData = {
    labels: [
      "Changes Detected",
      "No Change",
    ],

    datasets: [
      {
        data: [
          data.changes_detected,
          data.no_change,
        ],

        backgroundColor: [
          "#f87171",
          "#4ade80",
        ],

        borderColor: [
          "#0f172a",
          "#0f172a",
        ],

        borderWidth: 3,
      },
    ],
  };


  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        position: "bottom",

        labels: {
          color: "#cbd5e1",

          padding: 20,

          font: {
            size: 14,
          },
        },
      },


      tooltip: {

        callbacks: {

          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },

        },

      },

    },

  };


  return (

    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-lg mt-8">

      <h2 className="text-2xl font-bold text-white mb-2">
        Analysis Breakdown
      </h2>


      <p className="text-slate-400 mb-6">
        Distribution of detected changes across all analyses
      </p>


      <div className="h-80 flex justify-center">

        <Doughnut
          data={chartData}
          options={options}
        />

      </div>

    </div>

  );

};


export default AnalysisChart;