import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/subHeader.css'
const ClothHeader = () => {
  return (
    <div className='ClothHeader'>
      <ul className='clothesList'>
             <li><Link to="/Catalog/Sweaters">Sweaters</Link></li>
             <li><Link>Accesories</Link></li>
             <li><Link>Pants</Link></li>
             <li><Link>Tops</Link></li>
             <li><Link>Bags</Link></li> 
        </ul>
    </div>
  )
}

export default ClothHeader
