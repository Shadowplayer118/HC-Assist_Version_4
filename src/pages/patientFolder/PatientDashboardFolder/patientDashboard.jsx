import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import Topbar from "../../bars/topBar";
// import Sidebar from "../../bars/sideBar";
// import Mainbar from "../../bars/mainBar";


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SidebarPatient from '../../bars/sideBarPatient';

const PatientDashbaord = () => {

  const [pregnantData, setpregnantData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [patientData, setPatientData] = useState(null);

  const logId = localStorage.getItem('logId');
  const logPosition = localStorage.getItem('logPosition');
  console.log(logPosition);
  console.log(logId);

  async function fetchpregnantData(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/medicine_folder/medicine_load.php')
      // console.log(res.data)
      setpregnantData(res.data)
    }
    catch(err){
      console.error(err)
    }
  }


  async function fetchPatientData(patientId) {
    try {
      const response = await axios.get('http://localhost/your_php_file.php', {
        params: { patient_id: patientId },
      });
      setPatientData(response.data); // Set the retrieved data in the state
      setError(null); // Clear any previous error
    } catch (err) {
      console.error('Error fetching patient data:', err);
      setError('Failed to fetch patient data. Please try again.'); // Set error message
    }
  }

  useEffect(() => {

    fetchpregnantData();
    if (logId) {
      fetchPatientData(logId);
    }
  }, [isOpenAddModal, selectedReferral]);

  function viewById(data){
    setSelectedReferral(data)
    setIsOpenViewModal(true)
  }

  function addPatient(){
    setIsOpenAddModal(true)
  }

  async function deletepregnantData(id){
    try{
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      })
      
      if(res.data.status){
        fetchpregnantData()
      }
    }
    catch(err){
      console.error(err)
    }
  }



  return (

    <div>

<Topbar location="Medicine"/>
           <div class="mainbarContent">
           <SidebarPatient />

                   
<div className="main">
      <div className="main-container">

        
        <div className="patientInfo-container">

            <div className="patient-generalInfo">

              <div className="profile-container">
                <div className="dashboard-profilePicture">d</div>
                <div className="credential_container_top">



                  <div className='labelForHolder name'>
                    <div className="data">Dhaniel Malinao</div><br/>
                    Patient Name</div>
                  <div className='labelForHolder number'>
                  <div className="data">040 119 009 77899</div><br/>
                    Philhealth #</div>

<div className="squeezeData third-line">
                  <div className='labelForHolder'><div className="data">10/10/10</div><br/>birth date</div>
                  <div className='labelForHolder'><div className="data">22</div><br/>age</div>
                  <div className='labelForHolder'><div className="data">Male</div><br/>Gender</div>

</div>
                
                <div className="squeezeData fourth-line">

                <div className='labelForHolder'><div className="data">Single</div><br/>Civil Status</div>

<div className='labelForHolder'><div className="data">Gumamela</div><br/>Purok</div>

                </div>

                {/* <div className="squeezeData fifth-line">
                  <div className='labelForHolder'><div className="data">Malinao</div><br/>Household</div>
                  <div className='labelForHolder'><div className="data">O+</div><br/>Blood type</div>
                </div> */}

                </div>
                <div className="credential_container_bottom"></div>
                <div className="_container_bottom"></div>
              </div>
              <div className="currentMedicalRecord-container">
                <div className="PatientProfile-divider"><u>Health Data</u></div>

                <div className="PatientMedicalRecord">
                <div className='labelForHolder'><div className="data">10/10/10</div><br/>Record Date</div>
              

                  <div className='labelForHolder'><div className="data">69</div><br/>Weight</div>
                  <div className='labelForHolder'><div className="data">69</div><br/>Height</div>
                
                  <div className='labelForHolder'><div className="data">69</div><br/>Blood Pressure</div>
                  <div className='labelForHolder'><div className="data">O+</div><br/>Blood Type</div>
                  <div className='labelForHolder'><div className="data">69</div><br/>Heart Rate</div>
                  <div className='labelForHolder'><div className="data">69</div><br/>Temperature</div>
                  <div className='labelForHolder'><div className="data">Healthy</div><br/>Status</div>

                </div>

              



              </div>

            </div>

            <div className="patient-notifications">


            </div>

            <div className="patient-medicalHistory">
                

                </div>

            

        </div>
       
      </div>
    </div>
           
           </div>

         
             

    </div>
       
  );
};

export default PatientDashbaord;
