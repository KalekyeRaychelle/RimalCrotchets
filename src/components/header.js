import React, { useState, useRef, useEffect } from 'react';
import headerIcon from '../assets/headerIcon.png';
import { FaShoppingBag, FaSignInAlt, FaSearch, FaListUl} from "react-icons/fa";
import ListHeader from './ListHeader';
import ShoppingCart from '../pages/ShoppingCart';
import '../styles/header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInfo, setSearchInfo] = useState({ searchInput: '' });
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null); 

  const handleChange = (e) => {
    console.log("Typing: ", e.target.value);
    setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Search Data submitted", searchInfo.searchInput);

    try {
      const response = await fetch(
        `http://localhost:7700/api/Catalog/searchProduct?query=${encodeURIComponent(searchInfo.searchInput)}`,
        { method: "GET" }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Search results:", data);
        setSearchResults(data);
        setShowResults(true); 
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  return (
    <>
      <div className='Header'>
        <div className='leftSide'>
          <img src={headerIcon} alt='Header Icon' />
          <h2>RIMAL'S CROCHETS</h2>
        </div>

        <div className='searchBar'>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="SEARCH PIECE"
              id="searchInfo"
              name="searchInput"
              value={searchInfo.searchInput}
              onChange={handleChange}
            />
            <button className='searchButton' type='submit'>
              <FaSearch />
            </button>
          </form>
        </div>

        {showResults && (
          <div className='searchResults' ref={searchRef}>
            
            {searchResults.length > 0 && (
              <ul>
                {searchResults.map((item) => (
                  <li key={item.productID} className="search-item">
                    <img src={`http://localhost:7700${item.productImagePath}`} alt={item.productName} />
                    <span>{item.productName}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className='rightSide'>
          <ul className='liLinks'>
            <li>
              <button className="cart-toggle-btn" onClick={() => setCartOpen(true)}>
                <FaShoppingBag />
              </button>
            </li>
            <li><Link to='/SignUp'><FaSignInAlt /></Link></li>
            <li onClick={toggleDropdown} className="dropdownIcon">
              <FaListUl />
            </li>
          </ul>
          {showDropdown && <ListHeader />}
        </div>
      </div>

      <ShoppingCart isOpen={cartOpen} closeCart={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
