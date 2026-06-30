import React from 'react';
import { Monitor, Smartphone, Grid } from 'lucide-react';

const CATEGORIES = [
  'Nature', 'Cartoons', 'Gods', 'Abstract', 'Minimal', 'Architecture', 'Space', 'Cars', 'Cyberpunk', 'Animals', 'Art'
];

const FilterBar = ({ currentCategory, onCategoryChange, orientation, onOrientationChange }) => {
  return (
    <div className="filter-bar animate-fade-in">
      <div className="categories">
        <button 
          className={`category-btn ${!currentCategory ? 'active' : ''}`}
          onClick={() => onCategoryChange('')}
        >
          Trending
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`category-btn ${currentCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="orientation-filters">
        <button 
          className={`orientation-btn ${orientation === '' ? 'active' : ''}`}
          onClick={() => onOrientationChange('')}
          title="All Orientations"
        >
          <Grid size={18} />
          <span className="hidden sm:inline">All</span>
        </button>
        <button 
          className={`orientation-btn ${orientation === 'landscape' ? 'active' : ''}`}
          onClick={() => onOrientationChange('landscape')}
          title="Desktop Wallpapers"
        >
          <Monitor size={18} />
          <span className="hidden sm:inline">Desktop</span>
        </button>
        <button 
          className={`orientation-btn ${orientation === 'portrait' ? 'active' : ''}`}
          onClick={() => onOrientationChange('portrait')}
          title="Mobile Wallpapers"
        >
          <Smartphone size={18} />
          <span className="hidden sm:inline">Mobile</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
