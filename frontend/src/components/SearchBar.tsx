import React, { useState } from 'react';
import '../styles/search-bar.css';

interface SearchBarProps {
  onSearch: (tags: string[]) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder = "Search by tags..." }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = searchInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    onSearch(tags);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch([]);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={placeholder}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        {searchInput && (
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default SearchBar; 