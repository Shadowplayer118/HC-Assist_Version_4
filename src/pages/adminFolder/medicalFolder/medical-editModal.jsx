import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/child.css'
import '../../../css/medical.css'



const ViewMedical = ({ visible, onClose, data }) => {
  if (!visible) return null;

  // State hooks for all fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [Weight, setWeight] = useState('');
  const [Height, setHeight] = useState('');
  const [BP, setBP] = useState('');
  const [HR, setHR] = useState('');
  const [Temp, setTemp] = useState('');
  const [Status, setStatus] = useState('');
  const [MedicalId, setMedicalId] = useState('');
  
  const [newHistory, setNewHistory] = useState(false);


  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('/Images/blank_patient.jpg');
  const patient_name = firstName+" " +lastName;

  const staff_id = localStorage.getItem('logId');


  // Initialize states when data changes
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setWeight(data.weight || '');
      setHeight(data.height || '');
      setBP(data.blood_pressure || '');
      setHR(data.heart_rate || '');
      setTemp(data.temperature || '');
      setStatus(data.medical_status || ''); 
      setMedicalId(data.medical_id || '');
      // Set the image preview, check if there's an image path or fallback to default
      setPreview(`../../../php/${data.image}` || '/Images/blank_patient.jpg');
      console.log(data);
    }
  }, [data]);

  function handleRecordType(bool){
      if(bool == true){
        setNewHistory(true);
      }

      else{
        setNewHistory(false);
      }
  }

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
  formData.append('medical_id', data?.medical_id || '');
  formData.append('patient_status', Status);
  formData.append('weight', Weight);
  formData.append('height', Height);
  formData.append('blood_pressure', BP);
  formData.append('heart_rate', HR);
  formData.append('temperature', Temp);
  formData.append('staff_id', staff_id);
  

if(newHistory == true){
  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/medical/medicalNewHistory.php',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure it's set to multipart/form-data
        },
      }
    );

    if (response.status = 'success') {
      alert('Patient edited successfully!');
      console.log(response.data.status);
      onClose(); // Close modal on success
    } else {
      alert('Failed to edit patient.');
    }
  } catch (error) {
    console.error('Error editing patient:', error);
    alert('An error occurred.');
  }
}

else{

  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/medical/medicalEdit.php',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure it's set to multipart/form-data
        },
      }
    );

    if (response.status = 'success') {
      alert('Patient edited successfully!');
      console.log(response.data.status);
      onClose(); // Close modal on success
    } else {
      alert('Failed to edit patient.');
    }
  } catch (error) {
    console.error('Error editing patient:', error);
    alert('An error occurred.');
  }
}
 
};


  return (
    <div className="addDisease-modal">
      <div className="addDisease-modal-content">
        <h3 className='addDisease-modal-title'>Disease Information</h3>
 

        <form onSubmit={handleSubmit}>
          <div className="addDisease-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="addDisease-preview-container">
              {preview && <img className="addDisease-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='addDisease-image' name='addDisease-image' onChange={handleFileChange} />
          </div>


          <div className="addDisease-input-right Fix-inputRightDiseaseAdd">
            <input type="hidden" id="addDisease-patient_id" name="disease_patient_id" value={data?.patient_id || ''} readOnly/>

            <div className="input-container">
              <label htmlFor="addDisease-first_name">Patient Name:</label>
              <input type="text" id="addDisease-first_name" name="addDisease-first_name" value={patient_name} onChange={(e) => setFirstName(e.target.value)} required autoComplete='off'   disabled='true' />
            </div>


        

              <div className="addDisease-input-squeeze small-label">

              <div className="input-container">
              <label htmlFor="addDisease-last_name">Weight:</label> <br />
              <input type="number" id="child-weight" name="disease_patient_name"  value={Weight} onChange={(e) => setWeight(e.target.value)} required autoComplete='off'  />
            </div>

            <div className="input-container">
              <label htmlFor="addDisease-last_name">Height:</label> <br />
              <input type="number" id="child-height" name="disease_patient_name" value={Height} onChange={(e) => setHeight(e.target.value)} required autoComplete='off'  />
            </div>

              </div>

              <div className="addDisease-input-squeeze small-label">

              <div className="input-container">
              <label htmlFor="addDisease-last_name">Blood Pressure:</label><br />
              <input type="number" id="child-bp" name="disease_patient_name" value={BP} onChange={(e) => setBP(e.target.value)} required autoComplete='off'  />
            </div>

            <div className="input-container">
              <label htmlFor="addDisease-last_name">Heart Rate:</label><br />
              <input type="number" id="child-heartR" name="disease_patient_name" value={HR} onChange={(e) => setHR(e.target.value)} required autoComplete='off'  />
            </div>

            <div className="input-container">
              <label htmlFor="addDisease-last_name">Temperature:</label><br />
              <input type="number" id="child-temp" name="disease_patient_name" value={Temp} onChange={(e) => setTemp(e.target.value)} required autoComplete='off'  />
            </div>

              </div>

              <div className="input-container">
                <label htmlFor="addDisease-blood_type">Patient Status:</label> <br />
                <select id="child-status" name="disease_status" value={Status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="GOOD">GOOD</option>
                  <option value="BAD">BAD</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>

            <button type="submit" id="save-changes" className="save-addDisease" onClick={() => handleRecordType(false)}>Save Changes</button>
            <button type="submit" id="save-changes" className="save-addDisease newMedicalRecord"  onClick={() => handleRecordType(true)}>Save and Record</button>
          </div>
        </form>

        <button onClick={onClose} className="close-addDisease">Close</button>
      </div>
    </div>
  );
};

export default ViewMedical;
