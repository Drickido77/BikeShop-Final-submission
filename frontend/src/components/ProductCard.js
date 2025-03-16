import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Get the correct image URL
  const getImageUrl = (product) => {
    return product.imageUrl ? `http://localhost:3001${product.imageUrl}` : "http://localhost:3001/images/placeholder.jpg";
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={getImageUrl(product)}
          alt={product.name}
          onError={(e) => {
            console.error(`Failed to load image for ${product.name}`);
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = "http://localhost:3001/images/placeholder.jpg"; // Fallback image
          }}
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-status">
          {product.inStock ? 
            <span className="in-stock">In Stock</span> : 
            <span className="out-of-stock">Out of Stock</span>}
        </p>
        <Link to={`/product/${product.id}`} className="view-details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
