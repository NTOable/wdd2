import "./Hero.css";
import React from "react";
import FeaturedProducts from "./FeaturedProducts";

const Hero = ({ title = "Welcome", description = "Discover amazing products", buttonText = "Get Started", showFeatured = true }) => {
  return (
    <>
      <section className="hero-container">
        <div className="hero-content">
          <h1>
            {title.split(' ').map((word, index) => 
              index === 1 ? <span key={index}>{word} </span> : word + ' '
            )}
          </h1>
          <p>{description}</p>
          <a href="/inventory" className="hero-cta">
            {buttonText}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-number"><span>10K+</span></span>
              <span className="hero-stat-label">Products</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number"><span>5K+</span></span>
              <span className="hero-stat-label">Customers</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-number"><span>99%</span></span>
              <span className="hero-stat-label">Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="scroll-indicator">
          <span></span>
          <span>Scroll</span>
        </div>
      </section>
      {showFeatured && (
        <FeaturedProducts limit={4} />
      )}
    </>
  );
};

export default Hero;
