// frontend/src/pages/ProductListing.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductListing = () => {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/bikes")
      .then((response) => setBikes(response.data))
      .catch((error) => console.error("Error fetching bikes:", error));
  }, []);

  const filteredBikes = bikes.filter(bike =>
    bike.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Our Bikes</h1>
      <input
        type="text"
        placeholder="Search bikes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginBottom: "20px" }}
      />
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {filteredBikes.map(bike => (
          <div key={bike.id} style={{ margin: "10px", border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <h3>{bike.name}</h3>
            <p>Price: ${bike.price}</p>
            <p>Type: {bike.type}</p>
            <img src={bike.image} alt={bike.name} width="150px" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
