import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

const Landing = () => {
  console.log("Landing is rendering");
  return (
    <>
      <Header />
      <Hero title="AIV" description="My App" buttonText="Confirm" />
      <MainContent />
      <Footer />
    </>
  );
};

export default Landing;
