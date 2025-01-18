import { useNavigate } from "react-router-dom"; // Import useNavigate
import '../../css/topBar.css';
import axios from "axios";
import { useEffect, useState } from "react";

function Topbar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [image, setImage] = useState(null); // Profile image state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigate function

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const logId = localStorage.getItem('logId');
    const logPosition = localStorage.getItem('logPosition');
    console.log(logPosition);
    console.log(logId);

    

    if (logId && logPosition) {
      axios
        .post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/bars/profilePic.php', {
          id: logId,
          position: logPosition,
        })
        .then((response) => {
          if (response.data.success) {
            // Set the image or a default fallback
            const imagePath = response.data.image
              ? `http://localhost/HC-Assist_Version_4/php/${response.data.image}`
              : '/Images/blank_patient.jpg';
            setImage(imagePath);
          } else {
            setError(response.data.message || "Failed to fetch profile picture.");
          }
        })
        .catch((err) => {
          setError('Error fetching image: ' + err.message);
        });
    } else {
      setError('No logId or logPosition found in localStorage.');
    }
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    localStorage.clear();   // Optionally, clear local storage if used
    navigate("/login");     // Redirect to login page
  };

  return (
    <div className="top">
      <div className="top-content">
        <h1 className="title">HC-Assist</h1>
        <h1 className="location">Application &gt; {props.location}</h1>
        <div className="profile" onClick={toggleModal}>
          <img src={image || '/Images/blank_patient.jpg'} alt="Profile" />
        </div>
      </div>

      {/* Display Error Message */}
      {/* {error && <p className="error">{error}</p>} */}

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
