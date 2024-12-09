import React from "react";
// import "../styles/Sidebar.css";
function Sidebar() {
  return (
    <div className="side">
      <div className="side-bar">
        <div className="link"><a href="/dashboard">Dashboard</a></div>
        <div className="link"><a href="/patient">Patients</a></div>
        <div className="link"><a href="/referral">Referrals</a></div>
        <div className="link"><a href="/calendar">Calendar</a></div>
        <div className="link"><a href="/calendar">Pregnant</a></div>
        <div className="link"><a href="/calendar">Child Nutrition</a></div>
        <div className="link"><a href="/calendar">Disease</a></div>
        <div className="link"><a href="/calendar">Immunization</a></div>
        <div className="link"><a href="/calendar">Workflow</a></div>
        <div className="link"><a href="/calendar">Medicine</a></div>
        <div className="link"><a href="/calendar">Staff</a></div>
      </div>
    </div>
  );
}
export default Sidebar;
