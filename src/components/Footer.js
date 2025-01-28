import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css'
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer'>
      <div className='leftSideFooter'>
        <p>RIMAL'S CROTCHETS &copy; {new Date().getFullYear()}</p>
        <div className="socialLinks">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
            </a>
        </div>
      </div>
      <div className='middleAreaFooter'>
        <ul>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
        </ul>

      </div>
      <div className='rightSideFooter'>
        <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/About'>About Us</Link></li>
            <li><Link to='/Contact'>Contact</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
