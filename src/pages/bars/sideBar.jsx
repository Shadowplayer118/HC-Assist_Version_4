import React from "react";
// import "../styles/Sidebar.css";
function Sidebar() {
  return(
    <div className="side">
      <div className="side-bar">
        <div className="link"><a href="/dashboard">Dashboard</a></div>
        <div className="link"><a href="/patient">Patients</a></div>
        <div className="link"><a href="/referral">Referrals</a></div>
        <div className="link"><a href="/calendar">Calendar</a></div>
        <div className="link"><a href="/pregnant">Pregnant</a></div>
        <div className="link"><a href="/child">Child Nutrition</a></div>
        <div className="link"><a href="/disease">Disease</a></div>
        <div className="link"><a href="/immunization">Immunization</a></div>
        <div className="link"><a href="/workflow">Workflow</a></div>
        <div className="link"><a href="/medicine">Medicine</a></div>
        <div className="link"><a href="/staff">Staff</a></div>
      </div>
    </div>
  );
}
export default Sidebar;
