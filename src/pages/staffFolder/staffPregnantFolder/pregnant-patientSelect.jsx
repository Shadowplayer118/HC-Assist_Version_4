import React from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddPregnantModal from './pregnant-addModal';
// import AddDiseaseModal from './disease-addModal';

const Patientselect_Pregnant = () => {
  const [patientData, setPatientData] = useState(null);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  async function fetchPatientData() {
    try {
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/pregnant/femalePatient_load.php');
      setPatientData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPatientData();
  }, [isOpenAddModal, selectedPatient]);

 

  function addPatient() {
    setIsOpenAddModal(true);
  }


  function selectPatient(data){
    setSelectedPatient(data);
    setIsOpenAddModal(true);
  }

  return (
    <div>
      <Topbar location={
          <>
            <a href="/pregnant" className='topLink'>Pregnant</a>  &gt; Patient Select
          </>
        } />
      <div className="mainbarContent">
        <Sidebar />

        <div className="main">
          <div className="main-container">
            <div className="main-top-staff">
              <button className="openModalBtn" id="openModalBtn">
              <a href="/pregnant">Cancel</a>
              </button>

              <select id="roleSelect" className="roleSelect">
                <option value="Purok">Purok</option>
                <option value="Bartolome">Bartolome</option>
                <option value="Rosasa">Rosasa</option>
              </select>

              <form id="filterForm" className="filterForm">
                <button type="submit" id="filter-btn" className="filter-btn">
                  <img src="../assets/search.png" alt="" />
                </button>
                <input type="text" id="filtername" className="filtername" name="name" value="" />
              </form>
            </div>

            <AddPregnantModal  visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} data={selectedPatient}/>

       

            <div className="table-container">
              <table id="staff-table" className="staff-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Purok</th>
                    <th>Contact #</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patientData && patientData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.first_name} {data.last_name}</td>
                      <td>{data.purok}</td>
                      <td>{data.contact_number}</td>
                      <td>
                        <button className="select-btn" onClick={() => selectPatient(data)}>
                          Select
                        </button>
                      
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

export default Patientselect_Pregnant;
