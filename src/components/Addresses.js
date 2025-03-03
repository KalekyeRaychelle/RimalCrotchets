import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import "../styles/Profile.css";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    County: "",
    Constituency: "",
    Street: "",
    Estate: "",
    Floor: "",
    HouseNo: "",
  });

  useEffect(() => {
    fetch("http://localhost:7700/api/User/Address", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setAddresses(data.addresses); 
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user addresses");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowForm(false);
    setMessage("Adding address...");

    try {
      const response = await fetch("http://localhost:7700/api/User/newAddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Address added successfully!");
        setAddresses((prev) => [...prev, formData]);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Something went wrong!");
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="Profile">
      <div className="top">
        <h2>USER ADDRESSES</h2>
        {error && !showForm && (
          <div className="errorBox">
            <BsInfoCircle className="info" />
            <p>{error}</p>
          </div>
        )}
      </div>

      {message && <div className="message-box">{message}</div>}

      {addresses.length > 0 && !showForm && (
        <div className="user-cards">
          {addresses.map((addr, index) => (
            <div key={index} className="user-card">
              <h4>Address {index + 1}</h4>
              <p>County: {addr.County}</p>
              <p>Constituency: {addr.Constituency}</p>
              <p>Street: {addr.Street}</p>
              <p>Estate: {addr.Estate}</p>
              <p>Floor: {addr.floor}</p>
              <p>House Number: {addr.HouseNo}</p>
            </div>
          ))}
        </div>
      )}

      <button className="toggleFormBtn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Address"}
      </button>

      {showForm && (
        <div className="address-form">
          <form onSubmit={handleSubmit}>
            <h3>NEW ADDRESS</h3>

            {["County", "Constituency", "Street", "Estate", "Floor", "HouseNo"].map((field) => (
              <div key={field} className="input-group">
                <label>{field}:</label>
                <input
                  type="text"
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <button type="submit">Save Address</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Addresses;
