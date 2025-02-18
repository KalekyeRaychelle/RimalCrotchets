import React from 'react'
import '../styles/ListHeader.css'
import {Link} from 'react-router-dom';
const ListHeader = () => {
  
  return (
    <div className='Dropdown'>
        <ul className='dropdownList'>
            <li><Link to="/Catalog/Sweaters">Sweaters</Link></li>
            <li><Link >Accesories</Link></li>
            <li><Link to='/Catalog/Pants'>Pants</Link></li>
            <li><Link to="/Catalog/Tops">Tops</Link></li>
            <li><Link to="/Catalog/Bags">Bags</Link></li>
            
        </ul>
    </div>
  )
}

export default ListHeader

