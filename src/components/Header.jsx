import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon } from 'lucide-react';

const Header = ({ onSearch, currentQuery }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [localQuery, setLocalQuery] = useState(currentQuery || '');

  // Sync local input when external query state changes (like clicking a category or logo)
  useEffect(() => {
    setLocalQuery(currentQuery || '');
  }, [currentQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Allow empty string to pass through to reset the search
    onSearch(localQuery.trim());
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); onSearch(''); }}>
          <ImageIcon className="text-accent" />
          <span>Wallpapers</span>
        </a>
        
        <div className="search-container">
          <form onSubmit={handleSubmit}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search for high-resolution wallpapers..." 
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
