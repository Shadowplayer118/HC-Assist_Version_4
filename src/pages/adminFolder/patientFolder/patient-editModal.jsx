import React, { useEffect, useState } from 'react';
import { BrowserRouter, useFetcher } from 'react-router-dom';
import axios from 'axios';

const EditModal = ({ visible, onClose, data }) => {
  if (!visible) return null;

  console.log(data) 

  const [isEditable, setIsEditable] = useState(false);
  const [count, setCount] = useState(0);
  const [fetchpatient, setFetchpatient] = useState(null);

  function editable() {
    setCount(count === 0 ? 1 : 0);
    setIsEditable(count === 1);
  }

    useEffect(() => {
      setFetchpatient(data)
      console.log(fetchpatient)
    }, [fetchpatient])

 

  return (
    <div className="edit-modal">
      <div className="edit-modal-content">
        <button onClick={onClose}>
          <span className="close-edit" id="close-edit">
            &times;
          </span>
        </button>
        <h3>Edit Form</h3>
        <form id="edit-form">
          <div className="input-right">
            <div className="steady">
              <input
                type="text"
                id="edit-patient_id"
                name="edit-patient_id"
                style={{ display: 'none' }}
                value={fetchpatient.patient_id} // Assuming the patient_id exists in the response
              />

              <div className="input-container">
                <label htmlFor="edit-first_name">First Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-first_name"
                  name="edit-first_name"
                  required
                  value={fetchpatient.first_name} // Bind to fetched first name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, first_name: e.target.value } })}
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-middle_name">Middle Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-middle_name"
                  name="edit-middle_name"
                  required
                  value={fetchpatient.data.middle_name || ''} // Handle undefined middle name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, middle_name: e.target.value } })}
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-last_name">Last Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-last_name"
                  name="edit-last_name"
                  required
                  value={fetchpatient.data.last_name} // Bind to fetched last name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, last_name: e.target.value } })}
                />
              </div>

              <div className="age-dateContainer">
                <div className="input-container">
                  <label htmlFor="edit-age">Age:</label>
                  <br />
                  <input
                    type="text"
                    id="edit-age"
                    name="edit-age"
                    required
                    value={fetchpatient.data.age || ''} // Handle undefined age
                    onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, age: e.target.value } })}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="edit-bdate">Birthdate:</label>
                  <br />
                  <input
                    type="date"
                    id="edit-bdate"
                    name="edit-bdate"
                    required
                    value={fetchpatient.data.birthdate || ''} // Handle undefined birthdate
                    onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, birthdate: e.target.value } })}
                  />
                </div>
              </div>

              <div className="gender-civilContainer">
                <div className="input-container">
                  <label htmlFor="edit-gender">Gender:</label>
                  <br />
                  <select
                    id="edit-gender"
                    name="edit-gender"
                    required
                    value={fetchpatient.data.gender || ''}
                    onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, gender: e.target.value } })}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="input-container">
                  <label htmlFor="edit-civil_status">Civil Status:</label>
                  <br />
                  <input
                    type="text"
                    id="edit-civil_status"
                    name="edit-civil_status"
                    required
                    value={fetchpatient.data.civil_status || ''}
                    onChange={(e) => setFetchpatient({ ...fetchpatient, data: { ...fetchpatient.data, civil_status: e.target.value } })}
                  />
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="edit-purok">Purok:</label>
                <br />
                <input
                  type="text"
                  id="edit-purok"
                  name="edit-purok"
                  required
                  value={fetchpatient.data.purok}
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-household">Household:</label>
                <br />
                <input
                  type="text"
                  id="edit-household"
                  name="edit-household"
                  required
                  value={fetchpatient.data.household || ''}
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-contact_number">Contact #:</label>
                <br />
                <input
                  type="text"
                  id="edit-contact_number"
                  name="edit-contact_number"
                  required
                  value={fetchpatient.data.contact_number || ''}
                 
                />
              </div>

              <div className="input-container">
                <label htmlFor="edit-blood_type">Blood Type:</label>
                <br />
                <input
                  type="text"
                  id="edit-blood_type"
                  name="edit-blood_type"
                  required
                  value={fetchpatient.data.blood_type || ''}
                />
              </div>
            </div>

            <button
              type="submit"
              id="save-changes"
              required
              style={{ display: count === 0 ? 'none' : '' }}
            >
              Save Changes
            </button>
          </div>
        </form>
        <button id="allow-edit" onClick={editable}>
          {count === 0 ? 'Edit' : 'Cancel'}
        </button>
      </div>
    </div>
  );
};

export default EditModal;
