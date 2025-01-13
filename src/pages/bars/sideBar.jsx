import React, { useEffect } from "react";
import NotificationBadge from "../adminFolder/medicineFolder/medicine-Expiration";

function Sidebar() {
  useEffect(() => {
    const linkElements = document.querySelectorAll(".link");

    const handleLinkClick = (event) => {
      const anchor = event.currentTarget.querySelector("a");
      if (anchor) {
        window.location.href = anchor.href;
      }

      // If a badge is clicked, ensure it disappears (optional behavior)
      const badge = event.currentTarget.querySelector(".NotificationBadge");
      if (badge) {
        badge.style.display = "none"; // Or any logic to hide the badge
      }
    };

    const handleMouseEnter = (event) => {
      const badge = event.currentTarget.querySelector(".NotificationBadge");
      event.currentTarget.style.cursor = "pointer";
      if (badge) badge.classList.add("hovered");
    };

    const handleMouseLeave = (event) => {
      const badge = event.currentTarget.querySelector(".NotificationBadge");
      event.currentTarget.style.cursor = "default";
      if (badge) badge.classList.remove("hovered");
    };

    linkElements.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      linkElements.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="side">
      <div className="side-bar">
        <div className="link"><img src="../../assets/icons/dashboard.png" alt="" /><a href="/dashboard">Dashboard</a></div>
        <div className="link"><img src="../../assets/icons/patient.png" alt="" /><a href="/patient">Patients</a></div>
        <div className="link"><img src="../../assets/icons/workflow.png" alt="" /><a href="/medical">Medical Record</a></div>
        <div className="link"><img src="../../assets/icons/referral.png" alt="" /><a href="/referral">Referrals</a></div>
        <div className="link"><img src="../../assets/icons/calendar.png" alt="" /><a href="/calendar">Calendar</a></div>
        <div className="link"><img src="../../assets/icons/pregnant.png" alt="" /><a href="/pregnant">Pregnant</a></div>
        <div className="link"><img src="../../assets/icons/child.png" alt="" /><a href="/child">Child Nutrition</a></div>
        <div className="link"><img src="../../assets/icons/disease.png" alt="" /><a href="/disease">Disease</a></div>
        <div className="link"><img src="../../assets/icons/immunization.png" alt="" /><a href="/immunization">Immunization</a></div>
        <div className="link"><img src="../../assets/icons/workflow.png" alt="" /><a href="/workflow">Workflow</a></div>
        
        <div className="link">
        <img src="../../assets/icons/medicine.png" alt="" />
          <a href="/medicine">
            Medicine
          
          </a>  <NotificationBadge />

        </div>
      
        <div className="link">  <img src="../../assets/icons/staff.png" alt="" /><a href="/staff">Staff</a></div>
      </div>
    </div>
  );
}

export default Sidebar;
