import { useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";

const RegisterComponent = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { register } = useAuth();

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
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            setLoading(false);
            return;
        }
        try {
            const { confirmPassword, ...payload } = formData;
            await register(payload);
            if (onSuccess) onSuccess();
        } catch (error) {
            setErrors({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Register">
            <form className="auth-form" onSubmit={handleSubmit}>
                {errors.error && <div className="alert-error">{errors.error}</div>}
                <Input
                    label="Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Full name"
                    required
                />
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
                    placeholder="Create a password"
                    required
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="Re‑enter password"
                    required
                />
                <Button type="submit" loading={loading}>
                    Register
                </Button>
            </form>
        </Card>
    );
};

export default RegisterComponent;
