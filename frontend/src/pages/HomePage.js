// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to BikeNow</h1>
          <p>Your premier destination for quality bikes and accessories</p>
          <Link to="/products" className="shop-now-btn">Shop Now</Link>
        </div>
      </header>

      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Mountain Bikes</h3>
            <Link to="/products/mountain">View Collection</Link>
          </div>
          <div className="category-card">
            <h3>Road Bikes</h3>
            <Link to="/products/road">View Collection</Link>
          </div>
          <div className="category-card">
            <h3>Accessories</h3>
            <Link to="/products/accessories">View Collection</Link>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Why Choose BikeNow?</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>Quality Selection</h3>
            <p>Curated collection of premium bikes and gear</p>
          </div>
          <div className="feature">
            <h3>Expert Service</h3>
            <p>Professional assembly and maintenance</p>
          </div>
          <div className="feature">
            <h3>Satisfaction Guaranteed</h3>
            <p>30-day return policy on all purchases</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;