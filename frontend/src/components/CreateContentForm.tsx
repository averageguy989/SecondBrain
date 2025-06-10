// frontend/src/components/CreateContentForm.tsx
import React, { useState } from 'react';
import { X, Plus, Hash } from 'lucide-react';

interface CreateContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ContentFormData) => void;
}

export interface ContentFormData {
  title: string;
  link: string;
  contentType: 'youtube' | 'twitter' | 'link' | 'document';
  visibility: 'public' | 'private';
  tags: string[];
}

const CreateContentForm: React.FC<CreateContentFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ContentFormData>({
    title: '',
    link: '',
    contentType: 'link',
    visibility: 'public',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.link.trim()) {
      onSubmit(formData);
      setFormData({
        title: '',
        link: '',
        contentType: 'link',
        visibility: 'public',
        tags: []
      });
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col border border-gray-200">
        {/* Simple Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">Create Content</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-6 h-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simple Form */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                placeholder="Enter content title"
              />
            </div>

            {/* Link Field */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Link *
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                placeholder="https://example.com"
              />
            </div>

            {/* Content Type Field - Simple Dropdown */}
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="contentType"
                name="contentType"
                value={formData.contentType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 bg-white"
              >
                <option value="link">Link</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="document">Document</option>
              </select>
            </div>

            {/* Visibility Field - Simple Dropdown */}
            <div>
              <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
                Visibility
              </label>
              <select
                id="visibility"
                name="visibility"
                value={formData.visibility}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 bg-white"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            {/* Tags Field - Optional */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3" />
                Tags (optional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Add a tag"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
                >
                  Add
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Simple Form Actions */}
            <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateContentForm;