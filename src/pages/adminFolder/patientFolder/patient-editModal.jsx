import React, { useEffect, useState } from 'react';

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

  // Initialize states when `data` changes
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
    }
  }, [data]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the updated data to send back
    const updatedData = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      age,
      birth_date: birthDate,
      gender,
      civil_status: civilStatus,
      household,
      contact_number: contactNumber,
      purok,
      blood_type: bloodType,
    };

    console.log('Updated Data:', updatedData);
    // Submit the data or pass it to the parent component
    // Example: pass to a prop function like onSave(updatedData);
    onClose();
  };

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <h3 className='edit-modal-title'>Edit Patient</h3>
        <form onSubmit={handleSubmit}>
          <div className="edit-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="edit-preview-container">
              <img className='edit-preview' src="" alt="" />
            </div>
            <button type="button" className='edit-image'>Choose Image</button>
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
                  <option value="Orchid">Rosasa</option>
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

            <button type="submit" id="save-changes" className="save-edit">
              Save Changes
            </button>
          </div>
        </form>

        <button onClick={onClose} className="close-edit">
          Close
        </button>
      </div>
    </div>
  );
};

export default EditModal;
