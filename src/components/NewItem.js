import React, { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const NewItemModal = ({ isOpen, closeModal, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNameValid, setNameValid] = useState(true);
  const [isPriceValid, setPriceValid] = useState(true);

  const customStyles = {
    overlay: {
      background: '#0000008a'
    },
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleAddItem = async () => {
    let imageUrl = null;
    if (selectedImage) {
      const formData = new FormData();

      const publicId = `${itemName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

      formData.append('file', selectedImage);
      formData.append('upload_preset', 'randoStore');
      formData.append('public_id', publicId);

      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/drsqh0aog/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const uploadedImageData = await uploadResponse.json();
      imageUrl = uploadedImageData.secure_url;
    }

    const newItem = {
      name: itemName,
      price: itemPrice,
      img: imageUrl,
    };

    onAddItem(newItem);
    toast.success('Item added successfully.', { position: 'top-right' });
    handleCancel();
  };

  const isFormValid = () => {
    return itemName.trim() !== '' && itemPrice.trim() !== '' && selectedImage !== null;
  };

  const handleCancel = () => {
    setItemName('');
    setItemPrice('');
    setSelectedImage(null);
    setNameValid(true);
    setPriceValid(true);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleCancel} className="new-item-modal" style={customStyles}>
      <h2>Add New Item</h2>
      <div className="input-group">
        <label>
          Name:
          <span className="required-field">*</span>
        </label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
            setNameValid(e.target.value.trim() !== '');
          }}
        />
        {!isNameValid && <span className="validation-error">Name is required</span>}
      </div>
      <div className="input-group">
        <label>
          Price:
          <span className="required-field">*</span>
        </label>
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => {
            setItemPrice(e.target.value);
            setPriceValid(e.target.value.trim() !== '');
          }}
        />
        {!isPriceValid && <span className="validation-error">Price is required</span>}
      </div>
      <div className="input-group">
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {selectedImage && (
        <div className="preview">
          <img className="cart-item-img" src={URL.createObjectURL(selectedImage)} alt="Preview" />
        </div>
      )}
      <button
        onClick={handleAddItem}
        className="add-button"
        disabled={!isFormValid()}
      >
        Add Item
      </button>
      <button onClick={handleCancel} className="cancel-button">Cancel</button>
    </Modal>
  );
};

export default NewItemModal;