import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <h2>My App</h2>
          </div>
          <nav className="navigation">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/inventory">Inventory</Link>
          </nav>
          <div className="auth-section">
            <CartIcon />
            <Link to="/login">
              <Button type="button">Login</Button>
            </Link>
            <Link to="/auth?mode=register">
              <Button type="button">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
