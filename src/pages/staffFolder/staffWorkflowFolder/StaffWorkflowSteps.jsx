import React, { useEffect, useState } from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import '../../../css/workflow.css';

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const StaffWorkflowSteps = () => {

  const { workflow_id } = useParams(); // Get the workflow_id from the URL params

  console.log("The workflow_id is: ", workflow_id); 
  const [workflowData, setworkFlowData] = useState([]);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const staffId = localStorage.getItem('SelectedStaffId');
  const staffName =  localStorage.getItem('SelectedStaffName');

  const patientId = localStorage.getItem('SelectedPatientId');
  const patientName =  localStorage.getItem('SelectedPatientName');

  const[assignedStaff,setAssignedStaff] = useState(null);
  const[assignedPatient,setAssignedPatient] = useState({patientId: null});
  const[assignedDeadline,setAssignedDeadline] = useState(null);


  useEffect(() => {

    fetchSteps(workflow_id);
    console.log('Assigned Deadline:', assignedDeadline);

  }, [isOpenAddModal, selectedReferral, assignedDeadline,assignedPatient]);




  const handleSubmit = async () => {
 


    // Prepare the data for submission
    const dataToSend = {
      staffId,
      patientId,
      workflow_id,
      assignedDeadline,
      steps: workflowData, // Send the array directly
    };

    try {
      console.log('this is data');

      console.log(dataToSend);
      const response = await axios.post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/addActiveWorkflow.php', dataToSend);
      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form.');
    }
  };


  


  

  const clearSelection = () =>{
    localStorage.removeItem('SelectedStaffName');
    localStorage.removeItem('SelectedPatientName');
    localStorage.removeItem('SelectedStaffId');
    localStorage.removeItem('SelectedPatientId');
    window.location.reload();

  }

  const confirmSelection = () =>{
    const staffId = localStorage.getItem('SelectedStaffId');
    const patientId = localStorage.getItem('SelectedPatientId');

    console.log(staffId);
    console.log(patientId);
    console.log(workflow_id);
    console.log(workflowData);
    console.log(assignedDeadline);


    if(assignedDeadline == null || localStorage.getItem('SelectedPatientId') == null){
      alert('Please fill out fields');
    }

    else{
      handleSubmit();
      console.log('added');
      localStorage.removeItem('SelectedStaffName');
    localStorage.removeItem('SelectedPatientName');
    localStorage.removeItem('SelectedStaffId');
    localStorage.removeItem('SelectedPatientId');

      window.location.reload();
    }

  }

  const handleOpenPatientModal = () =>{
    setIsOpenAddModal(true);
  }

  const handleOpenStaffModal = () =>{
    setIsOpenViewModal(true);
  }

const updateDeadline = () => {
  setAssignedDeadline();
}

const formatDate = (date) => {
  const dateObj = new Date(date);  // Convert the string to a Date object
  const day = dateObj.getDate();  // Get the day of the month
  const monthName = dateObj.toLocaleString('default', { month: 'long' });  // Get the full month name
  
  return { day, monthName };
};




  const navigate = useNavigate();

  const fetchSteps = async(John_Marston) =>{
    try{
      const response = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/steps.php',{
        params: {
          workflow_id:John_Marston
        }
      })
      setworkFlowData(response.data);
    }
    catch{

    }
  }

  

  function viewById(data) {
    setSelectedReferral(data);
    setIsOpenViewModal(true);
  }

  function addPatient() {
      console.log('hun');
    setIsOpenAddModal(true);
  }

  async function deleteworkflowData(id) {
    try {
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      });

      if (res.data.status) {
        fetchworkflowData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleViewSteps(workflow_id) {
    
      navigate(`/workflowSteps/${workflow_id}`);
    
  }

  return (
    <div>
        <Topbar location={
          <>
            <a href="/workflow" className='topLink'>Workflow</a>  &gt; Steps
          </>
        } />
      <div className="mainbarContent">
      <SidebarStaff/>


        <SelectPatientModal  visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)}/>
        <SelectStaffModal  visible={isOpenViewModal} onClose={() => setIsOpenViewModal(false)}/>


        <div className="main">
          <div className="main-container">

            <div className="main-top-staff">
               <a href="/workflow">Cancel</a>
              <button className="cancel-workfow">Add Steps</button>



            </div>

            <div className="workflowSteps-container">
              <div className="workflowSteps-content">
                <div className="workflowSteps-title">{workflowData && workflowData.length > 0 ? workflowData[0].title : 'No title available'}</div>
                {workflowData && workflowData.map((data, index) => (
                  <div className='workflowSteps-card' key={index}>
                    <div className="workflowSteps-card-left">
                    <div className='subtitle'>Step {data.sequence}</div>
                      <div className='title'>{data.step_name}</div>
                      
                    </div>
                    <button className='edit-workflowSteps'>Edit</button>
                  </div>
                ))}
              </div>
            </div>

           

            <div className="assignment-container">
              <div className="assignment-content">

                <div className="assignment-title">Assign</div>
                  <div className="assignment-functions">
                    <div className="assignmentDeadline flex-assignment">
                    <div className="display-assignmentName">Deadline</div>

                      <div className="display-deadline assign-name">{assignedDeadline 
    ? new Date(assignedDeadline).toLocaleDateString('en-US') 
    : 'Select a Date'}</div>
                      <div className="display-staffImage image-circle date-iconDisplay">
                        <div className="date-iconDisplay-head">{assignedDeadline ? formatDate(assignedDeadline).monthName : 'Month'}</div>
                        <div className="date-iconDisplay-day"> {assignedDeadline ? formatDate(assignedDeadline).day : 'Day'}</div>

                      </div>
                      <input type="date" className = "select-deadline" onChange={(e) => setAssignedDeadline(e.target.value)}/>
                    </div>

                    <div className="assign-staff flex-assignment">
                    <div className="display-assignmentName">Assigned Staff</div>

                      <div className="display-staffImage image-circle"><img src="/images/blank_staff.jpg" alt="" /></div>
                      <div className="display-staffName assign-name">{staffName || 'Staff Name'}</div>
                      <button className="select-Staff" onClick={handleOpenStaffModal}>Select Staff</button>

                    </div>

                    <div className="assign-patient flex-assignment">
                    <div className="display-assignmentName">Patient</div>

                    <div className="display-PatientImage image-circle"><img src="/images/blank_patient.jpg" alt="" /></div>
                    <div className="display-PatientName assign-name">{patientName || 'Patient Name'}</div>
                    <button className="select-Patient" onClick={handleOpenPatientModal}>Select Patient</button>

                    </div>

                    <div className="flex-commands">
                    <div className="confirmSelection" onClick={confirmSelection}>Confirm Selection</div> 
                    <div className="clear-selection" onClick={clearSelection}>Clear</div>

                    </div>

                   

                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffWorkflowSteps;
