import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus,FaTimes } from "react-icons/fa";

import "../styles/ShoppingCart.css";

function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage.");
    return null;
  }

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch (error) {
    console.error("Invalid token format:", error);
    return null;
  }
}

const ShoppingCart = ({ isOpen, closeCart }) => {
  const [cartData, setCartData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return; 

    const user = getUserFromToken();
    const userEmail = user?.email || "";

    if (!userEmail) {
      setError("You must be logged in to view the cart.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:7700/api/ShoppingCart/cartProducts?email=${encodeURIComponent(userEmail)}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCartData(Array.isArray(data.carts) ? data.carts : []);
          const initialQuantities = {};
          data.carts.forEach((product) => {
            initialQuantities[product.productID] = product.quantity || 1;
          });
          setQuantities(initialQuantities);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch products");
        setLoading(false);
      });
  }, [isOpen]);

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
    const user = getUserFromToken();
    const userEmail = user?.email || "";

    if (!userEmail) {
      alert("You must be logged in to checkout.");
      return;
    }

    const orderData = cartData.map((product) => ({
      productID: product.productID,
      email: userEmail,
      quantity: quantities[product.productID] || 1,
    }));

    fetch("http://localhost:7700/api/Order/placeOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert("Order placed successfully!");
          setCartData([]);
          setQuantities({});
        } else {
          alert("Failed to place order.");
        }
      })
      .catch((error) => console.error("Error:", error));
  };





  return (
    <div className={`shoppingCart ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h3>{getUserFromToken()?.fname ? `${getUserFromToken().fname}'s Cart` : "SHOPPING CART"}</h3>
        <button className="close-btn" onClick={closeCart}>
          <FaTimes />
        </button>
      </div>

      {cartData.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <div className="cart-content">
          {cartData.map((product) => (
            <div key={product.productID} className="productCard">
              <img src={`http://localhost:7700${product.productImagePath}`} alt={product.productName} className="product-image" />
              <div>
                <p>{product.productName}</p>
                <p>Price: Ksh.{product.Price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(product.productID, (quantities[product.productID] || 1) - 1)}>
                    <FaMinus />
                  </button>
                  <span>{quantities[product.productID] || 1}</span>
                  <button onClick={() => updateQuantity(product.productID, (quantities[product.productID] || 1) + 1)}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="cart-footer">
          <button onClick={handleCheckout} className="checkout-button">
            Checkout. <span className="total-price">Total: Ksh. {cartData.reduce((total, product) => total + product.Price * (quantities[product.productID] || 1), 0).toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
