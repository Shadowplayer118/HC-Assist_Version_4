import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddModal = ({ visible, onClose, data }) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  // State to manage form input values
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [purok, setPurok] = useState('');
  const [household, setHousehold] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [bloodType, setBloodType] = useState('');

  // Populate form with existing data
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || '');
      setMiddleName(data.middle_name || '');
      setLastName(data.last_name || '');
      setAge(data.age || '');
      setBirthDate(data.birth_date || '');
      setGender(data.gender || '');
      setCivilStatus(data.civil_status || '');
      setPurok(data.purok || '');
      setHousehold(data.household || '');
      setContactNumber(data.contact_number || '');
      setBloodType(data.blood_type || '');
    }
  }, [data]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = {
      staff_id: data?.staff_id, // assuming staff_id exists in the data
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      age,
      birth_date: birthDate,
      gender,
      civil_status: civilStatus,
      purok,
      household,
      contact_number: contactNumber,
      blood_type: bloodType,
    };

    try {
      const response = await axios.post('http://localhost/HC-Assist_API/Admin/patient/add-Patient.php', formData);

      if (response.data.status === 'success') {
        alert('Patient updated successfully!');
        onClose(); // Close modal on success
      } else {
        alert('Failed to update patient.');
      }
    } catch (error) {
      console.error('Error updating patient:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className='add-modal'>
      <div className="add-modal-content">
        <button onClick={onClose}>
          <span className="close-add" id="close-add">
            &times;
          </span>
        </button>
        <h3>Edit Form</h3>
        <form onSubmit={handleSubmit} id="edit-form">
          <div className="input-right">
            <div className="steady">
              <input
                type="text"
                id="edit-staff_id"
                name="edit-staff_id"
                value={data?.staff_id || ''}
                style={{ display: 'none' }}
                readOnly
              />

              <div className="input-container">
                <label htmlFor="edit-first_name">First Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-first_name"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-middle_name">Middle Name:</label>
                <br />
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="last_name">Last Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-last_name"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="age-dateContainer">
                <div className="input-container">
                  <label htmlFor="age">Age:</label>
                  <br />
                  <input
                    type="text"
                    id="edit-age"
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="edit-bdate">Birthdate:</label>
                  <br />
                  <input
                    type="date"
                    id="edit-bdate"
                    name="bdate"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="gender-civilContainer">
                <div className="input-container">
                  <label htmlFor="gender">Gender:</label>
                  <br />
                  <select
                    id="edit-gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="input-container">
                  <label htmlFor="civil_status">Civil Status:</label>
                  <br />
                  <input
                    type="text"
                    id="edit-civil_status"
                    name="civil_status"
                    value={civilStatus}
                    onChange={(e) => setCivilStatus(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="edit-purok">Purok:</label>
                <br />
                <input
                  type="text"
                  id="edit-purok"
                  name="purok"
                  value={purok}
                  onChange={(e) => setPurok(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-household">Household:</label>
                <br />
                <input
                  type="text"
                  id="edit-household"
                  name="household"
                  value={household}
                  onChange={(e) => setHousehold(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-contact_number">Contact #:</label>
                <br />
                <input
                  type="text"
                  id="edit-contact_number"
                  name="contact_number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-blood_type">Blood Type:</label>
                <br />
                <input
                  type="text"
                  id="edit-blood_type"
                  name="blood_type"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  required
                />
              </div>

              <button type="submit" id="save-changes">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
