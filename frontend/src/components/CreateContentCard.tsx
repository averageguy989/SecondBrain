import React, { useState } from 'react';
import '../styles/create-content-card.css';

interface ContentCreationProps {
  onSubmit: (content: {
    title: string;
    link: string;
    type: string;
    tags: string[];
    shared: boolean;
  }) => void;
  onCancel: () => void;
}

const CreateContentCard: React.FC<ContentCreationProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [shared, setShared] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      link,
      type,
      tags,
      shared
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="create-card">
      <h3 className="create-card-title">Create Content</h3>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Link</label>
          <input
            className="form-input"
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://www.example.com"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type</label>
          <input
            className="form-input"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Article, Video, Podcast, etc."
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Tags</label>
          <div className="tag-input-container">
            <input
              className="form-input tag-input"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add tag and press Enter"
            />
            <button type="button" className="add-tag-button" onClick={handleAddTag}>
              Add Tag
            </button>
          </div>
          {tags.length > 0 && (
            <div className="tags-container">
              {tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="form-checkbox-group">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={shared}
            onChange={(e) => setShared(e.target.checked)}
            id="shared"
          />
          <label htmlFor="shared" className="form-label">
            Make this content public
          </label>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContentCard;