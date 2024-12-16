import { useEffect, useState } from "react";
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";
import '../../../css/dashboard.css'

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";

// Register chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);


const Dashboard = () => {

    const data = {
        labels: ["Red", "Blue", "Yellow", "Green"], // Labels for each slice
        datasets: [
          {
            label: "My Pie Chart",
            data: [300, 50, 100, 120], // Values for each slice
            backgroundColor: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00"], // Slice colors
            borderColor: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00"], // Border colors
            borderWidth: 1, // Border width
          },
        ],
      };
    
      const options = {
        responsive: true, // Makes the chart responsive
        plugins: {
          legend: {
            position: "top", // Position of the legend
          },
          tooltip: {
            enabled: true, // Enable tooltips
          },
        },
      };
    



    const [account, setAccount] = useState();

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            setAccount(JSON.parse(token));
        }
    };

    function handleDelete() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <div>
            <Topbar location="Dashboard"/>
           <div class="mainbarContent">
           <Sidebar />
           <Mainbar />
           </div>
            <button onClick={handleDelete}>Logout</button>
        </div>
    );
};

export default Dashboard;
