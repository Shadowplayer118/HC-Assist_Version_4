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
  const [selectedImage, setSelectedImage] = useState('../../Images/blank_patient.jpg');
  const [preview, setPreview] = useState('../../Images/blank_patient.jpg');

  // Populate form with existing data if available
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = new FormData();
    formData.append('patient_id', data?.patient_id || ''); // patient_id
    formData.append('first_name', firstName);
    formData.append('middle_name', middleName);
    formData.append('last_name', lastName);
    formData.append('age', age);
    formData.append('birth_date', birthDate);
    formData.append('gender', gender);
    formData.append('civil_status', civilStatus);
    formData.append('purok', purok);
    formData.append('household', household);
    formData.append('contact_number', contactNumber);
    formData.append('blood_type', bloodType);

    // Append the selected image if it exists
    if (selectedImage && selectedImage !== '../../Images/blank_patient.jpg') {
      formData.append('add_image', selectedImage);
    } else {
      formData.append('add_image', '../../Images/blank_patient.jpg'); // default image path
    }

    try {
      const response = await axios.post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/patient/add-Patient.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); 
      if (response.data.status === 'success') {
        alert('Patient added successfully!');
        onClose(); // Close modal on success
      } else {
        alert('Failed to add patientss.');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className='add-modal'>
      <div className="add-modal-content">
        <h3 className='add-modal-title'>Add Patient</h3>
        <button className='add_image-btn' onClick={() => document.getElementById('add_image').click()}>Choose Image</button>

        <form onSubmit={handleSubmit}>
          <div className="add-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="add-preview-container">
              {preview && <img className="add-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='add_image' name='add_image' onChange={handleFileChange} />
          </div>

          <div className="add-input-right">
            <div className="steady">
              <input type="text" id="add-patient_id" name="add-patient_id" value={data?.patient_id || ''} style={{ display: 'none' }} readOnly />
            </div>
            <div className="input-container">
              <label htmlFor="add-first_name">First Name:</label>
              <input type="text" id="add-first_name" name="first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="input-container">
              <label htmlFor="add-middle_name">Middle Name:</label>
              <input type="text" id="middle_name" name="middle_name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="input-container">
              <label htmlFor="last_name">Last Name:</label>
              <input type="text" id="add-last_name" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="add-input-squeeze">
              <div className="input-container">
                <label htmlFor="age">Age:</label>
                <input type="text" id="add-age" name="age" value={age} onChange={(e) => setAge(e.target.value)} required autoComplete='off'/>
              </div>

              <div className="input-container">
                <label htmlFor="add-bdate">Birthdate:</label>
                <input type="date" id="add-bdate" name="bdate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required/>
              </div>
            </div>

            <div className="add-input-squeeze">
              <div className="input-container">
                <label htmlFor="gender">Gender:</label>
                <select id="add-gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="civil_status">Civil Status:</label>
                <select id="add-civil_status" name="civil_status" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)} required>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="add-household">Household:</label>
              <input type="text" id="add-household" name="household" value={household} onChange={(e) => setHousehold(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="input-container">
              <label htmlFor="add-contact_number">Contact #:</label>
              <input type="text" id="add-contact_number" name="contact_number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="add-input-squeeze">
              <div className="input-container">
                <label htmlFor="add-purok">Purok:</label>
                <select id="add-purok" name="purok" value={purok} onChange={(e) => setPurok(e.target.value)} required>
                  <option value="">Select Purok</option>
                  <option value="Gumamela">Gumamela</option>
                  <option value="Orchid">Orchid</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="add-blood_type">Blood Type:</label>
                <select id="add-blood_type" name="blood_type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
                  <option value="">Select Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <button type="submit" id="save-changes" className="save-add">Save Changes</button>
          </div>
        </form>
        <button onClick={onClose}>
          <span className="close-add" id="close-add">Close</span>
        </button>
      </div>
    </div>
  );
};

export default AddModal;
