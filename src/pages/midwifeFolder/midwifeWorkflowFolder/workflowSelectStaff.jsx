import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectStaffModal = ({ visible, onClose}) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  const [StaffData, setStaffData] = useState(null); // Holds Staff data
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Tracks the selected card index
  const [selectedStaffId, setSelectedStaffId] = useState(null); // Tracks the selected Staff ID
const [selectedStaffName,setSelectedStaffName] = useState(null);
  

  // Fetch Staff data from API
  async function fetchStaffData() {
    try {
      const res = await axios.get(
        'http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/staff_folder/staff_load.php'
      );
      setStaffData(res.data);
    } catch (err) {
      console.error('Error fetching Staff data:', err);
    }
  }

  useEffect(() => {
    fetchStaffData();
    console.log(localStorage.getItem('SelectedStaffId'))
  }, []); // Fetch data only once when the component mounts

  // Handle card click to select Staff
  const handleCardClick = (index, id, name) => {
    setSelectedCardIndex(index);
    setSelectedStaffId(id);
    setSelectedStaffName(name);
  };

  // Finalize Staff selection and save to localStorage
  const finalizeSelection = () => {
    if (selectedStaffId) {
      localStorage.setItem('SelectedStaffId', selectedStaffId);
      localStorage.setItem('SelectedStaffName', selectedStaffName);

      console.log('Staff ID saved to localStorage:', selectedStaffId);
      
      onClose(); // Close modal after confirmation
    } else {
      console.log('No Staff selected!');
      alert('Please select a Staff before confirming.');
    }
  };



  return (
    <div className="selectStaff">
    <div className="selectStaff-modal">
      <div className="selectStaff-modalContent">
        <div className="selectStaff-title">Select Staff</div>

        {/* Search box (functionality not implemented yet) */}
        <div className="selectStaffsearch-box">
          <button className="selectStaff-search">Search</button>
          <input type="text" placeholder="Search Staffs..." />
        </div>

        {/* Staff cards */}
        <div className="selectStaff-cardContainer">
          {StaffData &&
            StaffData.map((data, index) => (
              <div
                className={`selectStaff-card ${
                  selectedCardIndex === index ? 'selected' : ''
                }`}
                key={index}
                onClick={() => handleCardClick(index, data.staff_id, data.first_name +' '+ data.last_name) }
              >
                <div className="selectStaff-Image">
                  <img src="/Images/blank_staff.jpg" alt="Staff" />
                </div>
                <div className="selectStaff-Name">
                  {data.first_name} {data.last_name}
                </div>
                <div className="selectStaff-Actions">
                  <button className="select">View</button>
                </div>
              </div>
            ))}
        </div>

        {/* Confirm and Close buttons */}
        <div className="selectStaff-btns">
          <button className="selectStaff-Confirm" onClick={finalizeSelection}>
            Confirm
          </button>
          <button className="selectStaff-Confirm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SelectStaffModal;
