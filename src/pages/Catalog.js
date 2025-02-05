import React, { useState, useEffect } from 'react';
import '../styles/Catalog.css'
const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch("http://localhost:7700/api/Catalog/product")
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dotArea">
      <p>.</p>
      <p>.</p>
      <p>.</p>
      <p>.</p>
  </div>
    ;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Product Catalog</h2>
      <div className="catalog">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
           <img src={`http://localhost:7700${product.productImagePath}`} alt={product.productName} className="product-image" />

            <h3>{product.productName}</h3>
            <p>Price: ${product.Price}</p>
            <button>ADD TO Category</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

