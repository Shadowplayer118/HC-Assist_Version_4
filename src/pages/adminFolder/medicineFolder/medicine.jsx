import React from 'react';
import '../../../css/dashboard.css'
import '../../../css/patient.css'
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";
import EditModal from './medicine-editModal';
import AddModal from './medicine-addModal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Medicine = () => {

  const [Medicine, setMedicine] = useState(null)
  const [isOpenViewModal, setIsOpenViewModal] = useState(false)
  const [selectedReferral, setSelectedReferral] = useState(null)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)
  const [hasExpired,SetHasExpired] = useState([])


  async function fetchExpired(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/expirationsHighlight.php')
      // console.log(res.data)
      SetHasExpired(res.data)
      console.log(hasExpired);
    }
    catch(err){
      console.error(err)
    }
  }


  async function fetchMedicineData(){
    try{
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/old_php/Admin_Side/medicine_folder/medicine_load.php')
      // console.log(res.data)
      setMedicine(res.data)
    }
    catch(err){
      console.error(err)
    }
  }

  useEffect(() => {

    fetchExpired();
    fetchMedicineData();
  }, [isOpenAddModal, selectedReferral]);

  function viewById(data){
    setSelectedReferral(data)
    setIsOpenViewModal(true)
  }

  function addPatient(){
    setIsOpenAddModal(true)
  }

  async function deleteMedicine(id){
    try{
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      })
      
      if(res.data.status){
        fetchMedicineData()
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
           <Sidebar />

                   
<div className="main">
      <div className="main-container">
        
        <div className="main-top-staff">
          <button className="openModalBtn" id="openModalBtn"  onClick={() => addPatient()}>
          <img src="../../assets/icons/white-medicine.png" alt="" />
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

        <EditModal visible={isOpenViewModal} onClose={() => setIsOpenViewModal(false)} data={selectedReferral} />
        <AddModal visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} />  

        <div className="table-container">
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
  {Medicine &&
    Medicine.map((data, index) => {
      // Check if the current row's inventory_id exists in the hasExpired array
      const isExpired = hasExpired.includes(Number(data.inventory_id));

      return (
        <tr
          key={index}
          className={isExpired ? "expired-row" : ""}
          
        >
          <td>{data.item_name}</td>
          <td>{data.brand}</td>
          <td>{data.stock}</td>
          <td>
            <button
              className="delete-btn"
              onClick={() => deleteMedicine(data.inventory_id)}
            >
              <img src="../../assets/icons/trashBin.png" alt="" className='trash'/>
            </button>
            <button className="edit-btn" onClick={() => viewById(data)}>
              <img src="../../assets/icons/mdi_eye.png" alt="" className='eye'/>
            </button>
          </td>
        </tr>
      );
    })}
</tbody>

          </table>
        </div>
      </div>
    </div>
           
           </div>

         
             

    </div>
       
  );
};

export default Medicine;
