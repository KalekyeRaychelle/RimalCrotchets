import React from 'react'
import '../styles/DashboardFooter.css'
import {Link} from 'react-router-dom'
const DashboardFooter = () => {
  return (
    <div className='dashboardFooter'>
      <Link>Refund Policy</Link>
      <Link>Privacy Policy</Link>
      <Link>Terms Of Service</Link>
      <Link>Contact Information</Link>
    </div>
  )
}

export default DashboardFooter

