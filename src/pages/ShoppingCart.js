import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null; 

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    return payload.email || null; 
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const ShoppingCart = () => {
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = getUserFromToken(); 

  useEffect(() => {
    fetch("http://localhost:7700/api/ShoppingCart", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCartData(data.cartData);

          const initialQuantities = {};
          data.cartData.forEach((product) => {
            initialQuantities[product.productID] = 1;
          });
          setQuantities(initialQuantities);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, []);

  const updateQuantity = (productID, newQuantity) => {
    if (newQuantity < 1) {
      setCartData(cartData.filter((product) => product.productID !== productID));
      const updatedQuantities = { ...quantities };
      delete updatedQuantities[productID];
      setQuantities(updatedQuantities);
    } else {
      setQuantities({ ...quantities, [productID]: newQuantity });
    }
  };

  const handleCheckout = () => {
    if (!userEmail) {
      alert("You must be logged in to checkout.");
      return;
    }

    const orderData = cartData.map((product) => ({
      productID: product.productID,
      email: userEmail, 
      productName: product.productName,
      price: product.Price,
      quantity: quantities[product.productID] || 1,
      productImagePath: product.productImagePath,
    }));

    fetch("http://localhost:7700/api/Orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Order placed successfully!");
          setCartData([]);
          setQuantities({});
        } else {
          alert("Failed to place order.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="shoppingCart">
     
      <h3>{userEmail ? "Ray's Cart" : "SHOPPING CART"}</h3>

      <div>
        {cartData.map((product) => (
          <div key={product.productID} className="product-card">
            <img
              src={`http://localhost:7700${product.productImagePath}`}
              alt={product.productName}
              className="product-image"
            />
            <div>
              <p>{product.productName}</p>
              <p>Price: Ksh.{product.Price}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => updateQuantity(product.productID, (quantities[product.productID] || 1) - 1)}
                >
                  <RemoveIcon />
                </button>
                <span>{quantities[product.productID] || 1}</span>
                <button
                  onClick={() => updateQuantity(product.productID, (quantities[product.productID] || 1) + 1)}
                >
                  <AddIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cartData.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Checkout
        </button>
      )}
    </div>
  );
};

export default ShoppingCart;
