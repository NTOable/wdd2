import React, { useState, useEffect } from "react";
import { inventoryService } from "../services/inventoryService";
import ProductCard from "./ProductCard";
import "./FeaturedProducts.css";

const FeaturedProducts = ({ limit = 4, onProductClick }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [limit]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await inventoryService.getFeatured(limit);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Failed to load featured products");
      console.error("Error fetching featured products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    fetchFeaturedProducts();
  };

  // Loading state
  if (loading) {
    return (
      <div className="featured-products-container">
        <h2 className="featured-products-title">Featured Products</h2>
        <div className="featured-products-grid">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="featured-product-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-description"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="featured-products-container">
        <h2 className="featured-products-title">Featured Products</h2>
        <div className="featured-products-error">
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="featured-products-container">
        <h2 className="featured-products-title">Featured Products</h2>
        <div className="featured-products-empty">
          <p>No featured products available at the moment.</p>
          <p>Check back soon for exciting deals!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-products-container">
      <h2 className="featured-products-title">Featured Products</h2>
      <p className="featured-products-subtitle">Discover our handpicked selections</p>
      <div className="featured-products-grid">
        {products.map((product) => (
          <ProductCard 
            key={product._id} 
            product={product} 
            onClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
