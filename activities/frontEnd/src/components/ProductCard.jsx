import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onClick, showWishlist = true }) => {
  const { name, description, price, category, images, thumbnail, originalPrice } = product;

  // Get the first image or use placeholder
  const imageUrl = thumbnail || (images && images[0]) || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop";

  const handleWishlist = (e) => {
    e.stopPropagation();
    // Wishlist functionality can be added later
    console.log("Added to wishlist:", name);
  };

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="product-card-image">
        <img src={imageUrl} alt={name} />
        {category && <span className="product-card-category">{category}</span>}
        {showWishlist && (
          <button className="product-card-wishlist" onClick={handleWishlist} title="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{name}</h3>
        {description && <p className="product-card-description">{description}</p>}
        <div className="product-card-meta">
          <div className="product-card-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>4.8</span>
            <span>(24)</span>
          </div>
        </div>
        <div className="product-card-footer">
          <div className="product-card-price">
            ${price?.toFixed(2) || "0.00"}
            {originalPrice && <span>${originalPrice.toFixed(2)}</span>}
          </div>
          <button className="product-card-button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
