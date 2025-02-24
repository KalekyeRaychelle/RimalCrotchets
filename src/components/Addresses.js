import React, { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import '../styles/Profile.css'
import { BsInfoCircle } from "react-icons/bs";

const Addresses = () => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");


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
          setAddress(data.address); 
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user Address");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="dotArea">
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>
    );
  }

  if (error) {
    return <div className="errorBox">
      <BsInfoCircle className="info"/><p>{error}</p></div>;
  }

  return (
    <div className="Profile">
      <div className="top">
        <h2>USER ADDRESS</h2>
        <button className="pen"><FaPlusCircle/></button>

      </div>
      

      {message && <div className="message-box">{message}</div>}

      {address && (
        
          <div className="user-card">
            <p>County: {address.County} </p>
            <p>Constituency: {address.Constituency} </p>
            <p>Street: {address.Street} </p>
            <p>Estate: {address.Estate} </p>
            <p>Floor: {address.floor} </p>
            <p>House Number:  {address.HouseNo}</p>

          </div>
        
      )}
    </div>
  );
};

export default Addresses;
