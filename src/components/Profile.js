import React, { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";
import "../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phoneNo: "",
    email: "",
  });

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
          setFormData({
            fname: data.profile.fname,
            lname: data.profile.lname,
            phoneNo: data.profile.phoneNo,
            email: data.profile.email,
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch user profile");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("Saving...");
    try {
      const response = await fetch("http://localhost:7700/api/User/Profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(formData);
        setMessage("Profile updated successfully!");
        setIsEditing(false);
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Something went wrong!");
    }
  };

  if (loading) return <div className="dotArea">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="Profile">
      <div className="top">
        <h2>USER DETAILS</h2>
        <button className="pen" onClick={() => setIsEditing(!isEditing)}>
          <FaPen />
        </button>
      </div>

      {message && <div className="message-box">{message}</div>}

      {isEditing ? (
        <form className="profile-form" onSubmit={handleSave}>
          <label>First Name: </label>
          <input type="text" name="fname" value={formData.fname} onChange={handleChange} required />
          <label>Surname: </label>
          <input type="text" name="lname" value={formData.lname} onChange={handleChange} required />
          <label>Phone Number: </label>
          <input type="text" name="phoneNo" value={formData.phoneNo} onChange={handleChange} required />
          <label>Email: </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <button type="submit">Save</button>
        </form>
      ) : (
        profile && (
          <div className="user-card">
            <p>Name: {profile.fname} {profile.lname}</p>
            <p>Phone Number: +254{profile.phoneNo}</p>
            <p>Email: {profile.email}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
