import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/DashDropdown.css'
const DashDropdown = () => {
  return (
    <div className='dashdropdown'>
      <Link>Profile</Link>
      <Link>Settings</Link>
      <Link>Log Out</Link>
    </div>
  )
}

export default DashDropdown
