// frontend/src/pages/SearchResults.js

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
//import './SearchResults.css'; // Create this file for styling

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState({ bikes: [], accessories: [], totalResults: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const data = await productService.searchProducts(query);
        setResults(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchSearchResults();
    } else {
      setResults({ bikes: [], accessories: [], totalResults: 0 });
      setLoading(false);
    }
  }, [query]);
  
  if (loading) {
    return <div className="loading">Loading search results...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      <p>{results.totalResults} items found</p>
      
      {results.totalResults === 0 ? (
        <div className="no-results">
          <p>No products match your search. Try different keywords or browse our categories.</p>
        </div>
      ) : (
        <>
          {results.bikes.length > 0 && (
            <div className="category-section">
              <h2>Bikes</h2>
              <div className="products-grid">
                {results.bikes.map(bike => (
                  <ProductCard key={bike.id} product={bike} type="bike" />
                ))}
              </div>
            </div>
          )}
          
          {results.accessories.length > 0 && (
            <div className="category-section">
              <h2>Accessories</h2>
              <div className="products-grid">
                {results.accessories.map(accessory => (
                  <ProductCard key={accessory.id} product={accessory} type="accessory" />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
