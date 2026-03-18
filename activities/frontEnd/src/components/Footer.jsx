import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* <div className="footer-brand">
          <h3>AIV</h3>
          <p>arctic9</p>
        </div> */}
      </div>
      {/* <div className="footer-links">
        <a href="/">Home</a>
        <a href="/auth">Login</a>
        <a href="/auth?mode=register">Register</a>
        <a href="/inventory">Inventory</a>
      </div> */}
      <div className="footer-bottom">
        <p>&copy; 2026 CIIT AIV</p>
      </div>
    </footer>
  );
};

export default Footer;
