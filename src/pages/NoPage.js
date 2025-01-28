import React from 'react'
import '../styles/NoPage.css'
import { FaExclamationTriangle } from "react-icons/fa";
const NoPage = () => {
  return (
    <div className='noPage'>
      <i> <FaExclamationTriangle /></i>
      <h2>ERROR 404:NOT FOUND</h2>
    </div>
  )
}

export default NoPage;