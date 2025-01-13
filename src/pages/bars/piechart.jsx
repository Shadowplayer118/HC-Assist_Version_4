import React, { useRef } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ chartData }) => {
  const chartRef = useRef(null);

  const renderCustomLegend = () => {
    const chartInstance = chartRef.current?.chartInstance || chartRef.current;
    if (!chartInstance) return null;

    const legendItems = chartInstance.legend?.legendItems || [];
    return (
      <div className="Legend"
        style={{
          backgroundColor:"white",
          maxHeight: "100px",
          width: "150px", // Set maximum height for legend container
          overflowY: "scroll", // Enable vertical scrolling
          border: "1px solid #ccc", // Optional: Add a border for better visibility
          padding: "0px",
          marginTop: "0px",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none",
          fontSize: "10px",
          borderRadius: "10px",
          zIndex:"100",
          position: "absolute",
          top: "190px",
          left: "27px",
        // Center the legend horizontally and vertically
        }}
      >
        <table style={{ width: "100%", textAlign: "left" }}>
          <tbody>
            {legendItems.map((item, index) => (
              <tr key={index}
           
              >
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      
                      backgroundColor: item.fillStyle,
                      marginRight: "8px",
                    }}
                  />
                </td>
                <td>{item.text}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ width: "220px", margin: "0 auto", textAlign: "center" }}>
      <div style={{ width: "200px", height: "200px", margin: "0 auto" }}>
        <Pie
          ref={chartRef}
          data={chartData}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: false, // Disable the default legend
              },
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      </div>
      {renderCustomLegend()} {/* Render the custom legend */}
    </div>
  );
};

export default PieChart;
