import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails";

const Landing = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  console.log("Landing is rendering");
  return (
    <>
      <Header />
      <Hero 
        title="AIV" 
        description="My App" 
        buttonText="Confirm" 
        onProductClick={setSelectedProduct}
      />
      <MainContent />
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
