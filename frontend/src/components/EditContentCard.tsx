import React, { useState } from 'react';
import '../styles/edit-content-card.css';


interface EditContentCardProps {
  content: {
    id: string;
    title: string;
    link: string;
    type: string;
    tags?: { id: string; name: string }[] | string[];
    shared: boolean;
  };
  onSave: (updatedContent: any) => void;
  onCancel: () => void;
}

const EditContentCard: React.FC<EditContentCardProps> = ({ content, onSave, onCancel }) => {
  const [title, setTitle] = useState(content.title);
  const [link, setLink] = useState(content.link);
  const [type, setType] = useState(content.type);
  const [tags, setTags] = useState<string[]>(
    content.tags 
      ? (Array.isArray(content.tags) 
          ? content.tags.map(tag => typeof tag === 'object' ? tag.name : tag)
          : [])
      : []
  );
  const [shared, setShared] = useState(content.shared);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const updatedContent = {
        id: content.id,
        title,
        link,
        type,
        tags: tags,
        shared
      };
      
      await onSave(updatedContent);
    } catch (error) {
      console.error('Error updating content:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="edit-card">
      <h3 className="edit-card-title">Edit Content</h3>
      <form className="edit-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="save-button" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContentCard; 