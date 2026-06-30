import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

const ImageModal = ({ wallpaper, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !wallpaper) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <button className="modal-close" onClick={onClose}>
        <X size={24} />
      </button>
      
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={wallpaper.src.large2x || wallpaper.src.large} 
          alt={wallpaper.alt || 'Wallpaper Preview'} 
          className="modal-image"
        />
        
        <div className="modal-actions">
          <button 
            className="btn btn-glass"
            onClick={() => window.open(wallpaper.url, '_blank')}
          >
            <ExternalLink size={18} />
            View on Pexels
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => window.open(wallpaper.src.original, '_blank')}
          >
            <Download size={18} />
            Download Original
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
