import React, { useEffect, useState } from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import '../../../css/workflow.css';
import { Link } from 'react-router-dom';

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddWorkflow from './workflow-addModal';

const Workflow = () => {
  const [workflowData, setworkFlowData] = useState(null);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [activeWorkflowData, setactiveWorkFlowData] = useState(null);
  

  const navigate = useNavigate();

  async function fetchworkflowData() {
    try {
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/worflow.php');
      setworkFlowData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  
  async function fetchActiveworkflowData() {
    try {
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/activeWorkflow.php');
      setactiveWorkFlowData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchworkflowData();
    fetchActiveworkflowData();
  }, [isOpenAddModal, selectedReferral]);

  function viewById(data) {
    setSelectedReferral(data);
    setIsOpenViewModal(true);
  }

  function addPatient() {
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


  function handleViewActiveSteps(Activeworkflow_id) {
    
    navigate(`/activeWorkflowSteps/${Activeworkflow_id}`);
  
}

  return (
    <div>
      <Topbar location="Workflow" />
      <div className="mainbarContent">
        <Sidebar />

        <AddWorkflow visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} />
        

        <div className="main">
          <div className="main-container">

            <div className="main-top-staff">
              <button className="openModalBtn" id="openModalBtn" onClick={() => addPatient()}>
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
                      <div className='title'>{data.title}</div>
                      <div className='subtitle'>{data.description}</div>
                    </div>
                    <div className="workflow-card-right">
                    <div className="link ">
  <Link to={`/workflowSteps/${data.workflow_id}`}><img src="../../assets/icons/mdi_eye.png" alt="" /></Link></div>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="active-workflow-container">
              <div className="workflow-content">
                <div className="workflow-title">Active Workflow</div>
                {activeWorkflowData && activeWorkflowData.map((data, index) => (
                  <div className='Activeworkflow-card' key={index}>
                  <div className='title'>{data.active_title}</div>
                  <div className='subtitle'>{data.active_description}</div>

                  <div className="workflowLegend">

                  <div className='patientName'>{data.patient_first_name.charAt(0) + '.'} {data.patient_last_name}</div>
                  <div className='staffName'>{data.staff_first_name.charAt(0) + '.'} {data.staff_last_name}</div>
                 
                  <div className='workflowStatus'> <div className='workflowColor'></div>{data.active_status}</div>
                  

                  </div>
                  
                  <div className="link ">
                  <Link to={`/activeWorkflowSteps/${data.activeWorflow_id}`}><img src="../../assets/icons/mdi_eye.png" alt="" /></Link></div>
                  </div>
                  
                  
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
