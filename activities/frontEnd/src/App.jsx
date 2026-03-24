import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AuthPage from "./pages/AuthPage";
import Inventory from "./pages/Inventory";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  console.log("App is rendering");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth?mode=register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// import './App.css'
// import Landing from "./pages/Landing";
// import AuthPage from "./pages/AuthPage";
// import Inventory from "./pages/Inventory";
// import { AuthProvider } from "./contexts/AuthContext";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {

//   return (
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/" element={<Landing />} />
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/inventory" element={<Inventory />} />
//         </Routes>
//         {/* <Login></Login>*/}
//         {/* <Inventory></Inventory>*/}
//       </AuthProvider>
//     </BrowserRouter>
//   );
// }

// export default App
