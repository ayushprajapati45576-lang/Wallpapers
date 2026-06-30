import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import WallpaperCard from './components/WallpaperCard';
import ImageModal from './components/ImageModal';
import Footer from './components/Footer';
import { getCuratedWallpapers, searchWallpapers } from './services/pexels';

function App() {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [orientation, setOrientation] = useState('');
  
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchWallpapers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      const activeQuery = query || category;
      
      if (activeQuery) {
        data = await searchWallpapers(activeQuery, 1, 40, orientation);
      } else {
        // If no query and orientation is set, we still need to search because curated doesn't accept orientation
        if (orientation) {
          data = await searchWallpapers('wallpaper', 1, 40, orientation);
        } else {
          data = await getCuratedWallpapers(1, 40);
        }
      }

      if (data && data.photos) {
        setWallpapers(data.photos);
      } else {
        setError('Failed to load wallpapers from Wallhaven.');
      }
    } catch (err) {
      setError('An error occurred while fetching wallpapers.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, category, orientation]);

  useEffect(() => {
    fetchWallpapers();
  }, [fetchWallpapers]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setCategory(''); // Clear category when performing a manual search
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setQuery(''); // Clear manual search when selecting a category
  };

  const openModal = (wallpaper) => {
    setSelectedWallpaper(wallpaper);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Add a slight delay before removing the wallpaper data so the fade out animation looks smooth
    setTimeout(() => setSelectedWallpaper(null), 300);
  };

  return (
    <div className="app-container">
      <Header onSearch={handleSearch} currentQuery={query} />
      
      <main>
        <FilterBar 
          currentCategory={category}
          onCategoryChange={handleCategoryChange}
          orientation={orientation}
          onOrientationChange={setOrientation}
        />

        {error && (
          <div className="glass p-6 rounded-2xl text-center mb-8 border-red-500/30 text-red-200" style={{ padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fecaca', background: 'rgba(239, 68, 68, 0.1)' }}>
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="masonry-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <div 
                key={i} 
                className="skeleton" 
                style={{ 
                  gridRowEnd: `span ${[20, 25, 30, 35][Math.floor(Math.random() * 4)]}` 
                }}
              />
            ))}
          </div>
        ) : wallpapers.length > 0 ? (
          <div className="masonry-grid">
            {wallpapers.map((wallpaper) => (
              <WallpaperCard 
                key={wallpaper.id} 
                wallpaper={wallpaper} 
                onClick={openModal}
              />
            ))}
          </div>
        ) : (
          !error && (
            <div className="glass p-12 rounded-3xl text-center" style={{ padding: '3rem', borderRadius: '1.5rem', textAlign: 'center' }}>
              <h2 className="text-2xl font-bold mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>No wallpapers found</h2>
              <p className="text-text-secondary" style={{ color: 'var(--text-secondary)' }}>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )
        )}
      </main>

      <Footer />

      <ImageModal 
        wallpaper={selectedWallpaper} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default App;
