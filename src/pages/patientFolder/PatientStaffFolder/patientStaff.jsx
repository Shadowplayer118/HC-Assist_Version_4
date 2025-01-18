import React from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";
import StaffEditModal from './staff-editModal';
import StaffAddModal from './staff-addModal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SidebarPatient from '../../bars/sideBarPatient';

const PatientStaff = () => {
  const [staffData, setStaffData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [Preview, setPreview] = useState(false)
  const link = "../../../php/";




  async function fetchstaffData(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/staff_folder/staff_load.php')
      // console.log(res.data)
      setStaffData(res.data)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    fetchstaffData();
  }, [isOpenAddModal, selectedReferral]);

  function viewById(data){
    setSelectedReferral(data)
    setIsOpenViewModal(true)
  }

  function addPatient(){
    setIsOpenAddModal(true)
  }

  async function deletestaffData(id){
    try{
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      })
      
      if(res.data.status){
        fetchstaffData()
      }
    }
    catch(err){
      console.error(err)
    }
  }

  return (

    <div>

<Topbar location="Staff"/>
           <div class="mainbarContent">
           <SidebarPatient />

                   
<div className="main">
      <div className="main-container">
        
        <div className="main-top-staff">
          {/* <button className="openModalBtn" id="openModalBtn"  onClick={() => addPatient()}>
            <img src="../assets/medical-icon_i-care-staff-area.png" alt="" />
            <img src="../assets/+.png" alt="" className="plus" />
          </button>

          <select id="roleSelect" className="roleSelect">
            <option value="Purok">Status</option>
            <option value="Bartolome">Approved</option>
            <option value="Rosasa">Pending</option>
            <option value="Rosasa">Denied</option>

          </select> */}

          {/* <form id="filterForm" className="filterForm">
            <button type="submit" id="filter-btn" className="filter-btn">
              <img src="../assets/search.png" alt="" />
            </button>
            <input type="text" id="filtername" className="filtername" name="name" value="" />
          </form> */}
        </div>

      

     
              {/* <tr id="template-row" style={{ display: 'none' }} className="table_tr">
                <td className="id"></div>
                <td className="name"></div>
                <td className="position"></td>
                <td className="contact_number"></td>
                <td className="actions">
                  <button className="delete-btn">Delete</button>
                  <button className="edit-btn">View</button>
                </td>
              </tr> */}
               <div className="PatientStaffcard-title">Available BHW</div>
            <div className="PatienStaffcard-container">

           
           
  {staffData &&
    staffData.map((data, index) => (
      <div
        className="PatienStaffcard"
        key={index}
        style={{
          backgroundColor: data.isActive != 1 ? "grey" : "white",
          color: data.isActive != 1 ? "white" : "black", // Conditionally set background color
        }}
      >
        <div className="PatienStaffcard-profile">
          <img   src={data.image ? link + data.image : "/Images/blank_staff.jpg"} alt=""   style={{
          opacity: data.isActive != 1 ? "30%" : "100%", // Conditionally set background color
        }}/>
        </div>
        <div className="PatienStaffcredentials">
          <div>Name: {data.first_name} {data.last_name}</div>
          <div>Contact: {data.contact_number}</div>
          <div>Position: {data.position}</div>
          <div>{data.isActive != 1 ? "Unavailable" : "Available"}</div>

          
          

        </div>
      </div>
    ))}
</div>

            
         
      </div>
    </div>
           
           </div>

         
             

    </div>
       
  );
};

export default PatientStaff;
