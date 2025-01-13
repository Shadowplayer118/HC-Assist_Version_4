import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/inventory.css'

const StockInModal = ({ visible, onClose, data }) => {
  if (!visible) return null; // Prevent rendering when modal is not visible

  // State to manage form input values
  const [itemName, setitemName] = useState('');
  const [brand, setbrand] = useState('');
  const [category, setcategory] = useState('');
  const [stock, setstock] = useState('');
  const [price, setprice] = useState('');
  const [expirationDate, setexpirationDate] = useState('');

  const [selectedImage, setSelectedImage] = useState('../../Images/medicine.png');
  const [preview, setPreview] = useState('../../Images/medicine.png');

  const [expirations,SetExpirations] = useState([]);

  const[isDisabled,setisDisabled] = useState(false);
  

  // Populate form with existing data if available
  useEffect(() => {
    if (data) {

      fetchExpirations(data.inventory_id);
      setitemName(data.item_name);
      setbrand(data.brand);
      setcategory(data.category);
      setstock(data.stock);
      setprice(data.price);
      setSelectedImage(data.image);
      if(data.image==null||data.image.length==0){
        setPreview('../../Images/medicine.png');
      }
      else{
        setPreview(`../../../php/${data.image}`);
      }

    }
  }, [data],expirations);
  
  function enableEdit(){
    if(isDisabled == true){
      setisDisabled(false);
    }

    else{
      setisDisabled(true);
    }

  }
  

  const fetchExpirations = async (inventory_id) => {
    try {
      const response = await axios.get(
        'http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/expirations.php',
        { params: { inventory_id } }
      );
  
      if (response.data && Array.isArray(response.data)) {
        SetExpirations(response.data); // Update the state with API data
      } else {
        console.error('Unexpected API response format:', response.data);
        SetExpirations([]); // Clear state if response is invalid
      }
    } catch (error) {
      console.error('Error fetching expirations:', error);
      SetExpirations([]); // Clear state on error
    }
  };

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
    formData.append('item_id', data?.inventory_id);
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
      const response = await axios.post('http://localhost/HC-Assist_Version_4/php/new_php/HC-Assist_API/Admin/inventory/stockIn.php', formData, {
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
    <div className='stockIn'>
      <div className="stockIn-content">
        <h3 className='stockIn-title'>Insert Stocks</h3>


        <form onSubmit={handleSubmit}>

        <div className="add-input-squeeze stock-squeeze">

        <div className="input-container">
              <label htmlFor="add-first_name"># of Stocks:</label><br />
              <input type="number" id="stockIn-input" name="first_name"  onChange={(e) => setstock(e.target.value)} required autoComplete='off' disabled={isDisabled}/>
            </div>

            <div className="input-container">
              <label htmlFor="add-first_name">Expiration Date:</label><br />
              <input type="date" id="stockIn-expiration" name="first_name" value={expirationDate} onChange={(e) => setexpirationDate(e.target.value)} required autoComplete='off' disabled={isDisabled}/>
            </div>

        </div>


            <button type="submit" id="save-changesStockIn" className="save-add">Save Changes</button>
     
        </form>

        <button onClick={onClose}>
          <span className="close-add" id="close-add">Close</span>
        </button>

       

   
      </div>
    </div>
  );
};

export default StockInModal;
