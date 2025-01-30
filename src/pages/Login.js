import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [formData,setFormData]= useState({
    email:"",
    passwd:"",
  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log("Form Data submitted", formData)
  }
  return (
    <div className='Login'>
      <form onSubmit={handleSubmit}>
        <p> LOG IN TO YOUR ACCOUNT</p>
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
        <button type='submit'>
            Log In
        </button>
        <Link to='/SignUp'>Don't have an Account? Signup</Link>
        </form>
       
    </div>
  )
}

export default Login
