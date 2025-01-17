import React from 'react';
import '../../../css/dashboard.css';
import '../../../css/patient.css';
import Topbar from "../../bars/topBar";
import Sidebar from "../../bars/sideBar";
import Mainbar from "../../bars/mainBar";
import EditModal from './patient-editModal';
import AddModal from './patient-addModal';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

const StaffTable = () => {
  const [patientData, setPatientData] = useState(null);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  async function fetchPatientData() {
    try {
      const res = await axios.get('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/patient/patient_load.php');
      setPatientData(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPatientData();
  }, [isOpenAddModal, selectedPatient, isOpenViewModal]);

  function viewById(data) {
    setSelectedPatient(data);
    setIsOpenViewModal(true);
  }

  function addPatient() {
    setIsOpenAddModal(true);
  }

  async function deletePatientData(id) {
    try {
      const res = await axios.delete('http://localhost/HC_Assist_Version_2/HC-Assist_Version1/admin_side/patients_folder/patient_delete.php', {
        data: { id: id }
      });

      if (res.data.status) {
        fetchPatientData();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <Topbar location="Patient" />
      <div className="mainbarContent">
        <Sidebar/>

        <div className="main">
          <div className="main-container">
            <div className="main-top-staff">
              <button className="openModalBtn" id="openModalBtn" onClick={() => addPatient()}>
                <img src="../assets/medical-icon_i-care-staff-area.png" alt="" />
                <img src="../assets/+.png" alt="" className="plus" />
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

            {/* Edit Modal */}
            <EditModal visible={isOpenViewModal} onClose={() => setIsOpenViewModal(false)} data={selectedPatient} />

            {/* Add Modal */}
            <AddModal visible={isOpenAddModal} onClose={() => setIsOpenAddModal(false)} />

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
                        <button className="delete-btn" onClick={() => deletePatientData(data.patient_id)}>
                          <img src="../../assets/icons/trashBin.png" alt="" />
                        </button>
                        <button className="edit-btn" onClick={() => viewById(data)}>
                          <img src="../../assets/icons/mdi_eye.png" alt="" />
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

export default StaffTable;
