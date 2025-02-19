import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import '../styles/Profile.css'


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");


  useEffect(() => {
    fetch("http://localhost:7700/api/User/Profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProfile(data.profile); 
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch user profile");
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
    return <div>{error}</div>;
  }

  return (
    <div className="Profile">
      <div className="top">
        <h2>USER DETAILS</h2>
        <button className="pen"><FaPen/></button>

      </div>
      

      {message && <div className="message-box">{message}</div>}

      {profile && (
        
          <div className="user-card">
            <p>Name: {profile.fname} {profile.lname}</p>
            <p>Phone Number: + 254{profile.phoneNo}</p>
            <p>Email: {profile.email}</p>
          </div>
        
      )}
    </div>
  );
};

export default Profile;
