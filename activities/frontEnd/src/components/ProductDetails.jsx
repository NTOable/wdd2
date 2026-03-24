import { useCart } from "../hooks/useCart";
import Button from "./Button";
import "./ProductDetails.css";

export default function ProductDetails({ product, onClose }) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.thumbnail || '',
      });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      alert("Failed to add to cart: " + error.message);
    }
  };

  return (
    <div className="product-details-overlay" onClick={onClose}>
      <div className="product-details-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="product-details-content">
          <div className="product-details-image">
            <img 
              src={product.thumbnail || "https://placehold.co/400x400?text=No+Image"} 
              alt={product.name}
            />
          </div>
          
          <div className="product-details-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="product-price">${product.price.toFixed(2)}</p>
            
            <div className="product-stock">
              {product.stock > 0 ? (
                <span className="in-stock">In Stock ({product.stock} available)</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            
            <div className="product-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>
            
            {product.tags && product.tags.length > 0 && (
              <div className="product-tags">
                <h3>Tags</h3>
                <div className="tags-list">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="product-actions">
              <Button onClick={handleAddToCart} disabled={product.stock === 0}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}