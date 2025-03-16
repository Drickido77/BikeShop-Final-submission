import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">BikeNow</Link>

        {/* Search Bar */}
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for bikes and accessories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    </header>
  );
};

export default Header;
