import "./MainContent.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { inventoryService } from "../services/inventoryService";
import Button from "./Button";

const MainContent = ({ onProductClick }) => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const products = await inventoryService.getFeatured(8);
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <main className="content-wrapper">
      <section className="intro-section">
        <h2>Featured Products</h2>
        <p>Check out our products!</p>
      </section>
      
      {loading ? (
        <p>Loading featured products...</p>
      ) : featuredProducts.length > 0 ? (
        <>
          <div className="features-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="feature-card">
                {product.thumbnail && (
                  <div className="product-image">
                    <img src={product.thumbnail} alt={product.name} />
                  </div>
                )}
                <h3>{product.name}</h3>
                <p className="product-description">{product.description?.substring(0, 60)}...</p>
                <p className="product-price">${product.price?.toFixed(2)}</p>
                <div className="feature-card-actions">
                  <Button onClick={() => onProductClick(product)}>
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-container">
            <Button onClick={() => navigate("/products")}>
              View All Products
            </Button>
          </div>
        </>
      ) : (
        <p className="no-products">No featured products available.</p>
      )}
    </main>
  );
};

export default MainContent;
