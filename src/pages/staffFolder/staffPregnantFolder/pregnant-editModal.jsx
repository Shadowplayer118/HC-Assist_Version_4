import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../../css/pregnant.css'


const ViewPregnantModal = ({ visible, onClose, data }) => {
  if (!visible) return null;

  // State hooks for all fields
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patientId, setpatientId] = useState('');


  const [DateConcieved, setDateConcieved] = useState('');
  const [ExpectedDate, setExpectedDate] = useState('');
  const [FirstTri, setFirstTri] = useState('');
  const [SecondTri, setSecondTri] = useState('');
  const [ThirdTri, setThirdTri] = useState('');
  const [Status, setStatus] = useState('');
  const [FatherName, setFatherName] = useState('');
  const [FatherContact, setFatherContact] = useState('');


  const [IsEditFirst, setIsEditFirst] = useState(true);
  const [IsEditSecond, setIsEditSecond] = useState(false);
  const [IsEditThird, setIsEditThird] = useState(false);



  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState('');
  const patient_name = firstName+" " +lastName;

  const staff_id = localStorage.getItem('logId');

  // Initialize states when data changes
  useEffect(() => {
    if (data) {
      setpatientId(data.patient_id || '');
      setFirstName(data.first_name || '');
      setLastName(data.last_name || '');

      // Set the image preview, check if there's an image path or fallback to default
      setPreview(`../../../php/${data.image}` || '../../Images/blank_patient.jpg');
      console.log(data);
    }
  }, [data]);

  


    function ValidateTrimester(){
      const dateConcievedObj = new Date(DateConcieved);


      const today = new Date();
    if(dateConcievedObj < today){
      const yes = today-dateConcievedObj;
      const diffDays = yes / (1000 * 60 * 60 * 24);
      let daysSinceConception = Math.floor(diffDays);
      console.log(daysSinceConception);
      console.log(daysSinceConception);


      
    if(daysSinceConception > 280){
      setThirdTri('');
      setSecondTri('');
    //  setIsEditSecond(true);
    //  setIsEditThird(true);
 

    }

    else if(daysSinceConception <= 91){
      setThirdTri('');
      setSecondTri('');
      // setIsEditSecond(true);
      // setIsEditThird(true);
    

    }

    else if(daysSinceConception <= 189){
      setSecondTri('');
      // setIsEditSecond(true);
      
      

    }

    else if(daysSinceConception <= 280){
    console.log('okay');
    setIsEditSecond(false);
      setIsEditThird(false);

    }

    }
    

  }




    const handleStatusChange = (e) => {
      const newStatus = e.target.value;
      setDateConcieved(newStatus); // Update the status
    
      // Call another function when status changes
      ValidateTrimester();
    };




  function AutoFill() {

    setFirstTri('');
    setExpectedDate('');
    setSecondTri('');
    setThirdTri('');

    
    if (!DateConcieved) {
      alert('Please input Date Conceived');
      return;
    }
  
    // Convert the input to a Date object
    const dateConcievedObj = new Date(DateConcieved);
  
    if (isNaN(dateConcievedObj.getTime())) {
      alert('Invalid date format. Please enter a valid date.');
      return;
    }
  
    const today = new Date();
  if(dateConcievedObj < today){
    const yes = today-dateConcievedObj;
    const diffDays = yes / (1000 * 60 * 60 * 24);
    let daysSinceConception = Math.floor(diffDays);
    console.log(daysSinceConception);

    if(daysSinceConception > 280){
      console.log('Long Term');
      console.log(daysSinceConception);
      setStatus('LONG TERM');

    }

    else if(daysSinceConception <= 91){
      console.log('First Tri');
      setStatus('FIRST TRIMESTER');
      console.log(daysSinceConception);
      trimesterCalculator(dateConcievedObj,1,0,0)

    }


    else if(daysSinceConception <= 189){
      console.log('2nd tri');
      setStatus('SECOND TRIMESTER');
      console.log(daysSinceConception);
      trimesterCalculator(dateConcievedObj,0,1,0)

    }

    else if(daysSinceConception <= 280){
      console.log('3rd Tri');
      setStatus('THIRD TRIMESTER');
      console.log(daysSinceConception);
      trimesterCalculator(dateConcievedObj,0,0,1)

    }

    else{

    }
  }

  

    // Calculate trimester start and end dates
    // Format as YYYY-MM-DD for input type="date"
  }

  function trimesterCalculator(currDate,first,second,third){


    const firstTrimesterEnd = new Date(currDate);
    firstTrimesterEnd.setDate(firstTrimesterEnd.getDate() + 91);
   
    const secondTrimesterStart = new Date(firstTrimesterEnd);
      secondTrimesterStart.setDate(secondTrimesterStart.getDate() + 1);
      const secondTrimesterEnd = new Date(currDate);
      secondTrimesterEnd.setDate(secondTrimesterEnd.getDate() + 189);

    const thirdTrimesterStart = new Date(secondTrimesterEnd);
    thirdTrimesterStart.setDate(thirdTrimesterStart.getDate() + 1);
    const dueDate = new Date(currDate);
    dueDate.setDate(dueDate.getDate() + 280);

    if(first==1){
        setFirstTri(firstTrimesterEnd.toISOString().split('T')[0]);
    setSecondTri(secondTrimesterStart.toISOString().split('T')[0]);
    setThirdTri(thirdTrimesterStart.toISOString().split('T')[0]);
    setExpectedDate(dueDate.toISOString().split('T')[0]); 
    }

    else if(second==1){
      setThirdTri(thirdTrimesterStart.toISOString().split('T')[0]);
      setExpectedDate(dueDate.toISOString().split('T')[0]); 
    }

    else if(third==1){
    
      setExpectedDate(dueDate.toISOString().split('T')[0]); 
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

  console.log(patientId);

  const formData = new FormData();
  formData.append('Pregnant_patient_id', patientId || ''); 
  formData.append('start_date', DateConcieved);
  formData.append('expected_due_date', ExpectedDate);
  formData.append('pregnancy_status', Status);
  formData.append('father', FatherName);
  formData.append('father_contact', FatherContact);
  formData.append('second_trimester', SecondTri);
  formData.append('third_trimester', ThirdTri);

  // Append the selected image if it exists

  try {
    const response = await axios.post(
      'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/pregnant/pregnantAdd.php',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure it's set to multipart/form-data
        },
      }
    );

    if (response.data === 'success') {
      alert('Patient edited successfully!');
      onClose(); // Close modal on success
    } else {
      alert('Failed to edit patient.');
      console.log(response);
    }
  } catch (error) {
    console.error('Error editing patient:', error);
    alert('An error occurred.');
  }
};


  return (
    <div className="addPregnant-modal">
      <div className="addPregnant-modal-content">
        <h3 className='addPregnant-modal-title'>Pregnant Information</h3>
 

        <form onSubmit={handleSubmit}>
          <div className="addPregnant-input-left">
            <label htmlFor="">Profile Picture</label>
            <div className="addPregnant-preview-container">
              {preview && <img className="addPregnant-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='addPregnant-image' name='addPregnant-image' onChange={handleFileChange} />
          </div>


          <div className="addPregnant-input-right">
            <input type="hidden" id="addPregnant-patient_id" name="Pregnant_patient_id" value={data?.patient_id || ''} readOnly/>

            <div className="input-container">
              <label htmlFor="addPregnant-first_name">Patient Name:</label>
              <input type="text" id="addPregnant-first_name" name="addPregnant-first_name" value={patient_name} onChange={(e) => setFirstName(e.target.value)} required autoComplete='off'   disabled='true' />
            </div>

            <div className="input-container">
              <label htmlFor="addPregnant-last_name">Date Concieved:</label>
              <input type="date" id="addPregnant-last_name" name="Pregnant_patient_name"  onChange={handleStatusChange} required autoComplete='off'  />
            </div>

            <div className="addPregnant-input-squeeze">
            <div className="input-container">
                <label htmlFor="addPregnant-blood_type">Preganancy Status:</label> <br />
                <select id="addPregnant-status" name="Pregnant_status" value={Status} onChange={(e) => setStatus(e.target.value)} required>
                  <option value="">Select Status</option>
                  <option value="FIRST TRIMESTER">FIRST TRIMESTER</option>
                  <option value="SECOND TRIMESTER">SECOND TRIMESTER</option>
                  <option value="THIRD TRIMESTER">THIRD TRIMESTER</option>
                  <option value="LONG TERM">LONG TERM</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="MISCARRIAGE">MISCARRIAGE</option>
                  <option value="MISCARRIAGE">ABORTED</option>



                </select>
              </div>

              <div className="input-container">
               <div className="autoLoad" onClick={AutoFill}>AutoLoad</div>
              </div>

         
            </div>

           
            

            <div className="addPregnant-input-squeeze">

                
            <div className="input-container">
              <label htmlFor="addPregnant-household">Second-Trimester:</label>
              <input type="date" id="addPregnant-household" name="Pregnant_stage" value={SecondTri} onChange={(e) => setSecondTri(e.target.value)} autoComplete='off' disabled={IsEditSecond}/>
            </div>

            <div className="input-container">
              <label htmlFor="addPregnant-household">Third-Trimester:</label>
              <input type="date" id="addPregnant-household" name="Pregnant_stage" value={ThirdTri} onChange={(e) => setThirdTri(e.target.value)}  autoComplete='off' disabled={IsEditThird}/>
            </div>
            
             
            </div>

            <div className="input-container">
              <label htmlFor="addPregnant-household">Due Date/ Birth:</label>
              <input type="date" id="addPregnant-household" name="Pregnant_stage" value={ExpectedDate} onChange={(e) => setExpectedDate(e.target.value)}  autoComplete='off' />
            </div>

              <div className="addPregnant-input-squeeze">

                <div className="input-container">
                  <label htmlFor="addPregnant-bdate">Father:</label><br />
                  <input type="text" id="addPregnant-bdate" name="Pregnant_treatmentSched"  onChange={(e) => setFatherName(e.target.value)}  />
                </div>

                <div className="input-container">
                  <label htmlFor="addPregnant-bdate">Father Contact:</label>
                  <input type="text" id="addPregnant-bdate" name="Pregnant_treatmentSched"  onChange={(e) => setFatherContact(e.target.value)}  />
                </div>

              </div>

              
          

            <button type="submit" id="save-changes" className="save-addPregnant">Save Changes</button>
          </div>
        </form>

        <button onClick={onClose} className="close-addPregnant">Close</button>
      </div>
    </div>
  );
};

export default ViewPregnantModal;
