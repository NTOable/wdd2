import "./Header.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import CartIcon from "./CartIcon";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <h2>My App</h2>
          </div>
          <nav className="navigation">
            <Link to="/landing">Home</Link>
            <Link to="/inventory">Inventory</Link>
          </nav>
          <div className="auth-section">
            <CartIcon />
            {isAuthenticated ? (
              <>
                <span style={{ marginRight: '10px' }}>Welcome, {user?.username}</span>
                <Button type="button" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button type="button">Login</Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button type="button">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
