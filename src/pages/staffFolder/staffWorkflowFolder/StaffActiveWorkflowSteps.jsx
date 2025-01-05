import React, { useEffect, useState } from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import '../../../css/workflow.css';

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SidebarStaff from '../../bars/sideBarStaff';

const StaffActiveWorkflowSteps = () => {
  const { activeWorkflow_id } = useParams(); // Get the workflow_id from the URL params

  const [workflowData, setworkFlowData] = useState([]);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  useEffect(() => {
    fetchSteps(activeWorkflow_id);
  }, [isOpenAddModal]);

  const fetchSteps = async (John_Marston) => {
    try {
      const response = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/workflow/Activesteps.php', {
        params: { workflow_id: John_Marston },
      });
      console.log('API Response:', response.data); // Log the API response
      setworkFlowData(response.data);
    } catch (error) {
      console.error('Error fetching workflow steps:', error);
    }
  };
  

  return (
    <div>
      <Topbar location={
        <>
          <a href="/workflow" className='topLink'>Workflow</a> &gt; Steps
        </>
      } />
      <div className="mainbarContent">
      <SidebarStaff/>


        {/* <SelectPatientModal visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} /> */}
        {/* <SelectStaffModal visible={isOpenViewModal} onClose={() => setIsOpenViewModal(false)} /> */}

        <div className="main">
          <div className="main-container">
            <div className="main-top-staff">
              <a href="/workflow">Cancel</a>
              <button className="cancel-workfow">Add Steps</button>
            </div>

            <div className="workflowSteps-container">
              <div className="workflowSteps-content">
                <div className="workflowSteps-title">
                  {workflowData && workflowData.length > 0 ? workflowData[0].title : 'No title available'}
                </div>
                {workflowData && workflowData.map((data, index) => (
                  <div className='workflowSteps-card' key={index}>
                    <div className="workflowSteps-card-left">
                      <div className='sequence'>Step {data.activeStep_sequence}</div>
                      <div className='activeStep_name'>{data.activeStep_name}</div>
                    </div>
                    {/* Button with dynamic classes based on activeStep_status */}
                    <div 
                      className={`activeStep_status ${data.activeStep_status === 'Finished' ? 'status-finished' : 'status-not-finished'}`}>
                      {data.activeStep_status}
                    </div>
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

export default StaffActiveWorkflowSteps;
