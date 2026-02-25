import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Inventory from "./pages/inventory";
import Landing from "./pages/Landing";
import "./App.css";
import { AuthProvider } from "./contexts/authContext.jsx";


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
      <Inventory></Inventory>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
