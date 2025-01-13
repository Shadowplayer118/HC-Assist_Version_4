import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SidebarPatient from '../../bars/sideBarPatient';

const PatientDashbaord = () => {

  const [pregnantData, setpregnantData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

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

  useEffect(() => {
    fetchpregnantData();
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


                  <div className="dataHolder">Name Name Name</div>
                  <div className='labelForHolder'>Patient Name</div>
                  <div className="dataHolder">01931299</div>
                  <div className='labelForHolder'>Philhealth Number</div>

                  <div className="squeezeData">

                  <div className="dataHolder">12/12/12</div>
                  <div className='labelForHolder'>birth date</div>
                  <div className="dataHolder">34</div>
                  <div className='labelForHolder'>age</div>

                  </div>

                  <div className="squeezeData">
                  <div className="dataHolder">Male</div>
                  <div className='labelForHolder'>Gender</div>

                  <div className="dataHolder">Single</div>
                  <div className='labelForHolder'>Civil Status</div>
                  </div>

         <div className="squeezeData">
         <div className="dataHolder">Gumamela</div>
                  <div className='labelForHolder'>Purok</div>


                  <div className="dataHolder">Name</div>
         <div className='labelForHolder'>Household</div>
                 
         </div>

      

         <div className="dataHolder">O+</div>
         <div className='labelForHolder'>Blood type</div>

                 
                 

                </div>
                <div className="credential_container_bottom"></div>
                <div className="_container_bottom"></div>
              </div>
              <div className="currentMedicalRecord-container">

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
