// We are now using the Wallhaven API!
const BASE_URL = '/api/wallhaven';

const fetchFromWallhaven = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Wallhaven API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Map Wallhaven data structure to match what our UI expects (which was originally designed for Pexels)
    if (data && data.data) {
      const mappedPhotos = data.data.map(wall => ({
        id: wall.id,
        width: wall.dimension_x,
        height: wall.dimension_y,
        url: wall.url,
        photographer: `Wallhaven User`, // Wallhaven doesn't return uploader in basic search
        src: {
          original: wall.path, // Full high-res image
          large2x: wall.path,
          large: wall.thumbs.large || wall.thumbs.original // Thumbnail for the grid
        },
        alt: `Wallpaper ${wall.id}`
      }));
      
      return { photos: mappedPhotos };
    }
    
    return { photos: [] };
  } catch (error) {
    console.error("Error fetching from Wallhaven:", error);
    return null;
  }
};

export const getCuratedWallpapers = async (page = 1, perPage = 24) => {
  // Wallhaven doesn't have a "curated" endpoint per se, but searching for top/latest is good
  const data = await fetchFromWallhaven(`/search?sorting=toplist&page=${page}`);
  return data;
};

export const searchWallpapers = async (query, page = 1, perPage = 24, orientation = '') => {
  let url = `/search?page=${page}`;
  
  if (query && query !== 'trending' && query !== 'wallpaper') {
    url += `&q=${encodeURIComponent(query)}`;
  } else {
    // If empty query, just return top list
    url += `&sorting=toplist`;
  }
  
  // Wallhaven orientation filter (ratios)
  if (orientation === 'landscape') {
    url += `&ratios=16x9,16x10,21x9`;
  } else if (orientation === 'portrait') {
    url += `&ratios=9x16,10x16`;
  }

  const data = await fetchFromWallhaven(url);
  return data;
};
