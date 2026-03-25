import { createContext, useState, useEffect, useCallback } from "react";
import { cartService } from "../services/cartService";
import { authService } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext(null);

export { CartContext };

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Check if we have a valid token (not just user data)
  const hasValidToken = () => {
    const token = authService.getToken();
    return !!token;
  };

  // Calculate cart totals
  const calculateTotals = useCallback((products) => {
    const total = products.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = products.reduce((sum, item) => sum + item.quantity, 0);
    setCartTotal(total);
    setCartCount(count);
  }, []);

  // Fetch cart from backend
  const fetchCart = useCallback(async () => {
    // Only fetch if user is authenticated AND we have a valid token
    if (!isAuthenticated || !hasValidToken()) {
      console.log("fetchCart skipped: not authenticated or no valid token");
      return;
    }
    
    setLoading(true);
    try {
      console.log("Fetching cart...");
      const cart = await cartService.getCart();
      console.log("Cart fetched successfully:", cart);
      if (cart && cart.products) {
        setCartItems(cart.products);
        calculateTotals(cart.products);
      }
    } catch (error) {
      console.error("Error fetching cart:", error.message);
      // If session expired, don't update cart items (user will need to re-login)
      if (error.message.includes("Session expired") || error.message.includes("Please login again") || error.message.includes("No authentication token")) {
        setCartItems([]);
        setCartTotal(0);
        setCartCount(0);
      }
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, calculateTotals]);

  // Fetch cart on mount and when auth changes
  useEffect(() => {
    console.log("CartContext useEffect triggered, isAuthenticated:", isAuthenticated, "hasValidToken:", hasValidToken());
    // Only fetch cart if we have both user and valid token
    if (isAuthenticated && hasValidToken()) {
      fetchCart();
    } else {
      setCartItems([]);
      setCartTotal(0);
      setCartCount(0);
    }
  }, [isAuthenticated, fetchCart]);

  // Add item to cart
  const addToCart = async (product) => {
    if (!isAuthenticated) {
      alert("Please login to add items to cart");
      return;
    }

    setLoading(true);
    try {
      const cart = await cartService.addToCart(product);
      if (cart && cart.products) {
        setCartItems(cart.products);
        calculateTotals(cart.products);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    setLoading(true);
    try {
      const cart = await cartService.updateCartItem(productId, quantity);
      if (cart && cart.products) {
        setCartItems(cart.products);
        calculateTotals(cart.products);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      const cart = await cartService.removeFromCart(productId);
      if (cart && cart.products) {
        setCartItems(cart.products);
        calculateTotals(cart.products);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    setLoading(true);
    try {
      await cartService.clearCart();
      setCartItems([]);
      setCartTotal(0);
      setCartCount(0);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cartItems,
    cartTotal,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};