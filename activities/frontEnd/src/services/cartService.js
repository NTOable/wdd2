import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/cart/";

export const cartService = {
  // Get user's cart
  async getCart() {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Server error occurred" };
    }

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid - clear storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Session expired. Please login again.");
      }
      throw new Error(data.message || "Failed to fetch cart");
    }
    return data;
  },

  // Add item to cart
  async addToCart(product) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    // Handle non-JSON responses
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Server error occurred" };
    }

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Session expired. Please login again.");
      }
      throw new Error(data.message || "Failed to add item to cart");
    }
    return data;
  },

  // Update item quantity
  async updateCartItem(productId, quantity) {
    const token = authService.getToken();
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update cart");
    }
    return data;
  },

  // Remove item from cart
  async removeFromCart(productId) {
    const token = authService.getToken();
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}remove/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove item from cart");
    }
    return data;
  },

  // Clear entire cart
  async clearCart() {
    const token = authService.getToken();
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to clear cart");
    }
    return data;
  },
};