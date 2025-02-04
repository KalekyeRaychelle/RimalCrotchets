import React, {useState} from 'react';
import headerIcon from '../assets/headerIcon.png';
import { FaShoppingBasket } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import ListHeader from './ListHeader';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header= () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  return(
    <div className='Header'>
    <div className='leftSide'>
      <img src={headerIcon} alt='Header Icon' />
      <h2>RIMAL'S CROTCHETS</h2>
    </div>
    <div className='searchBar'>
      <form>
        <input 
          type="search" 
          placeholder="SEARCH PIECE" 
          id="searchBar"
        />
        <FaSearch className="searchIcon" />
      </form>
    </div>
    <div className='rightSide'>
      <ul className='liLinks'>
            <li><Link to='/newProduct'><FaShoppingBasket /></Link></li>
            <li><Link to='/SignUp'><FaSignInAlt /></Link></li>
            <li onClick={toggleDropdown} className="dropdownIcon">
            <FaListUl /></li>
      </ul>
      {showDropdown && <ListHeader />}
    </div> 
  </div>
  );
}
export default Header