import { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
        name,
      });
      console.log('Sign up successful:', res.data);
      navigate('/signin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  // Responsive styles based on screen size
  const getResponsiveStyles = () => {
    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth > 480 && window.innerWidth <= 768;
    const isDesktop = window.innerWidth > 768;

    return {
      container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: isMobile ? '12px' : isTablet ? '20px' : '24px',
        boxSizing: 'border-box' as const
      },
      card: {
        backgroundColor: 'white',
        padding: isMobile ? '20px' : isTablet ? '32px' : '40px',
        borderRadius: isMobile ? '8px' : '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: isMobile ? '320px' : isTablet ? '450px' : '500px',
        minWidth: isMobile ? '280px' : '300px'
      },
      title: {
        textAlign: 'center' as const,
        marginBottom: isMobile ? '20px' : isTablet ? '28px' : '30px',
        color: '#333',
        fontSize: isMobile ? '20px' : isTablet ? '26px' : '28px',
        fontWeight: '600'
      },
      input: {
        width: '100%',
        padding: isMobile ? '10px 14px' : isTablet ? '14px 18px' : '16px 20px',
        border: '1px solid #ddd',
        borderRadius: isMobile ? '6px' : '8px',
        fontSize: isMobile ? '14px' : '16px',
        boxSizing: 'border-box' as const,
        outline: 'none',
        transition: 'border-color 0.3s ease'
      },
      button: {
        width: '100%',
        padding: isMobile ? '10px 14px' : isTablet ? '14px 18px' : '16px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: isMobile ? '6px' : '8px',
        fontSize: isMobile ? '14px' : '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: isMobile ? '6px' : isTablet ? '10px' : '12px'
      },
      error: {
        color: '#dc3545',
        textAlign: 'center' as const,
        margin: '0',
        fontSize: isMobile ? '12px' : '14px',
        backgroundColor: '#f8d7da',
        padding: isMobile ? '8px' : isTablet ? '12px' : '10px',
        borderRadius: isMobile ? '4px' : '6px',
        border: '1px solid #f5c6cb'
      },
      linkText: {
        textAlign: 'center' as const,
        margin: isMobile ? '12px 0 0 0' : isTablet ? '18px 0 0 0' : '20px 0 0 0',
        color: '#666',
        fontSize: isMobile ? '12px' : '14px'
      }
    };
  };

  const styles = getResponsiveStyles();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          Create Account
        </h2>
        
        <form onSubmit={handleSignUp} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Full Name" 
              required
              style={styles.input}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#007bff'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#ddd'}
            />
          </div>
          
          <div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email Address" 
              required
              style={styles.input}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#007bff'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#ddd'}
            />
          </div>
          
          <div>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required
              style={styles.input}
              onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#007bff'}
              onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = '#ddd'}
            />
          </div>
          
          <button 
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#007bff'}
          >
            Sign Up
          </button>
          
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}
          
          <p style={styles.linkText}>
            Already have an account?{' '}
            <Link 
              to="/signin" 
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

