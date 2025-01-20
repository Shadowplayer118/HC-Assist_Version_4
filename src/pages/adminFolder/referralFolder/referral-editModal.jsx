import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/referral.css'
import PrintReferral from './referral-print';



const ViewReferral = ({ visible, onClose, data }) => {
  if (!visible) return null;

  // State hooks for all fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');

  const [referralName, setReferralName] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  const [diseaseStage, setDiseaseStage] = useState('');
  const [referralDate, setReferralDate] = useState('');

  const [Description, setDescription] = useState('');


  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const patient_name = firstName+" " +lastName

  const staff_id = localStorage.getItem('logId');



  const [showPrintModal, setShowPrintModal] = useState(false);

 





  // Initialize states when data changes
  useEffect(() => {
    if (data) {
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');
      setDescription(data.description || '');
      setReferralDate(data.referral_date || '');
      setApprovalStatus(data.approval_status || '');


      // Set the image preview, check if there's an image path or fallback to default
      setPreview(`../../../php/${data.image}` || '../../Images/blank_patient.jpg');
      console.log(data);
    }
  }, [data]);


  const handleOpenPrintModal = () => {
    setShowPrintModal(true); // Show the print modal
  };

  const handleClosePrintModal = () => {
    setShowPrintModal(false); // Hide the print modal
  };



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
  formData.append('referral_patient_id', data?.patient_id || ''); 
  formData.append('referralName', referralName);
  formData.append('approvalStatus', approvalStatus);
  formData.append('referralDate', referralDate);
  formData.append('staff_id', staff_id);



  // Append the selected image if it exists

  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/referral/referral_add.php',
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
    <div className="addReferral-modal">

<PrintReferral
        visible={showPrintModal}
        onClose={handleClosePrintModal}
        data={data}
      />
      <div className="addReferral-modal-content">
        <h3 className='addReferral-modal-title'>Referral Information</h3>
 

        <form onSubmit={handleSubmit}>
          <div className="addReferral-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="addReferral-preview-container">
            {preview && <img className="edit-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='addReferral-image' name='addReferral-image' onChange={handleFileChange} />
          </div>


          <div className="addReferral-input-right Fix-inputRightDiseaseAdd">
            <input type="hidden" id="addReferral-patient_id" name="disease_patient_id" value={data?.patient_id || ''} readOnly/>

            <div className="input-container">
              <label htmlFor="addReferral-first_name">Patient Name:</label>
              <input type="text" id="addReferral-first_name" name="addReferral-first_name" value={patient_name} onChange={(e) => setFirstName(e.target.value)} required autoComplete='off'   disabled='true' />
            </div>

            <div className="input-container">
  <label htmlFor="addReferral-description">Referral Description:</label>
  <textarea 
    id="addReferral-description" 
    name="disease_patient_name" 
    value={Description} 
    onChange={(e) => setReferralName(e.target.value)} 
    required 
    rows="4" 
    style={{ width: '100%' }} 
    placeholder="Enter the referral description here..."
  ></textarea>
</div>

            

              {/* <div className="input-container">
              <label htmlFor="addReferral-household">Disease Stage:</label>
              <input type="text" id="addReferral-household" name="disease_stage" onChange={(e) => setDiseaseStage(e.target.value)} required autoComplete='off' />
            </div> */}

         
            <div className="addReferral-input-squeeze">

           

            </div>

               <div className="input-container">
                <label htmlFor="addReferral-bdate">Referral Date:</label>
                <input type="date" id="addReferral-bdate" name="disease_treatmentSched" value={referralDate} onChange={(e) => setReferralDate(e.target.value)} required />
              </div>

              <div className="input-container">
                <label htmlFor="addReferral-blood_type">Approval Status:</label> <br />
                <select id="addReferral-blood_type" name="disease_status" value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="PENDING">PENDING</option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </div>


            <div className="addReferral-input-squeeze">
            
             
            </div>


            <button type="submit" id="save-changes" className="save-addReferral">Save Changes</button>
          </div>
        </form>

        <button onClick={onClose} className="close-addReferral">Close</button>
        <button
            type="button"
            onClick={handleOpenPrintModal}
            className="print-Referral"
          >
            Print
          </button>
      </div>


     
    </div>
  );
};

export default ViewReferral;
