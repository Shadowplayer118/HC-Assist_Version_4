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
