import "./MainContent.css";
import React from "react";
import { useEffect } from "react";

const MainContent = () => {
  const features = [
    {
      id: 1,
      title: "Card 1",
      description: "1",
    },
    {
      id: 2,
      title: "Card 2",
      description: "2",
    },
    {
      id: 3,
      title: "Card 3",
      description: "3",
    },
  ];
  useEffect(() => {
    console.log(features);
  }, []);

  return (
    <main className="content-wrapper">
      <section className="intro-section">
        <h2>Landing Page</h2>
        <p>My App</p>
      </section>
      <div className="features-grid">
        {features.map((feature) => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainContent;
