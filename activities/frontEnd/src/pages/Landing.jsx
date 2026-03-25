import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";

const Landing = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleButtonClick = () => {
    navigate("/products");
  };
  
  return (
    <>
      <Header />
      <Hero 
        title="TechTail" 
        description="Let's get Techy!" 
        buttonText="Our Collection" 
        onButtonClick={handleButtonClick}
        onProductClick={setSelectedProduct}
      />
      <MainContent onProductClick={setSelectedProduct} />
      <Footer />
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  );
};

export default Landing;
