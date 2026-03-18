import "./Hero.css";
import React from "react";
import Button from "./Button";
import FeaturedProducts from "./FeaturedProducts";

const Hero = ({ title, description, buttonText, showFeatured = true }) => {
  return (
    <>
      <section className="hero-container">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <Button variant="primary">{buttonText}</Button>
        </div>
      </section>
      {showFeatured && (
        <FeaturedProducts limit={4} />
      )}
    </>
  );
};

export default Hero;
