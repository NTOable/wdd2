import { useState } from "react";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import Card from "../components/Card";
import "./AuthPage.css";

const AuthPage = () => {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-page">
      <Card title={mode === "login" ? "Welcome Back" : "Create Account"}>
        <div className="auth-tabs" role="tablist">
          <button
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => setMode("login")}
            aria-selected={mode === "login"}
          >
            Login
          </button>
          <button
            className={mode === "register" ? "tab active" : "tab"}
            onClick={() => setMode("register")}
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
