import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Create this file for styling

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page with the query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search bikes and accessories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;