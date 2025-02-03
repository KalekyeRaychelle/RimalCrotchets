import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => {
  const [formData,setFormData]= useState({
    email:"",
    passwd:"",
  });
  const navigate=useNavigate();
  const [message,setMessage]=useState("");
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log("Form Data submitted", formData);
    try{
      const response=await fetch("http://localhost:7700/api/auth/login",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body: JSON.stringify(formData),
      });
      const data= await response.json()
      if(response.ok){
        navigate("/dashboard");
      }else{
        setMessage(data.error || "Something went wrong during login.");
      }
    } catch (error) {
      setMessage("Something went wrong!");
      console.error("Login Error:", error);
    }
  };
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
        {message && <p className="error-message">{message}</p>}
        </form>
       
    </div>
  )
}

export default Login
