const API_URL = "http://localhost:3000/api/auth/";

export const authService = {
  async register(userData) {
    const response = await fetch(`${API_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();

    if (!response.ok) {
      // 2nd parameter is called a Fallback
      throw new Error(data.message || "Registration failed.");
    }
    return data;
  },

  async login(credentials) {
    const response = await fetch(`${API_URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }
    if (data.token) {
      localStorage.setItem("token", data.token);
      const user = {
        _id: data._id,
        username: data.username,
        email: data.email
      };
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event('auth-login-success'));
    }
    return data;
  },

  async logout() {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return response.ok;
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }
  },

  getCurrentUser() {
    const userString = localStorage.getItem("user");
    // ternary operation (short-hand if-else)
    try {
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
