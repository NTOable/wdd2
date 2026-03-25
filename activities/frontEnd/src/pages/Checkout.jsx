import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { orderService } from "../services/orderService";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart, loading } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.shippingAddress.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Invalid card number (16 digits required)";
    }
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY required)";
    }
    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Invalid CVV";
    }
    if (!formData.nameOnCard.trim()) {
      newErrors.nameOnCard = "Name on card is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const orderData = {
        userId: user._id,
        items: cartItems,
        totalAmount: cartTotal,
        shippingAddress: {
          address: formData.shippingAddress,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        payment: {
          cardLast4: formData.cardNumber.slice(-4),
          nameOnCard: formData.nameOnCard,
        },
      };
      
      await orderService.createOrder(orderData);
      await clearCart();
      setOrderPlaced(true);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <Card>
          <div className="order-success">
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <Button onClick={() => navigate("/landing")}>
              Continue Shopping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <Card>
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some items to your cart before checking out.</p>
            <Button onClick={() => navigate("/inventory")}>
              Go to Inventory
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <Button 
        onClick={() => navigate(-1)}
        style={{ marginBottom: '20px' }}
      >
        ← Back
      </Button>
      
      <h1>Checkout</h1>
      
      <div className="checkout-grid">
        <div className="checkout-form-section">
          <Card title="Shipping Information">
            <form onSubmit={handleSubmit}>
              <Input
                label="Shipping Address"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                error={errors.shippingAddress}
                placeholder="Enter your address"
                required
              />
              <Input
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                placeholder="Enter city"
                required
              />
              <Input
                label="ZIP Code"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
                placeholder="Enter ZIP code"
                required
              />
            </form>
          </Card>

          <Card title="Payment Information" style={{ marginTop: '20px' }}>
            <form onSubmit={handleSubmit}>
              <Input
                label="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                required
              />
              <Input
                label="Name on Card"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                error={errors.nameOnCard}
                placeholder="John Doe"
                required
              />
              <div className="form-row">
                <Input
                  label="Expiry Date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  error={errors.expiryDate}
                  placeholder="MM/YY"
                  maxLength={5}
                  required
                />
                <Input
                  label="CVV"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  error={errors.cvv}
                  placeholder="123"
                  maxLength={4}
                  required
                />
              </div>
            </form>
          </Card>
        </div>

        <div className="order-summary-section">
          <Card title="Order Summary">
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.productId} className="order-item">
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button 
              onClick={handleSubmit}
              loading={loading}
              style={{ width: '100%', marginTop: '20px' }}
            >
              Place Order
            </Button>
            
            {errors.submit && (
              <p className="error-text">{errors.submit}</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
