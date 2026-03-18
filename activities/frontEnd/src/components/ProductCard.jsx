import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onClick }) => {
  const { name, description, price, category, images, thumbnail } = product;

  // Get the first image or use placeholder
  const imageUrl = thumbnail || (images && images[0]) || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="product-card" onClick={() => onClick && onClick(product)}>
      <div className="product-card-image">
        <img src={imageUrl} alt={name} />
        {category && <span className="product-card-category">{category}</span>}
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{name}</h3>
        {description && <p className="product-card-description">{description}</p>}
        <div className="product-card-footer">
          <span className="product-card-price">${price?.toFixed(2) || "0.00"}</span>
          <button className="product-card-button">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
