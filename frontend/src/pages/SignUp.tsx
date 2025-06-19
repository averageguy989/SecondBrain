import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';
import Error from '../components/error';
import '../styles/auth.css';

export const SignUp = (): JSX.Element => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await signup(name,email,password);
            navigate('/dashboard');
        } catch (error: any) {
            setError(error.response?.data?.error || 'Failed to register');
        }
    }
    
    return (
        <div className="auth-container">
            <h1 className="auth-title">Sign Up</h1>
            <p className="auth-subtitle">Create your account</p>
            
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                        className="form-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
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
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                    />
                </div>

                <button className="auth-button" type="submit">
                    Sign Up
                </button>
            </form>

            <p className="auth-link">
                Already have an account? <Link to="/signin">Sign in</Link>
            </p>
            
            {error && <Error message={error} onClose={() => setError('')} />}
        </div>
    );
};