import React, { useEffect, useState } from 'react';

const EditModal = ({ visible, onClose, data }) => {
  if (!visible) return null;

  console.log(data)

  const [isEditable, setIsEditable] = useState(false);
  const [count, setCount] = useState(0);
  const [fetchpatient, setFetchpatient] = useState({}); 

  function editable() {
    setCount(count === 0 ? 1 : 0);
    setIsEditable(count === 1);
  }

  useEffect(() => {
    if (data) {
      setFetchpatient(data);
    }
  }, [data]); // Only set fetchpatient when data changes

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
                value={fetchpatient.patient_id || ''} // Ensure patient_id exists or fallback to empty string
              />

              <div className="input-container">
                <label htmlFor="edit-first_name">First Name:</label>
                <br />
                <input
                  type="text"
                  id="edit-first_name"
                  name="edit-first_name"
                  required
                  value={fetchpatient.first_name || ''} // Handle undefined first_name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, first_name: e.target.value })}
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
                  value={fetchpatient.middle_name || ''} // Handle undefined middle_name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, middle_name: e.target.value })}
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
                  value={fetchpatient.last_name || ''} // Handle undefined last_name
                  onChange={(e) => setFetchpatient({ ...fetchpatient, last_name: e.target.value })}
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
                    value={fetchpatient.age || ''} // Handle undefined age
                    onChange={(e) => setFetchpatient({ ...fetchpatient, age: e.target.value })}
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
                    value={fetchpatient.birthdate || ''} // Handle undefined birthdate
                    onChange={(e) => setFetchpatient({ ...fetchpatient, birthdate: e.target.value })}
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
                    value={fetchpatient.gender || ''}
                    onChange={(e) => setFetchpatient({ ...fetchpatient, gender: e.target.value })}
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
                    value={fetchpatient.civil_status || ''}
                    onChange={(e) => setFetchpatient({ ...fetchpatient, civil_status: e.target.value })}
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
                  value={fetchpatient.purok || ''}
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
                  value={fetchpatient.household || ''}
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
                  value={fetchpatient.contact_number || ''}
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
                  value={fetchpatient.blood_type || ''}
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
