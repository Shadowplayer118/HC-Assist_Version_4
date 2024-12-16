import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Labels for the pie chart
    datasets: [
      {
        data: data.values, // Values for each section of the pie
        backgroundColor: data.colors, // Background colors for each section
        borderWidth: 1, // Border width of each section
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
