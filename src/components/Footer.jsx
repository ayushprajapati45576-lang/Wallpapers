import React from 'react';
import { Heart, Code, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3>Wallpapers</h3>
          <p>Curated high-resolution images powered by Ayush</p>
        </div>
        
        <div className="footer-links">
          <a href="#" className="footer-link">About</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
        </div>
        
        <div className="footer-socials">
          <a href="#" className="social-icon" title="Source Code"><Code size={20} /></a>
          <a href="#" className="social-icon" title="Website"><Globe size={20} /></a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>Made with <Heart size={14} className="heart-icon" /> for wallpaper enthusiasts. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
