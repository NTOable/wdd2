import React from "react";
import Button from "./Button";

export default function Header() {
  return (

    <>
    <header>

         <div className="header-container"> 
            <div className="logo">   
                <h2>AIV's Website</h2>
            </div>
            <nav className="navigation">
                <a href="/">Home</a>
                <a href="/login">Login</a>
                <a href="/inventory">Inventory</a>
            </nav>
            <div className="auth-section">

                   <Button type="button">Login</Button>
            </div>
            </div> 
        
        </header>  
   
    </>
  );
}