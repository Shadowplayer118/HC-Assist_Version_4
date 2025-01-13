import React, { useEffect } from "react";
import NotificationBadge from "../adminFolder/medicineFolder/medicine-Expiration";

function SidebarStaff() {
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
        <div className="link"><a href="/StaffDashboard">Dashboard</a></div>
        <div className="link"><a href="/Staffpatient">Patients</a></div>
        <div className="link"><a href="/Staffmedical">Medical Record</a></div>
        <div className="link"><a href="/Staffreferral">Referrals</a></div>
        <div className="link"><a href="/Staffcalendar">Calendar</a></div>
        <div className="link"><a href="/Staffpregnant">Pregnant</a></div>
        <div className="link"><a href="/Staffchild">Child Nutrition</a></div>
        <div className="link"><a href="/Staffdisease">Disease</a></div>
        <div className="link"><a href="/Staffimmunization">Immunization</a></div>
        <div className="link"><a href="/StaffWorkflow">Workflow</a></div>
        <div className="link">
          <a href="/Staffmedicine">
            Medicine
          
          </a>  <NotificationBadge />
        </div>
       
      </div>
    </div>
  );
}

export default SidebarStaff;
