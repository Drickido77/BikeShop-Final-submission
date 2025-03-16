const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Helper function to read JSON files
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, '..', 'data', filename);
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Get all bikes
router.get('/bikes', (req, res) => {
  try {
    const bikeData = readJsonFile('bikes.json');
    res.json(bikeData.bikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bike data', error: error.message });
  }
});

// Get all accessories
router.get('/accessories', (req, res) => {
  try {
    const accessoryData = readJsonFile('accessories.json');
    res.json(accessoryData.accessories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accessory data', error: error.message });
  }
});

// Get bikes by category
router.get('/bikes/category/:category', (req, res) => {
  try {
    const bikeData = readJsonFile('bikes.json');
    const category = req.params.category;
    
    const filteredBikes = bikeData.bikes.filter(bike => 
      bike.category.toLowerCase() === category.toLowerCase()
    );
    
    res.json(filteredBikes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bikes by category', error: error.message });
  }
});

// Search products (both bikes and accessories)
router.get('/search', (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const bikeData = readJsonFile('bikes.json');
    const accessoryData = readJsonFile('accessories.json');
    
    // Filter bikes based on query
    const filteredBikes = bikeData.bikes.filter(bike => 
      bike.name.toLowerCase().includes(query) || 
      bike.description.toLowerCase().includes(query) ||
      bike.category.toLowerCase().includes(query)
    );
    
    // Filter accessories based on query
    const filteredAccessories = accessoryData.accessories.filter(accessory => 
      accessory.name.toLowerCase().includes(query) || 
      accessory.description.toLowerCase().includes(query)
    );
    
    res.json({
      bikes: filteredBikes,
      accessories: filteredAccessories,
      totalResults: filteredBikes.length + filteredAccessories.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during search', error: error.message });
  }
});

// Get product by ID (either bike or accessory)
router.get('/product/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const bikeData = readJsonFile('bikes.json');
    const accessoryData = readJsonFile('accessories.json');
    
    // Check if product is a bike
    const bike = bikeData.bikes.find(b => b.id === productId);
    if (bike) {
      return res.json({ ...bike, type: 'bike' });
    }
    
    // Check if product is an accessory
    const accessory = accessoryData.accessories.find(a => a.id === productId);
    if (accessory) {
      return res.json({ ...accessory, type: 'accessory' });
    }
    
    // If product not found
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

module.exports = router;
