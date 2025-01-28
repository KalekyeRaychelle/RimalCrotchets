import React from 'react'
import '../styles/Contact.css'
const Contact = () => {
  return (
    <div className='contact'>
      
      <div>
      <form>
          <p>CONTACT US ON: </p>
          <label>Full Name:</label>
          <input />
          <label>Email:</label>
          <input />
          <label htmlFor="message">Message:</label>
          <textarea rows="6" placeholder="Enter message..." name="message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
