import React, { useState } from 'react';

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

const ContentCard: React.FC<ContentCreationProps> = ({ onSubmit, onCancel }) => {
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

  return (
    <div>
      <h3>Create Content</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>

        <div>
          <label>Link:</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder='https://www.google.com'
            required
          />
        </div>

        <div>
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            placeholder='Article, Video, Podcast, etc.'
          />
        </div>

        <div>
          <label>Tags:</label>
          <div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Add tag"
            />
            <button type="button" onClick={handleAddTag}>Add Tag</button>
          </div>
          <div>
            {tags.map(tag => (
              <span key={tag}>
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={shared}
              onChange={(e) => setShared(e.target.checked)}
            />
            Shared
          </label>
        </div>

        <div>
          <button type="submit">Create Content</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ContentCard;
