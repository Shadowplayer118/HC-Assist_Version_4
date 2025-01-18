import React, { useEffect, useState } from "react";
import axios from "axios";
import PieChart from "./piechart"; // Adjust the import path based on your structure
import "../../css/mainBar.css";

import DPieChart from "./Diseasepiechart"; // Adjust the import path based on your structure
import ReportTable from "../adminFolder/dashboardFolder/monthlyReport";


const Mainbar = () => {
  



const [monitorSched,setMonitoringSched] = useState([]);
  const [monitoringData, setMonitoringData] = useState(null);
  const [diseaseMonitorData, setDiseaseMonitorData] = useState(null);
  const[isOpenModal,setIsOpenModal] = useState(false);
  


  
  useEffect(() => {
    fetchDiseaseMonitorData();
    fetchMonitoringData();
    fetchPurokData();
    fetchDiseaseData();
    fetchMonitoringSched();

    console.log(diseaseMonitorData);
    console.log("FLG");

  }, [diseaseMonitorData]);
  

  function openReport(){
    setIsOpenModal(true);
  }




  const fetchDiseaseMonitorData = async () => {
    try {
      const response = await axios.get(
        "http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/diseaseMonitor.php"
      );
      setDiseaseMonitorData(response.data);
      console.log(response.data); // Log after setting state
    } catch (error) {
      console.error("Error fetching disease monitor data:", error);
    }
  };
  
  

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

  const [diseaseData, setDiseaseData] = useState({
    labels: [],
    datasets: [
      {
        label: "Diseases",
        data: [],
        backgroundColor: [
          "rgb(249, 42, 87)",
          "rgb(57, 176, 255)",
          "rgb(255, 207, 86)",
          "rgb(184, 255, 41)",
          "rgb(156, 110, 247)",
        ],

        // borderColor: [
        //   "rgb(0, 0, 0)", // Red border
        //  // Purple border
        // ],
        
        borderWidth: 1,
        
        
      },
    ],
  });



  const fetchMonitoringSched = async () => {
    try {
      const monitoring = await axios.get("http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/monitoring.php");
      setMonitoringSched(monitoring.data);
    } catch (error) {
      console.error(error);
    }
  };


  const fetchMonitoringData = async () => {
    try {
      const res = await axios.get(
        "http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/staff_folder/staff_load.php"
      );
      setMonitoringData(res.data);
    } catch (err) {
      console.error("Error fetching monitoring data:", err);
    }
  };
  
  const fetchPurokData = async (filterType) => {
    try {
      const res = await axios.get(
        `http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/purok.php?filter=${filterType}`
      );
      const labels = res.data.map((item) => item.purok);
      const data = res.data.map((item) => item.count);
      setUserData((prevState) => ({
        ...prevState,
        labels,
        datasets: [{ ...prevState.datasets[0], data }],
      }));
    } catch (err) {
      console.error("Error fetching Purok data:", err);
    }
  };
  

  const fetchDiseaseData = async () => {
    try {
      const res = await axios.get(
        "http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/dashboard/diseaseCount.php"
      );
      const labels = res.data.map((item) => item.purok);
      const data = res.data.map((item) => item.count);
      setDiseaseData((prevState) => ({
        ...prevState,
        labels,
        datasets: [{ ...prevState.datasets[0], data }],
      }));
    } catch (err) {
      console.error("Error fetching disease data:", err);
    }
  };



  const getCardColorClass = (scheduleType) => {
    switch (scheduleType) {
      case 'Contagious Disease':
        return 'blue-bg'; // Green for Contagious Disease
      case 'Immunization':
        return 'green-bg'; // Yellow for Immunization
      case 'Pregnancy':
        return 'red-bg'; // Red for Pregnancy
      default:
        return ''; // Default (no color change) if no match
    }
  };
  

  return (
    <div className="main">
        <ReportTable visible={isOpenModal} onClose={() => setIsOpenModal(false)}/>
      <div className="main-container">
        {/* Main Top Section */}
        <div className="main-top">
          <div className="general-report-label">General Report</div>
         
          <select
  name="Purok-Data"
  id="Purok-Data"
  className="month-filter"
  onChange={(e) => fetchPurokData(e.target.value)}
>
  <option value="Purok">Purok</option>
  <option value="Disease">Disease</option>
  <option value="Pregnant">Pregnant</option>
  <option value="Children">Children</option>
  <option value="Senior">Senior</option>
</select>

          <div className="monitoring-label">Monitoring</div>
          <button className="today">Today</button>
          <div className="disease-label">Disease</div>
        </div>

        {/* Main Bar Section */}
        <div className="main-bar">
      
          {/* General Report Section */}
          <div className="general-report-container">
            <div className="general-report">
              <div className="left">
                <span>Registered Patients</span>
                <div className="statistic-list">
                  <div className="stats">
                    <p>Referrals</p>
                    <p id="ref-count">0</p>
                    <p id="ref-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Pregnant</p>
                    <p id="preg-count">0</p>
                    <p id="preg-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Children</p>
                    <p id="child-count">0</p>
                    <p id="child-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Diseased</p>
                    <p id="dis-count">0</p>
                    <p id="dis-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Immunized</p>
                    <p id="Im-count">0</p>
                    <p id="Im-per">n%</p>
                  </div>
                  <div className="stats">
                    <p>Total</p>
                    <p id="total-count">0</p>
                    <p id="total-percent">n%</p>
                  </div>
                  <button className="generate-report"  onClick={() => openReport()}>
                  
                    <img
                      src="../assets/generate_report.png"
                      alt="Generate Report"
                    />
                    <div className="plus">+</div>
                  </button>
                </div>
              </div>
              <div className="right">
                <div className="perPurok">
                 Patients Per Purok
                </div>
                <div className="Purokpie-chart" id="Purokpie-chart">
                  <PieChart chartData={userData} />
                </div>
                {/* <table className="purok-list">
                  <tbody>
                    <tr>
                      <td className="purok-color">c</td>
                      <td className="purok-name">Purok 1</td>
                      <td className="purok-residence">0</td>
                      <td className="purok-percent">n%</td>
                    </tr>
                  </tbody>
                </table> */}
               
              </div>
            </div>
          </div>

          {/* Monitoring Section */}
          <div className="monitoring-container">
            <div className="monitoring-content">

    {monitorSched && monitorSched.length > 0? (
monitorSched &&
  monitorSched.map((data, index) => (
    <div className={`monitoring-card ${getCardColorClass(data.schedule_type)}`} key={index}>
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
            {data.activity}
          </div>
        </div>
      </div>
    </div>
  ))
    )
    :(
      
      <div className="activityDate-activity">
        <div className="">
        <div className="noActiviy-text">No Activities Today</div>
        <div className="noActiviy-image"><img src="/Images/happy_nurse.jpg" alt=""/></div>

      
        </div>
      </div>   
    )}

            </div>
          </div>

          {/* Disease Section */}
          <div className="disease-container">
            <div className="disease">
              <div className="squeez">
                <h3>Status:</h3>
                <div className="flag">
  

                {diseaseMonitorData && (
  <img
    src={
      diseaseMonitorData === "    Danger"
        ? "/assets/icons/redFlag.png"
        : diseaseMonitorData === "    Warning"
        ? "/assets/icons/yellowFlag.png"
        : diseaseMonitorData === "    Safe"
        ? "/assets/icons/greenFlag.png"
        : "/assets/icons/defaultFlag.png"
    }
    alt="Flag"
  />
  
)}
<div className="statusTitle">{diseaseMonitorData}</div>




                </div>
              </div>
              <div className="Diseasepie-chart" id="Diseasepie-chart">
                <DPieChart chartData={diseaseData} />
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="disease-name"></td>
                    <td className="disease-count"></td>
                    <td className="disease-percent"></td>
                  </tr>
                </tbody>
              </table>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainbar;
