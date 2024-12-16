import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../../css/topBar.css';

function Topbar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear any session data or authentication tokens
    sessionStorage.clear(); // Clear session storage
    localStorage.clear();   // Optionally, clear local storage if used
    navigate("/login");     // Redirect to login page (make sure your route is correct)
  };

  return (
    <div className="top">
      <div className="top-content">
        <h1 className="title">HC-Assist</h1>
        <h1 className="location">Application &gt; {props.location}</h1>
        <div className="profile" onClick={toggleModal}>
          <img src="../assets/profile.jpg" alt="Profile" />
        </div>
      </div>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Profile Information</h2>
            <p>This is where profile information or settings can go.</p>
            <button onClick={handleLogout}>Logout</button> {/* Attach the logout handler */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Topbar;
