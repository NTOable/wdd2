import { authService } from "./authService";

const API_URL = "http://localhost:3000/api/orders/";

export const orderService = {
  async createOrder(orderData) {
    const token = authService.getToken();
    
    if (!token) {
      throw new Error("No authentication token found. Please login.");
    }
    
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    
    const contentType = response.headers.get("content-type");
    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = { message: "Server error occurred" };
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to create order");
    }
    return data;
  },

  async getOrders() {
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
    
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }
    return data;
  },
};
