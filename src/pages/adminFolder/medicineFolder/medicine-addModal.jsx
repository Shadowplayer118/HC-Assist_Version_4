import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/inventory.css'

const AddModal = ({ visible, onClose, data }) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  // State to manage form input values
  const [itemName, setitemName] = useState('');
  const [brand, setbrand] = useState('');
  const [lastName, setLastName] = useState('');
  const [category, setcategory] = useState('');
  const [stock, setstock] = useState('');
  const [price, setprice] = useState('');
  const [expirationDate, setexpirationDate] = useState('');

  const [selectedImage, setSelectedImage] = useState('../../Images/medicine.png');
  const [preview, setPreview] = useState('../../Images/medicine.png');

  // Populate form with existing data if available
  useEffect(() => {
    if (data) {
      setitemName(data.first_name || '');
      setbrand(data.middle_name || '');
      setLastName(data.last_name || '');
      setAge(data.age || '');
      setstock(data.birth_date || '');
      setprice(data.price || '');
      setexpirationDate(data.civil_status || '');
      setPurok(data.purok || '');
      setHousehold(data.household || '');
      setContactNumber(data.contact_number || '');
      setBloodType(data.blood_type || '');
    }
  }, [data]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for submission
    const formData = new FormData();
     // patient_id
    formData.append('item_name', itemName);
    formData.append('brand', brand);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('price', price);
    formData.append('expiration', expirationDate);


    // Append the selected image if it exists
    if (selectedImage && selectedImage !== '../../Images/medicine.png') {
      formData.append('image', selectedImage);
    } else {
      formData.append('image', '../../Images/medicine.png'); // default image path
    }

    try {
      const response = await axios.post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/addInventory.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); 
      if (response.data === 'success') {
        alert('Inventory added successfully!');
        onClose(); // Close modal on success
      } else {
        alert('Failed to add patientss.');
        console.log(response.data)
        onClose(); 
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('An error occurred.');
      onClose(); 
    }
  };

  return (
    <div className='add-modal'>
      <div className="add-modal-content">
        <h3 className='add-modal-title'>Add Inventory</h3>
        <button className='add_image-btn' onClick={() => document.getElementById('add_image').click()}>Choose Image</button>

        <form onSubmit={handleSubmit}>
          <div className="add-input-left">
            <label htmlFor="">Item Image</label>
            <div className="add-preview-containerInventory">
              {preview && <img className="add-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='add_image' name='add_image' onChange={handleFileChange} />
          </div>

          <div className="add-input-right">
            <div className="steady">
              <input type="text" id="add-patient_id" name="add-patient_id" value={data?.patient_id || ''} style={{ display: 'none' }} readOnly />
            </div>
            <div className="input-container">
              <label htmlFor="add-first_name">Item Name:</label>
              <input type="text" id="add-first_name" name="first_name" value={itemName} onChange={(e) => setitemName(e.target.value)} required autoComplete='off'/>
            </div>

            <div className="input-container">
                <label htmlFor="price">Category:</label><br />
                <select id="add-price" name="price" value={category} onChange={(e) => setcategory(e.target.value)} required>
                  <option value="">Select price</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Bandage">Bandage</option>
                  <option value="Anti-Biotic">Anti-Biotic</option>

                </select>
              </div>

            <div className="input-container">
              <label htmlFor="add-first_name">Item Brand:</label>
              <input type="text" id="add-first_name" name="first_name" value={brand} onChange={(e) => setbrand(e.target.value)} required autoComplete='off'/>
            </div>

          
          

        
            <div className="add-input-squeeze">
            
            </div>

           

            <div className="add-input-squeeze">
              <div className="input-container">
                <label htmlFor="age">Stock:</label>
                <input type="number" id="add-age" name="age" value={stock} onChange={(e) => setstock(e.target.value)} required autoComplete='off'/>
              </div>

              <div className="input-container">
                <label htmlFor="add-bdate">Price:</label>
                <input type="number" id="add-bdate" name="bdate" value={price} onChange={(e) => setprice(e.target.value)} required/>
              </div>
            </div>

          
             <div className="input-container">
                <label htmlFor="add-bdate">Expiration Date:</label>
                <input type="date" id="add-bdate" name="bdate" value={expirationDate} onChange={(e) => setexpirationDate(e.target.value)}/>
              </div>

            


            <button type="submit" id="save-changes" className="save-add">Save Changes</button>
          </div>
        </form>
        <button onClick={onClose}>
          <span className="close-add" id="close-add">Close</span>
        </button>
      </div>
    </div>
  );
};

export default AddModal;
