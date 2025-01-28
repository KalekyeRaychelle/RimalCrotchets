import React from 'react'
import backgrndImg from '../assets/shirtBackground.jpg'
import '../styles/midSection.css'
const MidSection = () => {
  return (
    <div className='midSection'>
      <img src={backgrndImg} alt='Home Background'/>
      <button>SHOP NOW</button>
    </div>
  )
}

export default MidSection
