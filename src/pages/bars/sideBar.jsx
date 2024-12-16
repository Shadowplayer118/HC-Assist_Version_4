import React, { useEffect } from "react";
// import "../styles/Sidebar.css";

function Sidebar() {
  // Use useEffect to add click event listeners and hover effect
  useEffect(() => {
    const linkElements = document.querySelectorAll(".link");

    // Function to handle the click event
    const handleLinkClick = (event) => {
      const anchor = event.currentTarget.querySelector("a");
      if (anchor) {
        window.location.href = anchor.href;
      }
    };

    // Function to change cursor to pointer on hover
    const handleMouseEnter = (event) => {
      event.currentTarget.style.cursor = "pointer";
    };

    // Function to reset cursor style on mouse leave
    const handleMouseLeave = (event) => {
      event.currentTarget.style.cursor = "default";
    };

    // Add the click event listener to each .link element
    linkElements.forEach(link => {
      link.addEventListener("click", handleLinkClick);
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    // Clean up the event listeners when the component is unmounted
    return () => {
      linkElements.forEach(link => {
        link.removeEventListener("click", handleLinkClick);
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
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
