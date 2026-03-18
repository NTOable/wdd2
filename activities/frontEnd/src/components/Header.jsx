import "./Header.css";
import React from "react";
import Button from "./Button";

export default function Header() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="logo">
            <h2>My App</h2>
          </div>
          <nav className="navigation">
            <a href="/">Home</a>
            <a href="/login">Login</a>
            <a href="/inventory">Inventory</a>
          </nav>
          <div className="auth-section">
            <Button type="button">Login</Button>
            <Button
              type="button"
              onClick={() => (window.location.href = "/auth?mode=register")}
            >
              Register
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
