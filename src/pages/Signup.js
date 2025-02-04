import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    phoneNo: "",
    email: "",
    passwd: "",
    conpasswd: "",
  });
  const [message, setMessage] = useState("");  
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    console.log("Form Data submitted", formData);

    try {
        const response = await fetch("http://localhost:7700/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const text = await response.text(); 
        try {
            const data = JSON.parse(text); 
            if (response.ok) {
                alert("Sign up was successful! Redirecting to login page.");
                navigate("/LogIn");
            } else {
                setMessage(data.error || "Something went wrong during sign-up.");
            }
        } catch (jsonError) {
            console.error("JSON Parse Error:", jsonError);
            setMessage(text || "Invalid server response. Check console for details.");
        }
    } catch (error) {
        setMessage("Something went wrong!");
        console.error("Signup Error:", error);
    }
  };
  return (
    <div className='Signup'>
      <form onSubmit={handleSubmit}>
        <p>SIGN UP</p>
        <label>First Name:</label>
        <input
          type='text'
          id='fname'
          name='fname'
          placeholder='Amelia'
          value={formData.fname}
          onChange={handleChange}
          required
        />
        <label>SurName:</label>
        <input
          type='text'
          id='lname'
          name='lname'
          placeholder='Mbonde'
          value={formData.lname}
          onChange={handleChange}
          required
        />
        <label>Phone Number:</label>
        <input
          type='tel'
          id='phoneNo'
          name='phoneNo'
          value={formData.phoneNo}
          onChange={handleChange}
          required
        />
        <label>Email Address:</label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password: </label>
        <input
          type='password'
          id='passwd'
          name='passwd'
          value={formData.passwd}
          onChange={handleChange}
          required
        />
        <label>Confirm Password: </label>
        <input
          type='password'
          id='conpasswd'
          name='conpasswd'
          value={formData.conpasswd}
          onChange={handleChange}
          required
        />
        <button type='submit'>Sign Up</button>
        <p>{message}</p>
        <Link to='/LogIn'>Have an Account? Login</Link>
      </form>
    </div>
  );
};

export default Signup;
