import React from 'react'
import '../styles/ListHeader.css'
import {Link} from 'react-router-dom';
const ListHeader = () => {
  
  return (
    <div className='Dropdown'>
        <ul className='dropdownList'>
            <li><Link to="/Catalog/Sweaters">Sweaters</Link></li>
            <li><Link>Accesories</Link></li>
            <li><Link>Pants</Link></li>
            <li><Link>Tops</Link></li>
            <li><Link>Bags</Link></li>
            
        </ul>
    </div>
  )
}

export default ListHeader

