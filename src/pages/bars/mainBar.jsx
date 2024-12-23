import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./piechart"; // Adjust the import path based on your structure
import '../../css/mainBar.css';

const Mainbar = () => {
  const [monitoringData, setMonitoringData] = useState(null);
  const [userData, setUserData] = useState({
    labels: [],
    datasets: [
      {
        label: "Purok",
        data: [],
        backgroundColor: [
          "rgb(249, 42, 87)",
          "rgb(57, 176, 255)",
          "rgb(255, 207, 86)",
          "rgb(184, 255, 41)",
          "rgb(156, 110, 247)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const fetchMonitoringData = async () => {
    try {
      const res = await axios.get(
        "http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/staff_folder/staff_load.php"
      );
      setMonitoringData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPurokData = async () => {
    try {
      const res = await axios.get(
        "http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/purok.php"
      );
      // Transform data for the chart
      const labels = res.data.map((data) => data.purok);
      const data = res.data.map((data) => data.count);
      setUserData((prevState) => ({
        ...prevState,
        labels,
        datasets: [{ ...prevState.datasets[0], data }],
      }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMonitoringData();
    fetchPurokData();
  }, []);

  return (
    <div className="main">
      <div className="main-container">
        {/* Modal Section */}
        {/* Main Top Section */}
        <div className="main-top">
          <div className="general-report-label">General Report</div>
          <div className="month-filter">Monthly V</div>
          <div className="monitoring-label">Monitoring</div>
          <button className="today">Today</button>
          <div className="disease-label">Disease</div>
        </div>

        {/* Main Bar Section */}
        <div className="main-bar">
          <div className="general-report-container">
            <div className="general-report">
              <div className="left">
                <span>Registered Patients</span>
                <div className="statistic-list">
                  <div className="stats">
                    <p>Referrals</p> <p id="ref-count">0</p>{" "}
                    <p id="ref-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Pregnant</p> <p id="preg-count">0</p>{" "}
                    <p id="preg-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Children</p> <p id="child-count">0</p>{" "}
                    <p id="child-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Diseased</p> <p id="dis-count">0</p>{" "}
                    <p id="dis-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Immunized</p> <p id="Im-count">0</p>{" "}
                    <p id="Im-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Total</p> <p id="total-count">0</p>{" "}
                    <p id="total-percent">n%</p>
                  </div>
                  <button className="generate-report">
                    <img
                      src="../assets/generate_report.png"
                      alt="Generate Report"
                    />
                    <div className="plus">+</div>
                  </button>
                </div>
              </div>
              <div className="right">
                <div className="month">
                  January 1, 2024 - January 30, 2024
                </div>
                <div className="Purokpie-chart" id="Purokpie-chart">
                  <PieChart chartData={userData} />
                </div>

                <table className="purok-list">
                  <tbody>
                    <tr>
                      <td className="purok-color">c</td>
                      <td className="purok-name">Purok 1</td>
                      <td className="purok-residence">0</td>
                      <td className="purok-percent">n%</td>
                    </tr>
                  </tbody>
                </table>
                <div className="total-container">
                  <div className="total-label">Total</div>
                  <div className="total-residence">0</div>
                  <div className="total-percent">n%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Monitoring Section */}
          <div className="monitoring-container">
            <div className="monitoring-content">
              {monitoringData &&
                monitoringData.map((data, index) => (
                  <div className="monitoring-card" key={index}>
                    <div className="monitoring-card-left">
                      <div className="monitoring-profile">
                        <img
                          src="../assets/profile.jpg"
                          alt="Profile"
                        />
                      </div>
                    </div>
                    <div className="monitoring-card-right">
                      <div className="monitoring-info">
                        <div className="monitoring-title">
                          {data.first_name} {data.last_name}
                        </div>
                        <div className="monitoring-subtitle">
                          {data.position}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Disease Section */}
          <div className="disease-container">
            <div className="disease">
              <h3>Status</h3>
              <div className="flag">Safe</div>
              <canvas className="pie-chart" id="pie-chart"></canvas>
              <table>
                <tbody>
                  <tr>
                    <td className="disease-name"></td>
                    <td className="disease-count"></td>
                    <td className="disease-percent"></td>
                  </tr>
                </tbody>
              </table>
              <h2>Total</h2>
              <div className="total-diseased">0</div>
              <div className="percent-disease">n%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
