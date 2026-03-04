import "./MainContent.css";
import React from "react";
import { useEffect } from "react";

const MainContent = () => {
  const features = [
    {
      id: 1,
      title: "GENIUS",
      description:
        "arctic9",
    },
    {
      id: 2,
      title: "MOONSCORCHED",
      description:
        "you make me go crazy over you.",
    },
    {
      id: 3,
      title: "THE RAIN PALACE",
      description:
        "the phantom thieves will steal your heart.",
    },
  ];
  useEffect(() => {
    console.log(features);
  }, []);

  return (
    <main className="content-wrapper">
      <section className="intro-section">
        <h2>Introduction</h2>
        <p>AIV</p>
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
