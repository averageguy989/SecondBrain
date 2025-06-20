import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Error from "../components/error";
import { signin } from "../api/auth";
import '../styles/auth.css';
import Success from "../components/Success";


const SignIn = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await signin(email, password);
            setSuccess('Welcome back! Successfully signed in.');
            setTimeout(() => {
                navigate('/dashboard');
            }, 60000);
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to signin');
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="auth-container">
            <h1 className="auth-title">Sign In</h1>
            <p className="auth-subtitle">Welcome back to your second brain</p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        disabled={loading}
                        required
                    />
                </div>

                <button className="auth-button" type="submit" disabled={loading}>
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>
            </form>

            <p className="auth-link">
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
            
            {error && <Error message={error} onClose={() => setError('')} />}
            {success && <Success message={success} onClose={() => setSuccess('')} />}
        </div>
    );
};

export default SignIn;
