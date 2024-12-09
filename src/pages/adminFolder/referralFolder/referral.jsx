import { useEffect, useState } from "react";
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";
import '../../../css/dashboard.css'

const Referrals = () => {
    const [account, setAccount] = useState();

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        } else {
            setAccount(JSON.parse(token));
        }
    };
    
    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <div>
            <Topbar location="Referral"/>
           <div class="mainbarContent">
           <Sidebar />
          Refereal
           </div>
        </div>
    );
};

export default Referrals;
