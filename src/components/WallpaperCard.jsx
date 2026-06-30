import React from 'react';
import { Download, Maximize2 } from 'lucide-react';

const WallpaperCard = ({ wallpaper, onClick }) => {
  // Calculate a random height span to create a more dynamic masonry look
  // since CSS grid masonry needs row-span if we aren't using absolute positioning
  // We'll use a fixed set of spans for predictability
  const getSpan = () => {
    if (wallpaper.width > wallpaper.height * 1.2) return 'span 20'; // landscape
    if (wallpaper.height > wallpaper.width * 1.5) return 'span 35'; // portrait
    return 'span 25'; // somewhat square
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    // In a real app we'd trigger a download, for now open in new tab
    window.open(wallpaper.src.original, '_blank');
  };

  return (
    <div 
      className="wallpaper-card animate-fade-in" 
      style={{ gridRowEnd: getSpan() }}
      onClick={() => onClick(wallpaper)}
    >
      <img 
        src={wallpaper.src.large} 
        alt={wallpaper.alt || 'Wallpaper'} 
        className="wallpaper-image"
        loading="lazy"
      />
      
      <div className="wallpaper-overlay">
        <div className="photographer-info">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold border-2 border-white/20" style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.2)'}}>
            {wallpaper.photographer.charAt(0)}
          </div>
          <span className="name">{wallpaper.photographer}</span>
        </div>
      </div>
      
      <button 
        className="btn-glass btn-icon download-btn"
        onClick={handleDownload}
        title="Download original size"
      >
        <Download size={18} />
      </button>
    </div>
  );
};

export default WallpaperCard;
