import React from 'react'
import backgrndImg from '../assets/yarn.jpg'
import '../styles/midSection.css'
import { useNavigate } from 'react-router-dom'
const MidSection = () => {
  const navigate=useNavigate()
  const handleShopNow=()=>{
    navigate('/Catalog')
  }
  return (
    <div className='midSection'>
      <img src={backgrndImg} alt='Home Background'/>
      <button onClick={handleShopNow}>SHOP NOW</button>
    </div>
  )
}

export default MidSection
