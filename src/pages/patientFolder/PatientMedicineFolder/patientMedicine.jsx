import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import '../../../css/medicine.css'

import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
// import EditModal from './medicine-editModal';
// import AddModal from './medicine-addModal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import SidebarPatient from '../../bars/sideBarPatient';

const PatientMedicine = () => {

  const [pregnantData, setpregnantData] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const link = "../../../php/";


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
        
        <div className="main-top-staff">
      
        </div>



        {/* <div className="table-container">
          <table id="staff-table" className="staff-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Brand </th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
      
              {pregnantData && pregnantData.map((data, index) => (
                <tr key={index}>
                  <td>{data.item_name}</td>
                  <td>{data.brand}</td>
                  <td>{data.stock}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deletepregnantData(data.inventory_id)}><img src="../../assets/icons/trashBin.png" alt="" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}


<div className="Medcard-title">Available Medicine</div>
<div className="Medcard-container">
  {pregnantData &&
    pregnantData.map((data, index) => (
      <div
        className="Medcard"
        key={index}
        style={{
          backgroundColor: data.stock == 0 ? "grey" : "white",
          color: data.isActive != 1 ? "black" : "white", // Conditionally set background color
        }}
      >
        <div className="Medcard-profile">
        <img   src={data.image ? link + data.image : "/Images/medicine.png"} alt=""   style={{
          opacity: data.stock == 0 ? "5%" : "100%", // Conditionally set background color
        }}/>
        </div>
        <div className="Medcredentials">
          <div>{data.item_name}</div>
          <div>{data.brand}</div>
          <div>{data.stock}</div>

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

export default PatientMedicine;
