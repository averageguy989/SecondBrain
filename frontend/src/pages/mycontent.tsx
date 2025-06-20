import { useEffect } from 'react';
import { useState } from 'react';
import { getContent, DeleteContent } from '../api/content';
import ContentCard, { ContentCardProps } from '../components/ContentCard';
import { useNavigate } from 'react-router-dom';
import Success from '../components/Success';
import '../styles/mycontent.css';

const MyContent = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState<ContentCardProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchContent = async () => {
            try {
                setLoading(true);
                const content = await getContent();
                setContent(content);
            } catch (error) {
                console.error('Error fetching content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchContent();
    }, []);

    const deleteContent = async (id: string) => {
        try {
            await DeleteContent(id);
            setContent(content.filter((content) => content.id !== id));
            setSuccess('Content deleted successfully!');
        } catch (error) {
            console.error(error);
        }
    }

    const updateContent = (updatedContent: ContentCardProps) => {
        setContent(prevContent => 
            prevContent.map(item => 
                item.id === updatedContent.id ? updatedContent : item
            )
        );
        setSuccess('Content updated successfully!');
    }

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    const handleCreateContent = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="mycontent-container">
                <div className="mycontent-header">
                    <h1 className="mycontent-title">My Content</h1>
                    <button className="back-button" onClick={handleBackToDashboard}>
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </button>
                </div>
                
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Loading your content...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mycontent-container">
            <div className="mycontent-header">
                <h1 className="mycontent-title">My Content</h1>
                <button className="back-button" onClick={handleBackToDashboard}>
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>

            {content.length === 0 ? (
                <div className="empty-state">
                    <svg className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h2 className="empty-state-title">No content yet</h2>
                    <p className="empty-state-message">
                        Start building your second brain by creating your first piece of content.
                    </p>
                </div>
            ) : (
                <div className="content-grid">
                    {content.map((content: ContentCardProps) => (
                        <ContentCard 
                            key={content.id} 
                            content={content} 
                            myContent={true} 
                            onDeleteContent={deleteContent}
                            onUpdateContent={updateContent}
                        />
                    ))}
                </div>
            )}
            
            {success && <Success message={success} onClose={() => setSuccess('')} />}
        </div>
    );
};

export default MyContent;
