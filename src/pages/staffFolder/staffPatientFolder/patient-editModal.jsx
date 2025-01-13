import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditModal = ({ visible, onClose, data }) => {
  if (!visible) return null;

  // State hooks for all fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [civilStatus, setCivilStatus] = useState('');
  const [household, setHousehold] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [purok, setPurok] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [phNum, setphNum] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const [preview, setPreview] = useState('');

  // Initialize states when data changes
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || '');
      setMiddleName(data.middle_name || '');
      setLastName(data.last_name || '');
      setAge(data.age || '');
      setBirthDate(data.birth_date || '');
      setGender(data.gender || '');
      setCivilStatus(data.civil_status || '');
      setHousehold(data.household || '');
      setContactNumber(data.contact_number || '');
      setPurok(data.purok || '');
      setBloodType(data.blood_type || '');
      setphNum(data.philhealthNum || '');
      setSelectedImage(data.image || '');

      
      
      // Set the image preview, check if there's an image path or fallback to default
      setPreview(`../../../php/${data.image}` || '../../Images/blank_patient.jpg');
      console.log(data);
    }
  }, [data]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('patient_id', data?.patient_id || ''); 
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

  formData.append('philhealthNum', phNum);
  

  // Append the selected image if it exists
  if (selectedImage) {
    formData.append('edit_image', selectedImage);
  } else {
    formData.append('edit_image', selectedImage); // default image path
  }

  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/patient/edit-Patient.php',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure it's set to multipart/form-data
        },
      }
    );

    if (response.data.status === 'success') {
      alert('Patient edited successfully!');
      onClose(); // Close modal on success
    } else {
      alert('Failed to edit patient.');
    }
  } catch (error) {
    console.error('Error editing patient:', error);
    alert('An error occurred.');
  }
};


  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h3 className='edit-modal-title'>Edit Patient</h3>
        <button type="button" className='edit-image-btn' onClick={() => document.getElementById('edit-image').click()}>
          Select Image
        </button>

        <form onSubmit={handleSubmit}>
          <div className="edit-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="edit-preview-container">
              {preview && <img className="edit-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='edit-image' name='edit-image' onChange={handleFileChange} />
          </div>

          <div className="edit-input-right">
            <input type="hidden" id="edit-patient_id" name="edit-patient_id" value={data?.patient_id || ''} readOnly />

            <div className="input-container">
              <label htmlFor="edit-first_name">First Name:</label>
              <input type="text" id="edit-first_name" name="edit-first_name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete='off' />
            </div>

            <div className="input-container">
              <label htmlFor="edit-middle_name">Middle Name:</label>
              <input type="text" id="edit-middle_name" name="edit-middle_name" value={middleName} onChange={(e) => setMiddleName(e.target.value)} required autoComplete='off' />
            </div>

            <div className="input-container">
              <label htmlFor="edit-last_name">Last Name:</label>
              <input type="text" id="edit-last_name" name="edit-last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete='off' />
            </div>

            <div className="input-container">
              <label htmlFor="last_name">PhilHealth Number:</label>
              <input type="text" id="add-last_name" name="last_name" value={phNum} onChange={(e) => setphNum(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="edit-input-squeeze">
              <div className="input-container">
                <label htmlFor="edit-age">Age:</label>
                <input type="text" id="edit-age" name="edit-age" value={age} onChange={(e) => setAge(e.target.value)} required autoComplete='off' />
              </div>

              <div className="input-container">
                <label htmlFor="edit-bdate">Birthdate:</label>
                <input type="date" id="edit-bdate" name="edit-bdate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required />
              </div>
            </div>

            <div className="edit-input-squeeze">
              <div className="input-container">
                <label htmlFor="edit-gender">Gender:</label>
                <select id="edit-gender" name="edit-gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="edit-civil_status">Civil Status:</label>
                <select id="edit-civil_status" name="edit-civil_status" value={civilStatus} onChange={(e) => setCivilStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
            </div>

            <div className="input-container">
              <label htmlFor="edit-household">Household:</label>
              <input type="text" id="edit-household" name="edit-household" value={household} onChange={(e) => setHousehold(e.target.value)} required autoComplete='off' />
            </div>

            <div className="input-container">
              <label htmlFor="edit-contact_number">Contact #:</label>
              <input type="text" id="edit-contact_number" name="edit-contact_number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required autoComplete='off' />
            </div>

            <div className="edit-input-squeeze">
              <div className="input-container">
                <label htmlFor="edit-purok">Purok:</label>
                <select id="edit-purok" name="edit-purok" value={purok} onChange={(e) => setPurok(e.target.value)} required>
                  <option value="">Select Purok</option>
                  <option value="Gumamela">Gumamela</option>
                  <option value="Rosasa">Rosasa</option>
                </select>
              </div>

              <div className="input-container">
                <label htmlFor="edit-blood_type">Blood Type:</label>
                <select id="edit-blood_type" name="edit-blood_type" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
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

            <button type="submit" id="save-changes" className="save-edit">Save Changes</button>
          </div>
        </form>

        <button onClick={onClose} className="close-edit">Close</button>
      </div>
    </div>
  );
};

export default EditModal;
