import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/Signup.css'

const Signup = () => {
  const [formData,setFormData]=useState({
    fname:"",
    lname:"",
    phoneNo:"",
    email:"",
    passwd:"",
    conpasswd:"",

  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Form Data submitted", formData)
  }
  return (
    <div className='Signup'>
      <form onSubmit={handleSubmit}>
        <p>SIGN UP</p> 
        <label>First Name:</label>
        <input type='text' id='fname' name='fname' placeholder='Amelia'
         value={formData.fname}
         onChange={handleChange}
         required/>
        <label>SurName:</label>
        <input type='text' id='lname' name='lname' placeholder='Mbonde'
         value={formData.lname}
         onChange={handleChange}
         required/> 
        <label>Phone Number: </label>
        <input type='tel' id='phoneNo' name='phoneNo'
         value={formData.phoneNo}
         onChange={handleChange}
         required/>
        <label>Email Address:</label>
        <input type='email' id='email' name='email'
         value={formData.email}
         onChange={handleChange}
         required/>
        <label>Password:</label>
        <input type='password' id='passwd' name='passwd'
         value={formData.passwd}
         onChange={handleChange}
         required/>
        <label>Confirm Password:</label>
        <input type='password' id='conpasswd' name='conpasswd'
         value={formData.conpasswd}
         onChange={handleChange}
         required/>
        <button type='submit'>Sign Up</button>
        <Link to='/LogIn'>Have an Account? Login</Link>
      </form>
    </div>
  )
}

export default Signup
