import './App.css'
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import Inventory from "./pages/Inventory";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
        {/* <Login></Login>*/}
        {/* <Inventory></Inventory>*/}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
