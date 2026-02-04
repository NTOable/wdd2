import { useState } from "react";
import Card from "../components/Card";
import Input  from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
import { useAuth } from "../contexts/authContext.jsx";

const Login = () => {
    const [loading, setLoading] = useState();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const {login} = useAuth();

    // e means element
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ... prev,
            [name]: value
        })); // email and password
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // function call to backend
            await login(formData);
            alert('Login Successful!');
        } catch (error) {
            setErrors({message: error.message});
        }
    };
        
    return (
        <Card title="Login Form">
            <form onSubmit={handleSubmit} className="login-form">
                <Input 
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                    required
                />
                <Input 
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Enter your password"
                    required
                />

                <Button type="submit" loading={loading}>
                    Login
                </Button>

                <p className="auth-link">
                    Don't have an account? Register here
                </p>
            </form>
        </Card>
    );
};

export default Login;   