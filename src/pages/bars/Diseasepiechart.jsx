import React, { useRef, useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DPieChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const [legendItems, setLegendItems] = useState([]);

  // Update legend items after chart is rendered
  useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance || chartRef.current;
    if (chartInstance && chartInstance.legend?.legendItems) {
      setLegendItems(chartInstance.legend.legendItems);
    }
  }, [chartData]); // Re-run when chart data changes

  const renderCustomLegend = () => {
    if (!legendItems.length) return null;

    return (
      <div
        style={{
          backgroundColor: "white",
          maxHeight: "100px",
          width: "150px",
          overflowY: "scroll", // Enable vertical scrolling
          border: "1px solid #ccc",
          padding: "5px",
          marginTop: "10px",
          fontSize: "10px",
          borderRadius: "10px",
          scrollbarWidth: "none", // For Firefox
          msOverflowStyle: "none",
          position: "absolute",
          bottom: "-160px",
          left: "26px",
        }}
      >
        <table style={{ width: "100%", textAlign: "left" }}>
          <tbody>
            {legendItems.map((item, index) => (
              <tr key={index}>
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
    <div style={{ width: "220px", margin: "0 auto", textAlign: "center"}}>
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

export default DPieChart;
