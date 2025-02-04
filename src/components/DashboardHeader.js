import React,{useState} from 'react'
import '../styles/DashboardHeader.css'
import {Link} from 'react-router-dom'
import { FaUser,FaAngleDown,FaAngleUp} from 'react-icons/fa'
import DashDropdown from './DashDropdown';

const DashboardHeader = () => {
  const [showDashDropdown, setShowDashDropdown]=useState(false)
  const toggleDashDropdown=()=>{
    setShowDashDropdown(prevState=>!prevState);
  }
  return (
    <div className='dashboardHeader'>
    <div className='LeftIcons'>
      <Link>Orders</Link>
      <Link>Shop</Link>
    </div>
    <div className='midSide'>
      <h2>RIMAL'S CROTCHETS</h2>
    </div>
    <div className='rightIcon'>
        <Link onClick={toggleDashDropdown}>
          <FaUser />
          {showDashDropdown ? <FaAngleUp /> : <FaAngleDown />}
        </Link>
        {showDashDropdown && <DashDropdown />}
    </div>
  </div>
  )
}

export default DashboardHeader
