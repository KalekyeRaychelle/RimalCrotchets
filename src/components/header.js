import React from 'react';
import headerIcon from '../assets/headerIcon.png';
import { FaShoppingBasket } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import '../styles/header.css';

const Header = () => {
  return (
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
          <li><FaShoppingBasket /></li>
          <li><FaSignInAlt /></li>
        </ul>
      </div> 
    </div>
  );
}

export default Header;
