import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from './services/productService';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css'; // Create this file for styling

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Format category for display
  const formatCategoryName = (cat) => {
    return cat
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let data;
        
        // Determine if we're looking at accessories or a bike category
        if (category === 'accessories') {
          data = await productService.getAllAccessories();
        } else {
          // Convert URL parameter to expected category format
          const formattedCategory = formatCategoryName(category);
          data = await productService.getBikesByCategory(formattedCategory);
        }
        
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category]);
  
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="category-page">
      <h1>{formatCategoryName(category)}</h1>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found in this category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              type={category === 'accessories' ? 'accessory' : 'bike'} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;