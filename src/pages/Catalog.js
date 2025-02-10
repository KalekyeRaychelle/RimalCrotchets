import React, { useState, useEffect } from 'react';
import '../styles/Catalog.css'
const Catalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch("http://localhost:7700/api/Catalog/products")
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
  const addToCart = (productID) => {
    fetch("http://localhost:7700/api/ShoppingCart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productID, email: "user@example.com" }) // Replace with actual user email
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMessage("Item added to cart!");
          setTimeout(() => setMessage(""), 3000);
        } else {
          setMessage("Failed to add item to cart.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className='CatalogArea'>
      <h2>Product Catalog</h2>
      <div className="catalog">
        {products.map((product) => (
          <div key={product.productID} className="product-card">
           <img src={`http://localhost:7700${product.productImagePath}`} alt={product.productName} className="product-image" />

            <p>{product.productName}</p>
            <p>Price: Ksh.{product.Price}</p>
            <button onClick={()=>addToCart(product.productID)}>ADD TO CART</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

