import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectPatientModal = ({ visible, onClose}) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  const [patientData, setPatientData] = useState(null); // Holds patient data
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Tracks the selected card index
  const [selectedPatientId, setSelectedPatientId] = useState(null); // Tracks the selected patient ID
const [selectedPatientName,setSelectedPatientName] = useState(null);
  

  // Fetch patient data from API
  async function fetchPatientData() {
    try {
      const res = await axios.get(
        'http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_load.php'
      );
      setPatientData(res.data);
    } catch (err) {
      console.error('Error fetching patient data:', err);
    }
  }

  useEffect(() => {
    fetchPatientData();
    console.log(localStorage.getItem('SelectedPatientId'))
  }, []); // Fetch data only once when the component mounts

  // Handle card click to select patient
  const handleCardClick = (index, id, name) => {
    setSelectedCardIndex(index);
    setSelectedPatientId(id);
    setSelectedPatientName(name);
  };

  // Finalize patient selection and save to localStorage
  const finalizeSelection = () => {
    if (selectedPatientId) {
      localStorage.setItem('SelectedPatientId', selectedPatientId);
      localStorage.setItem('SelectedPatientName', selectedPatientName);

      console.log('Patient ID saved to localStorage:', selectedPatientId);
      
      onClose(); // Close modal after confirmation
    } else {
      console.log('No patient selected!');
      alert('Please select a patient before confirming.');
    }
  };



  return (
    <div className="selectPatient">
      <div className="selectPatient-modal">
        <div className="selectPatient-modalContent">
          <div className="selectPatient-title">Select Patient</div>

          {/* Search box (functionality not implemented yet) */}
          <div className="selectPatientsearch-box">
            <button className="selectPatient-search">Search</button>
            <input type="text" placeholder="Search patients..." />
          </div>

          {/* Patient cards */}
          <div className="selectPatient-cardContainer">
            {patientData &&
              patientData.map((data, index) => (
                <div
                  className={`selectPatient-card ${
                    selectedCardIndex === index ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => handleCardClick(index, data.patient_id, data.first_name +' '+ data.last_name) }
                >
                  <div className="selectPatient-Image">
                    <img src="/Images/blank_patient.jpg" alt="Patient" />
                  </div>
                  <div className="selectPatient-Name">
                    {data.first_name} {data.last_name}
                  </div>
                  <div className="selectPatient-Actions">
                    <button className="select">View</button>
                  </div>
                </div>
              ))}
          </div>

          {/* Confirm and Close buttons */}
          <div className="selectPatient-btns">
            <button className="selectPatient-Confirm" onClick={finalizeSelection}>
              Confirm
            </button>
            <button className="selectPatient-Confirm" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPatientModal;
