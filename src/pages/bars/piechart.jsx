import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  return (
    <div style={{ width: "200px", height: "200px", margin: "0 auto" }}> {/* Set fixed size */}
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false, // Disable default aspect ratio to use custom dimensions
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 10, // Adjust font size for legend
                },
              },
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
