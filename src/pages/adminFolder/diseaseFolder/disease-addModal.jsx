import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/disease.css'


const EditModal = ({ visible, onClose, data }) => {
  if (!visible) return null;

  // State hooks for all fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [diseaseName, setDiseaseName] = useState('');
  const [diseaseStatus, setDiseaseStatus] = useState('');
  const [diseaseStage, setDiseaseStage] = useState('');
  const [diseaseSched, setDiseaseSched] = useState('');

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const patient_name = firstName+" " +lastName

  // Initialize states when data changes
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');

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
  formData.append('disease_patient_id', data?.patient_id || ''); 
  formData.append('disease_patient_name', diseaseName);
  formData.append('disease_status', diseaseStatus);
  formData.append('disease_stage', diseaseStage);
  formData.append('disease_treatmentSched', diseaseSched);


  // Append the selected image if it exists

  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/disease/disease_add.php',
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

            <div className="input-container">
              <label htmlFor="addDisease-last_name">Disease:</label>
              <input type="text" id="addDisease-last_name" name="disease_patient_name"  onChange={(e) => setDiseaseName(e.target.value)} required autoComplete='off'  />
            </div>

            

              <div className="input-container">
              <label htmlFor="addDisease-household">Disease Stage:</label>
              <input type="text" id="addDisease-household" name="disease_stage" onChange={(e) => setDiseaseStage(e.target.value)} required autoComplete='off' />
            </div>

         
            <div className="addDisease-input-squeeze">

           

            </div>

               <div className="input-container">
                <label htmlFor="addDisease-bdate">Treatment Schedule:</label>
                <input type="date" id="addDisease-bdate" name="disease_treatmentSched"  onChange={(e) => setDiseaseSched(e.target.value)} required />
              </div>

              <div className="input-container">
                <label htmlFor="addDisease-blood_type">Disease Status:</label> <br />
                <select id="addDisease-blood_type" name="disease_status" onChange={(e) => setDiseaseStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="MILD">MILD</option>
                  <option value="SEVERE">SEVERE</option>
                  <option value="CURED">CURED</option>
                </select>
              </div>


            <div className="addDisease-input-squeeze">
            
             
            </div>

          

            

            

            <button type="submit" id="save-changes" className="save-addDisease">Save Changes</button>
          </div>
        </form>

        <button onClick={onClose} className="close-addDisease">Close</button>
      </div>
    </div>
  );
};

export default EditModal;
