import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signout } from '../api/auth';
import ContentCard from '../components/ContentCard';
import CreateContentCard from '../components/CreateContentCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { createContent, getPaginatedContent, DeleteContent } from '../api/content';
import { ContentCardProps } from '../components/ContentCard';
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
  const [content, setContent] = useState<ContentCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTags, setSearchTags] = useState<string[]>([]);
  const [error, setError] = useState('');

  const itemsPerPage = 6; // 2 cards per row, 3 rows

  useEffect(() => {
    loadContent();
  }, [currentPage, searchTags]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const response = await getPaginatedContent(currentPage, itemsPerPage, searchTags);
      setContent(response.content);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (error) {
      setError('Error loading content: ' + error);
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleCreateContentSubmit = async (contentData: Content) => {
    try {
      await createContent(contentData);
      setShowForm(false);
      setSuccess('Content created successfully!');
      loadContent(); // Reload content to show the new item
    } catch (error) {
      setError('Error creating content: ' + error);
      console.error('Error creating content:', error);
    }
  };

  const handleGetContent = async () => {
    navigate('/mycontent');
  };

  const handleSearch = (tags: string[]) => {
    setSearchTags(tags);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteContent = async (id: string) => {
    try {
      await DeleteContent(id);
      setSuccess('Content deleted successfully!');
      loadContent(); // Reload content after deletion
    } catch (error) {
      setError('Error deleting content: ' + error);
      console.error('Error deleting content:', error);
    }
  };

  const handleUpdateContent = (updatedContent: ContentCardProps) => {
    setContent(prevContent => 
      prevContent.map(item => 
        item.id === updatedContent.id ? updatedContent : item
      )
    );
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
        <div className="dashboard-controls">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} placeholder="Search by tags (e.g., react, javascript, tutorial)" />
          </div>
          
          <div className="create-section">
            <button className="header-button primary-button" onClick={handleCreateContent}>
              Create Content
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="error-close">×</button>
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading content...</p>
          </div>
        ) : (
          <>
            <div className="content-stats">
              <p>Showing {content.length} of {totalItems} items</p>
            </div>

            <div className="content-grid">
              {showForm && (
                <div className="create-content-wrapper">
                  <CreateContentCard 
                    onSubmit={handleCreateContentSubmit} 
                    onCancel={() => setShowForm(false)} 
                  />
                </div>
              )}
              
              {content.map((item) => (
                <ContentCard
                  key={item.id}
                  content={item}
                  myContent={false}
                  onDeleteContent={handleDeleteContent}
                  onUpdateContent={handleUpdateContent}
                />
              ))}
            </div>

            {content.length === 0 && !showForm && (
              <div className="empty-state">
                <h3>No content found</h3>
                <p>Try adjusting your search or create new content.</p>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>
      
      {success && <Success message={success} onClose={() => setSuccess('')} />}
    </div>
  );
};

export default Dashboard;