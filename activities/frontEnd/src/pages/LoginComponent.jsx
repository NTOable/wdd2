import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const LoginComponent = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            await login(formData);
            if (onSuccess) onSuccess();
        } catch (error) {
            setErrors({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Login">
            <form className="auth-form" onSubmit={handleSubmit}>
                {errors.error && <div className="alert-error">{errors.error}</div>}
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
            </form>
        </Card>
    );
};

export default LoginComponent;
