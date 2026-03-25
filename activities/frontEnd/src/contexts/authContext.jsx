import { createContext, useState, useEffect, useMemo } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export { AuthContext };

export const AuthProvider = ({ children }) => {
  console.log("AuthProvider rendering");
  const [user, setUser] = useState(() => {
    const storedUser = authService.getCurrentUser();
    console.log("Initial user from localStorage:", storedUser);
    return storedUser;
  });
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setLoading(false);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const login = async (credentials) => {
    console.log("login called with:", credentials);
    const data = await authService.login(credentials);
    console.log("login response:", data);
    // Backend returns {_id, username, token} - normalize to user object
    const user = {
      _id: data._id,
      username: data.username,
      email: data.email
    };
    console.log("Setting user state:", user);
    setUser(user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }), [user, loading]);

  console.log("AuthProvider value:", { user, isAuthenticated: !!user });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
