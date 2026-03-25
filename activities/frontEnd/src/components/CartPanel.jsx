import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Button from "./Button";
import "./CartPanel.css";

export default function CartPanel({ onClose }) {
  const navigate = useNavigate();
  const { 
    cartItems, 
    cartTotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    loading 
  } = useCart();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(productId, newQuantity);
  };

  const handleRemove = async (productId) => {
    if (window.confirm("Remove this item from cart?")) {
      await removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                      disabled={loading}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemove(item.productId)}
                    disabled={loading}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <Button onClick={clearCart} disabled={loading}>
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout} disabled={loading}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}