import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";
import Card from "../components/Card";
import "./AuthPage.css";

const AuthPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mode, setMode] = useState(searchParams.get("mode") || "login");

  useEffect(() => {
    const currentMode = searchParams.get("mode") || "login";
    setMode(currentMode);
  }, [searchParams]);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setSearchParams({ mode: newMode });
  };

  return (
    <div className="auth-page">
      <Card title={mode === "login" ? "Welcome Back" : "Create Account"}>
        <div className="auth-tabs" role="tablist">
          <button
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => handleModeChange("login")}
            aria-selected={mode === "login"}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "tab active" : "tab"}
            onClick={() => handleModeChange("register")}
            aria-selected={mode === "register"}
          >
            Register
          </button>
        </div>

        <div className="auth-content">
          {mode === "login" ? <LoginComponent /> : <RegisterComponent />}
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
