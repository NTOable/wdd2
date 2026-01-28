import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import "../components/Login.css";

const Login = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState({});
    return (
        <Card title="Welcome Back!">
            <form className="login-form">
                <Input label="Email" type="email" name="email" error={errors.email} placeholder="Enter your email address" required/>
                <Input label="Password" type="password" name="password" error={errors.password} placeholder="Enter your password" required/>
            <Button type="submit" loading={loading}>Login</Button>
            <p className="auth-link">Don't have an account yet? Register here</p>
            </form>
        </Card>
    );
};

export default Login;
