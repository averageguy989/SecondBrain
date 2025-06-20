import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api/auth';
import ContentCard from '../components/CreateContentCard';
import { createContent, getContent } from '../api/content';
import Success from '../components/Success';
import '../styles/dashboard.css';

interface Content {
  title: string;
  link: string;
  type: string;
  tags: string[];
  shared: boolean;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSignOut = async () => {
    try {
      await signout();
      setSuccess('Successfully signed out.');
      setTimeout(() => {
        navigate('/signin');
      }, 1000);
    } catch (error) {
      navigate('/signin');
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleCreateContent = () => {
    setShowForm(true);
  };

  const handleCreateContentSubmit = async (content: Content) => {
    try {
      await createContent(content);
      setShowForm(false);
      setSuccess('Card created successfully!');
    } catch (error) {
      console.error('Error creating content:', error);
    }
  };

  const handleGetContent = async () => {
    navigate('/mycontent');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">Second Brain</h1>
        <div className="header-buttons">
          <button className="header-button secondary-button" onClick={handleProfile}>
            Profile
          </button>
          <button className="header-button secondary-button" onClick={handleGetContent}>
            My Content
          </button>
          <button className="header-button secondary-button" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="section-header">
          <h2 className="section-title">Dashboard Content</h2>
          <button className="header-button primary-button" onClick={handleCreateContent}>
            Create Content
          </button>
        </div>

        <div className="content-grid">
          {showForm && (
            <ContentCard 
              onSubmit={handleCreateContentSubmit} 
              onCancel={() => setShowForm(false)} 
            />
          )}
        </div>
      </main>
      
      {success && <Success message={success} onClose={() => setSuccess('')} />}
    </div>
  );
};

export default Dashboard;