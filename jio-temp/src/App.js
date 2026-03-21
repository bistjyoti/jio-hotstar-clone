import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [backendMovies, setBackendMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 1. Data Fetch karne ke liye useEffect
  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(res => setBackendMovies(res.data))
      .catch(err => console.log("Backend error:", err));
  }, []);

  // 2. Auto-Sliding Banner ka logic
  useEffect(() => {
    if (backendMovies.length > 0 && !searchTerm && activeCategory === "All") {
      const timer = setInterval(() => {
        setCurrentBannerIndex((prevIndex) => 
          (prevIndex + 1) % Math.min(backendMovies.length, 5) // Top 5 movies slide hongi
        );
      }, 5000); 

      return () => clearInterval(timer); 
    }
  }, [backendMovies, searchTerm, activeCategory]);

  // Movies ke saath image paths jodhna
  const moviesWithImages = backendMovies.map(m => ({
    ...m,
    img: `/images/${m.id}.jpg` 
  }));

  // Search ke hisaab se filter
  const filteredData = moviesWithImages.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Unique categories nikalna
  const categories = [...new Set(filteredData.map(m => m.category))];

  return (
    <div className="App" style={{ backgroundColor: '#0f1014', color: 'white', minHeight: '100vh', display: 'flex' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '80px', height: '100vh', position: 'fixed', left: 0, borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', gap: '30px', zIndex: 100, backgroundColor: '#0f1014' }}>
        <img 
          src="https://img.hotstar.com/image/upload/v1656420261/masterbrand/hotstar-logo-white-with-vinyl.png" 
          style={{ width: '45px', cursor: 'pointer' }} 
          onClick={() => setActiveCategory("All")} 
          alt="logo"
        />
        <div title="Home" onClick={() => setActiveCategory("All")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "All" ? 1 : 0.5 }}>🏠</div>
        <div title="TV Shows" onClick={() => setActiveCategory("Web Series")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "Web Series" ? 1 : 0.5 }}>📺</div>
        <div title="Movies" onClick={() => setActiveCategory("Hollywood")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "Hollywood" ? 1 : 0.5 }}>🎬</div>
        <div title="Sports" onClick={() => setActiveCategory("South")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "South" ? 1 : 0.5 }}>⚽</div>
      </div>

      <div style={{ marginLeft: '80px', width: '100%' }}>
        
        {/* HERO BANNER - Ab ye Auto Slide hoga */}
        {!searchTerm && backendMovies.length > 0 && activeCategory === "All" && (
          <div style={{ 
            height: '75vh', 
            backgroundImage: `linear-gradient(to top, #0f1014 10%, transparent 50%), linear-gradient(to right, #0f1014 20%, transparent 60%), url("/images/${backendMovies[currentBannerIndex]?.id}.jpg")`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center top', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            paddingLeft: '60px',
            transition: 'background-image 0.8s ease-in-out' // Smooth transition effect
          }}>
             <h1 style={{ fontSize: '70px', marginBottom: '10px', textShadow: '2px 2px 10px black' }}>
                {backendMovies[currentBannerIndex]?.title}
             </h1>
             <p style={{ fontSize: '18px', color: '#ccc', maxWidth: '500px', marginBottom: '20px' }}>
                Streaming now. Watch {backendMovies[currentBannerIndex]?.title} only on JioHotstar.
             </p>
             <button 
                onClick={() => setSelectedVideo(backendMovies[currentBannerIndex]?.trailer)}
                style={{ width: '180px', padding: '15px', fontWeight: 'bold', backgroundColor: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                ▶ WATCH NOW
             </button>
          </div>
        )}

        {/* SEARCH BAR */}
        <div style={{ padding: searchTerm || activeCategory !== "All" ? '100px 60px 20px' : '40px 60px' }}>
          <input 
            type="text" 
            placeholder="Search movies, genres, etc..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ padding: '12px 20px', width: '350px', borderRadius: '25px', border: '1px solid #444', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} 
          />
        </div>

        {/* DYNAMIC ROWS */}
        <div style={{ minHeight: '400px' }}>
          {categories.length > 0 ? (
            categories
              .filter(cat => activeCategory === "All" || cat === activeCategory)
              .map(cat => {
                const filteredMovies = filteredData.filter(m => m.category === cat);
                if (filteredMovies.length === 0) return null;
                return (
                  <div key={cat} style={{ marginBottom: '40px' }}>
                    <h3 style={{ paddingLeft: '60px', marginBottom: '15px', fontSize: '22px' }}>{cat}</h3>
                    <div className="no-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px 60px' }}>
                      {filteredMovies.map(movie => (
                        <div key={movie.id} style={{ minWidth: '180px' }}>
                          <img 
                            src={movie.img} 
                            alt={movie.title} 
                            onClick={() => setSelectedVideo(movie.trailer)}
                            style={{ width: '180px', height: '260px', borderRadius: '12px', cursor: 'pointer', objectFit: 'cover', transition: '0.3s' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                          />
                          <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#ccc' }}>{movie.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
          ) : (
            searchTerm && <div style={{ padding: '0 60px', color: '#888' }}>No movies found for "{searchTerm}"</div>
          )}
        </div>
      </div>

      {/* TRAILER MODAL */}
      {selectedVideo && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
          <div style={{ position: 'relative', width: '85%', maxWidth: '1000px' }}>
            <button onClick={() => setSelectedVideo(null)} style={{ position: 'absolute', top: '-50px', right: 0, color: 'white', background: 'none', border: '1px solid white', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}>✕</button>
            <iframe width="100%" height="550px" src={selectedVideo} title="trailer" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;