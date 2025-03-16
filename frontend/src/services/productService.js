const API_URL = 'http://localhost:3001/api'; 

export const productService = {
  // Fetch all bikes
  getAllBikes: async () => {
    try {
      const response = await fetch(`${API_URL}/bikes`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch bikes:', error);
      throw error;
    }
  },
  
  // Fetch all accessories
  getAllAccessories: async () => {
    try {
      const response = await fetch(`${API_URL}/accessories`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch accessories:', error);
      throw error;
    }
  },
  
  // Fetch bikes by category
  getBikesByCategory: async (category) => {
    try {
      const formattedCategory = category
        .split('-') // Handle URL category slugs (e.g., "road-bikes")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      const response = await fetch(`${API_URL}/bikes/category/${formattedCategory}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${category} bikes:`, error);
      throw error;
    }
  },
  
  // Search products
  searchProducts: async (query) => {
    try {
      const response = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  },
  
  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/product/${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw error;
    }
  }
};

export default productService;
