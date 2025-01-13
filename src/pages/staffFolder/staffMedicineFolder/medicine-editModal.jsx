import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../css/inventory.css'
import StockInModal from './medicine-stockIn';
import StockOutModal from './medicine-stockOut';


const EditModal = ({ visible, onClose, data }) => {
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

  const [expirations,SetExpirations] = useState([]);

  const[isDisabled,setisDisabled] = useState(true);


  const[selectedResolve,setselectedResolve] = useState(null);


  const[isOpenStockinModal,setisOpenStockinModal] = useState(false);
  const[isOpenStockOutModal,setisOpenStockOutModal] = useState(false);

  

  // Populate form with existing data if available
  useEffect(() => {
    if (data) {
      fetchExpirations(data.inventory_id); // Fetch expirations once when `data` changes
      setitemName(data.item_name);
      setbrand(data.brand);
      setcategory(data.category);
      setstock(data.stock);
      setprice(data.price);
      setSelectedImage(data.image);
      setPreview(data.image ? `../../../php/${data.image}` : '../../Images/medicine.png');
    }
  }, [data]); // Only trigger when `data` changes
  

  function HandleOpenStockModal(){
    setisOpenStockinModal(true)
  }
  

  function openStockOutModal(item){
    setselectedResolve(item);
    setisOpenStockOutModal(true)
  }
  
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
        console.log('expirations');

        console.log(expirations);
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
      
      <StockInModal visible={isOpenStockinModal} onClose={() => setisOpenStockinModal(false)} data={data}/>
      <StockOutModal visible={isOpenStockOutModal} onClose={() => setisOpenStockOutModal(false)} data={selectedResolve}/>


      <div className="add-modal-content">
        <h3 className='add-modal-title'>Add Inventory</h3>
        <button className='add_image-btn' onClick={() => document.getElementById('add_image').click()}>Choose Image</button>

        <form onSubmit={handleSubmit}>
          <div className="add-input-left">
            <label htmlFor="">Item Image</label>
            <div className="add-preview-containerInventory">
              {preview && <img className="add-preview" src={preview} alt="Preview" />}
            </div>
            <input type="file" id='add_image' name='add_image' onChange={handleFileChange} disabled={isDisabled}/>
          </div>

          <div className="add-input-right">
            <div className="steady">
              <input type="text" id="add-patient_id" name="add-patient_id" value={data?.patient_id || ''} style={{ display: 'none' }} readOnly />
            </div>
            <div className="input-container">
              <label htmlFor="add-first_name">Item Name:</label>
              <input type="text" id="add-first_name" name="first_name" value={itemName} onChange={(e) => setitemName(e.target.value)} required autoComplete='off' disabled={isDisabled}/>
            </div>

            <div className="input-container">
                <label htmlFor="price">Category:</label><br />
                <select id="add-price" name="price" value={category} onChange={(e) => setcategory(e.target.value)} required disabled={isDisabled}>
                  <option value="">Select price</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Bandage">Bandage</option>
                  <option value="Anti-Biotic">Anti-Biotic</option>

                </select>
              </div>

            <div className="input-container">
              <label htmlFor="add-first_name">Item Brand:</label>
              <input type="text" id="add-first_name" name="first_name" value={brand} onChange={(e) => setbrand(e.target.value)} required autoComplete='off' disabled={isDisabled}/>
            </div>

        
            <div className="add-input-squeeze">
            
            </div>

           

            <div className="add-input-squeeze">
              <div className="input-container">
                <label htmlFor="age">Stock:</label>
                <input type="number" id="add-age" name="age" value={stock} onChange={(e) => setstock(e.target.value)} required disabled={isDisabled} autoComplete='off'/>
              </div>

              <div className="input-container">
                <label htmlFor="add-bdate">Price:</label>
                <input type="number" id="add-bdate" name="bdate" value={price} onChange={(e) => setprice(e.target.value)} required disabled={isDisabled}/>
              </div>
            </div>


            <label htmlFor="add-bdate">Expirations:</label> <br />
             <div className="expirations-container">
             {expirations.length > 0 ? (
        <div className='expirations-content'>
          {expirations.map((item) => (
            <div className='expiration-card' key={item.id}>
              <div className="expDate">{item.expiration_date}</div>
              <div className="expStocks">{item.stocked} Stocks</div>
              <div className="resolve">
  <img
    src="../../assets/icons/mdi_eye.png"
    alt=""
    onClick={() => openStockOutModal(item)} // Pass a function reference
  />
</div>

            </div>
          ))}
        </div>
      ) : (
        <div className='noActivityMed-container'> <div className="noActiviyMed-text">No Items have expired</div>
        <div className="noActiviyMed-image"><img src="/Images/safe_medicine.png" alt="" /></div></div>
      )}

             </div>


            <button type="submit" id="save-changes" className="save-add" disabled={isDisabled}>Save Changes</button>
          </div>
        </form>

        <button onClick={onClose}>
          <span className="close-add" id="close-add">Close</span>
        </button>

        <button onClick={HandleOpenStockModal}>
          <span className="stock-in" id="close-add">Stock In</span>
        </button>

        <button onClick={enableEdit}>
          <span className="edit" id="close-add">Edit</span>
        </button>
      </div>
    </div>
  );
};

export default EditModal;
