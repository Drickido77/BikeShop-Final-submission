import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductListing from './pages/ProductListing';
import SearchResults from './pages/SearchResults';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:category" element={<ProductListing />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
