import React, { useState } from 'react';
import Dialog from './ModalDialogComponent'; 
import '../CSS/SampleStyle.css';


const SampleComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const images = [
    "https://via.placeholder.com/150", 
    "https://via.placeholder.com/150/ff7f7f",
    "https://via.placeholder.com/150/7f7fff",
    "https://via.placeholder.com/150/7fff7f",
    "https://via.placeholder.com/150/ffff7f",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert(`Submitted: ${JSON.stringify(formData)}`);
    setFormData({ name: '', email: '' }); 
  };

  return (
    <div>
      <h1>Exercise2 - Dialog Component Demonstration</h1>
      <div style={{marginLeft: '200px'}}>
      <button  style={{margin: '50px',width:'400px', height:'40px',fontSize: '20px' }} onClick={openModal}>Open Modal</button>
      <button  style={{width:'400px', height:'40px',fontSize: '20px' }} onClick={openDialog}>Open Non-Modal Dialog</button>
      </div>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <h3>Contact Form - To test interaction after opening modals</h3>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
      </form>


      {/* Modal Example */}
      <Dialog
        isModal={true}
        isOpen={isModalOpen}
        onClose={closeModal}
        header={<h3 style={{ color: 'gray' }}>Are you sure you want to remove this item?</h3>}
        body={<p>This action cannot be undone.</p>}
        footer={
          <div>
            <button onClick={closeModal}>Yes</button>
            <button onClick={closeModal}>No</button>
          </div>
        }
      />

      {/* Non-Modal Dialog Example */}
      <Dialog
        isModal={false}
        isOpen={isDialogOpen}
        onClose={closeDialog} 
        header={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Billions</h3>
            
          </div>
        }
        body={
          <div>
           {selectedImage && (
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <h4>Selected Image:</h4>
                <img src={selectedImage} alt="Selected" style={{ width: '300px', height: '300px', border: '2px solid #333' }} />
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  onClick={() => setSelectedImage(url)}
                  style={{ width: '100px', height: '100px', margin: '5px', cursor: 'pointer', border: '2px solid #ccc', borderRadius: '4px' }}
                />
              ))}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SampleComponent;
