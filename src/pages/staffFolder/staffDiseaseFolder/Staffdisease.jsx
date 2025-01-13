import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import Topbar from "../../bars/topBar";
import SidebarStaff from '../../bars/sideBarStaff';
import Mainbar from "../../bars/mainBar";
import EditModal from './disease-editModal';
import AddModal from './disease-addModal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ViewDisease from './disease-editModal';

const StaffDisease = () => {

  const [pregnantData, setpregnantData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  async function fetchpregnantData(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/disease/disease_load.php')
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

<Topbar location="Contagious Disease"/>
           <div class="mainbarContent">
           <SidebarStaff/>

                   
<div className="main">
      <div className="main-container">
        
        <div className="main-top-staff">
          <button className="openModalBtn" id="openModalBtn">
            {/* <img src="../assets/medical-icon_i-care-staff-area.png" alt="" /> */}
            <a href="/disease-patientSelect">
            <img src="../../assets/icons/white-disease.png" alt="" />
            <img src="../assets/+.png" alt="" className="plus" />
            </a>
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

        <ViewDisease visible={isOpenViewModal} onClose={() => setIsOpenViewModal(false)} data={selectedReferral} />

        <div className="table-container">
          <table id="staff-table" className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Diagnosis Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr id="template-row" style={{ display: 'none' }} className="table_tr">
                <td className="id"></td>
                <td className="name"></td>
                <td className="position"></td>
                <td className="contact_number"></td>
                <td className="actions">
                  <button className="delete-btn">Delete</button>
                  <button className="edit-btn">View</button>
                </td>
              </tr> */}
              {pregnantData && pregnantData.map((data, index) => (
                <tr key={index}>
                  <td>{data.first_name} {data.last_name}</td>
                  <td>{data.diagnosis_date}</td>
                  <td>{data.disease_status}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deletepregnantData(data.disease_id)}><img src="../../assets/icons/trashBin.png" alt="" /></button>
                    <button className="edit-btn" onClick={() => viewById(data)}><img src="../../assets/icons/mdi_eye.png" alt="" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
           
           </div>

         
             

    </div>
       
  );
};

export default StaffDisease;
