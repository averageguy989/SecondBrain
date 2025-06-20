import React, { useState } from 'react';
import '../styles/content-card.css';
import EditContentCard from './EditContentCard';
import { updateContent } from '../api/content';
import Error from './error';
import Success from './Success';

interface Tag {
    id: string;
    name: string;
}

export interface ContentCardProps {
    id: string;
    title: string;
    link: string;
    type: string;
    tags?: Tag[] | string[];
    shared: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ContentCardPropsFull {
    content: ContentCardProps;
    myContent: boolean;
    onDeleteContent: (id: string) => void;
    onUpdateContent?: (updatedContent: ContentCardProps) => void;
}

const ContentCard: React.FC<ContentCardPropsFull> = ({
    content, 
    myContent, 
    onDeleteContent, 
    onUpdateContent,
}) => {
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDelete = () => {
        onDeleteContent(content.id);
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleCancelEdit = () => {
        setEdit(false);
    }

    const handleSaveEdit = async (updatedContent: any) => {
        try {
            const result = await updateContent(updatedContent);
            if (onUpdateContent) {
                onUpdateContent(result);
            }
            setSuccess('Content updated successfully!');
            setEdit(false);
        } catch (error) {
            setError('Error updating content: ' + error);
            console.error('Error updating content:', error);
        }
    }

    return (
        <div className="content-card-container">
            {edit && (
                <div className="edit-overlay">
                    <EditContentCard
                        content={content}
                        onSave={handleSaveEdit}
                        onCancel={handleCancelEdit}
                    />
                </div>
            )}
            
            <div className="content-card">
                <div className="content-header">
                    <h3 className="content-title">{content.title}</h3>
                    <span className="content-type">{content.type}</span>
                </div>
                
                <a href={content.link} className="content-link" target="_blank" rel="noopener noreferrer">
                    {content.link}
                </a>
                
                <div className="content-tags">
                    {content.tags && content.tags.map((tag, index) => (
                        <span key={typeof tag === 'object' ? tag.id : index} className="content-tag">
                            #{typeof tag === 'object' ? tag.name : tag}
                        </span>
                    ))}
                </div>

                <div className="content-meta">
                    <span className="content-visibility">
                        {content.shared ? (
                            <>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Public
                            </>
                        ) : (
                            <>
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Private
                            </>
                        )}
                    </span>
                    <div className="content-date">
                        Created: {new Date(content.createdAt).toLocaleDateString()}
                    </div>
                </div>

                {myContent && (
                    <div className="content-buttons">
                        <button className="content-button danger" onClick={handleDelete}>
                            Delete
                        </button>
                        <button className="content-button secondary" onClick={handleEdit}>
                            Edit
                        </button>
                    </div>
                )}
            </div>
            {error && <Error message={error} onClose={() => setError('')} />}
            {success && <Success message={success} onClose={() => setSuccess('')} />}
        </div>
    );
};

export default ContentCard;