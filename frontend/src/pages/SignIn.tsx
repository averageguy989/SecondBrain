import React, { useState } from "react";
import { signin } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import Error from "../components/error";

export const SignIn = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        try {
            await signin(email,password);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to signin');
        }
    }
    
    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            {error && <Error message={error} onClose={() => setError('')} />}
        </div>
    );
};
