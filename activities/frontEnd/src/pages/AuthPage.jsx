import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import "./AuthPage.css";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialMode = params.get("mode") === "register" ? "register" : "login";
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = (newMode) => {
    navigate(`/auth?mode=${newMode}`);
  };

  const handleSuccess = () => {
    navigate("/inventory");
  };

  return (
    <div className="auth-page">
      <div className="tabs">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => switchMode("login")}
        >
          Login
        </button>
        <button
          className={mode === "register" ? "active" : ""}
          onClick={() => switchMode("register")}
        >
          Register
        </button>
      </div>
      <div className="tab-content">
        {mode === "login" ? (
          <LoginComponent onSuccess={handleSuccess} />
        ) : (
          <RegisterComponent onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
