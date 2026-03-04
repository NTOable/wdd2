import "./Hero.css";
import React from "react";
import Button from "./Button";

const Hero = ({ title, description, buttonText }) => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1>{title}</h1>
        <p>{description}</p>
        <Button variant="primary">{buttonText}</Button>
      </div>
    </section>
  );
};

export default Hero;
