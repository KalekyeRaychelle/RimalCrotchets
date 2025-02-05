import React, { useState } from 'react';
import '../styles/CatalogForm.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';

const CatalogForm = () => {
  const [catalogData, setCatalogData] = useState({
    productName: '',
    Category: '',
    Price: '',
    productImagePath: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCatalogData({ ...catalogData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCatalogData({ ...catalogData, productImagePath: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Catalog Data submitted');

    const formData = new FormData();
    formData.append('productName', catalogData.productName);
    formData.append('Category', catalogData.Category);
    formData.append('Price', catalogData.Price);
    formData.append('productImagePath', catalogData.productImagePath);

    try {
      const response = await fetch('http://localhost:7700/api/Catalog/newProduct', {
        method: 'POST',
        body: formData,
      });

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          alert('Product has been added to the Catalog');
          navigate('/Catalog');
        } else {
          setMessage(data.error || 'Something went wrong');
        }
      } catch (jsonError) {
        console.error('JSON Parse Error:', jsonError);
        setMessage(text || 'Invalid server response. Check console for details.');
      }
    } catch (error) {
      setMessage('Something went wrong!');
      console.error('Upload Error:', error);
    }
  };

  return (
    <div className="CatalogForm">
      <Link to="/Catalog">
        <FaAngleLeft />
      </Link>

      <form onSubmit={handleSubmit}>
        <h3>NEW PRODUCT</h3>
        <label>Product Name:</label>
        <input
          type="text"
          name="productName"
          id="productName"
          placeholder="Cherry Patterned Sweater"
          value={catalogData.productName}
          onChange={handleChange}
          required
        />
        <div className="categoryForm">
          <label>Category:</label>

          <input
            type="radio"
            id="Sweater"
            name="Category"
            value="Sweater"
            checked={catalogData.Category === 'Sweater'}
            onChange={handleChange}
          />
          <label htmlFor="Sweater">Sweater</label>

          <input
            type="radio"
            id="Top"
            name="Category"
            value="Top"
            checked={catalogData.Category === 'Top'}
            onChange={handleChange}
          />
          <label htmlFor="Top">Top</label>

          <input
            type="radio"
            id="Pants"
            name="Category"
            value="Pants"
            checked={catalogData.Category === 'Pants'}
            onChange={handleChange}
          />
          <label htmlFor="Pants">Pants</label>

          <input
            type="radio"
            id="Bag"
            name="Category"
            value="Bag"
            checked={catalogData.Category === 'Bag'}
            onChange={handleChange}
          />
          <label htmlFor="Bag">Bag</label>

          <input
            type="radio"
            id="Accessory"
            name="Category"
            value="Accessory"
            checked={catalogData.Category === 'Accessory'}
            onChange={handleChange}
          />
          <label htmlFor="Accessory">Accessory</label>
        </div>

        <label>Price</label>
        <input
          type="number"
          value={catalogData.Price}
          onChange={handleChange}
          required
          name="Price"
          id="Price"
          placeholder="ENTER NUMBER ONLY"
        />
        <label>Product Image</label>
        <input
          type="file"
          name="productImagePath"
          id="productImagePath"
          onChange={handleFileChange}
          required
        />
        <button type="submit">ADD PRODUCT</button>
        <p className="errorMess">{message}</p>
      </form>
    </div>
  );
};

export default CatalogForm;
