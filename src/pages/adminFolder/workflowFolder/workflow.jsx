import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import '../../../css/workflow.css'

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Workflow = () => {

  const [workflowData, setworkFlowData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  async function fetchworkflowData(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/staff_folder/staff_load.php')
      // console.log(res.data)
      setworkFlowData(res.data)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchworkflowData();
  }, [isOpenAddModal, selectedReferral]);

  function viewById(data){
    setSelectedReferral(data)
    setIsOpenViewModal(true)
  }

  function addPatient(){
    setIsOpenAddModal(true)
  }

  async function deleteworkflowData(id){
    try{
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      })
      
      if(res.data.status){
        fetchworkflowData()
      }
    }
    catch(err){
      console.error(err)
    }
  }



  return (

    <div>

<Topbar location="Workflow"/>
           <div class="mainbarContent">
           <Sidebar />

                   
<div className="main">
      <div className="main-container">
        
        <div className="main-top-staff">
          <button className="openModalBtn" id="openModalBtn"  onClick={() => addPatient()}>
            <img src="../assets/medical-icon_i-care-staff-area.png" alt="" />
            <img src="../assets/+.png" alt="" className="plus" />
          </button>

          <select id="roleSelect" className="roleSelect">
            <option value="Purok">Status</option>
            <option value="Bartolome">Approved</option>
            <option value="Rosasa">Pending</option>
            <option value="Rosasa">Denied</option>

          </select>

          <form id="filterForm" className="filterForm">
            <button type="submit" id="filter-btn" className="filter-btn">
              <img src="../assets/search.png" alt="" />
            </button>
            <input type="text" id="filtername" className="filtername" name="name" value="" />
          </form>
        </div>

        <div className="workflow-container">
     
     <div className="workflow-content">
     <div className="workflow-title">Workflows</div>
     {workflowData && workflowData.map((data, index) => (

               <div className='workflow-card' key={index}>

      <div className="workflow-card-left">
        <div className='title'>{data.first_name} {data.last_name}</div>
        <div className='subtitle'>{data.first_name} {data.last_name}</div>
      </div>

      <div className="workflow-card-right">
        <button className='start-workflow'>Start</button>
      </div>
  
               </div>
              
             ))}
     </div>
   </div>

        
      </div>

      <div className="active-workflow-container">
     
     <div className="workflow-content">
     <div className="workflow-title">Workflows</div>
     {workflowData && workflowData.map((data, index) => (
               <div className='workflow-card' key={index}>
                  <div className='title'>{data.first_name} {data.last_name}</div>
                  <div className='subtitle'>{data.first_name} {data.last_name}</div>
               </div>
             ))}
     </div>
   </div>
    </div>
           </div>
    </div>
       
  );
};

export default Workflow;
