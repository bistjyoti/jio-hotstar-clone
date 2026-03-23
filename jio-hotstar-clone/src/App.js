import React, { useState, useEffect } from 'react';

const movieData = [
  { id: 1, title: "Loki", category: "Hollywood", trailer: "https://www.youtube.com/embed/pqsEZ0LVPvo" },
  { id: 2, title: "Avengers: Endgame", category: "Hollywood", trailer: "https://www.youtube.com/embed/TcMBFSGVi1c" },
  { id: 3, title: "Deadpool & Wolverine", category: "Hollywood", trailer: "https://www.youtube.com/embed/73_1biulkYk" },
  { id: 4, title: "Brahmastra", category: "Bollywood", trailer: "https://www.youtube.com/embed/V5jVntRVl-0" },
  { id: 5, title: "Stree 2", category: "Bollywood", trailer: "https://www.youtube.com/embed/KVnheGatX40" },
  { id: 6, title: "Chhichhore", category: "Bollywood", trailer: "https://www.youtube.com/embed/tsxemFX0a7k" },
  { id: 7, title: "RRR", category: "South", trailer: "https://www.youtube.com/embed/NgBoMJy386M" },
  { id: 8, title: "Pushpa 2", category: "South", trailer: "https://www.youtube.com/embed/1kVK0mscS_s" },
  { id: 9, title: "Kantara", category: "South", trailer: "https://www.youtube.com/embed/84mDkG5S2G8" },
  { id: 10, title: "Yeh Jawaani Hai Deewani", category: "Romantic", trailer: "https://www.youtube.com/embed/Rbp2XU_jgaM" },
  { id: 11, title: "Sita Ramam", category: "Romantic", trailer: "https://www.youtube.com/embed/3-Y70-j7V84" },
  { id: 12, title: "Aashiqui 2", category: "Romantic", trailer: "https://www.youtube.com/embed/FyXXgpPZ60w" },
  { id: 13, title: "Hera Pheri", category: "Comedy", trailer: "https://www.youtube.com/embed/TIQ5hrfermg" },
  { id: 14, title: "Bhool Bhulaiyaa 3", category: "Comedy", trailer: "https://www.youtube.com/embed/Xp-iXn-K6Zg" },
  { id: 15, title: "Welcome", category: "Comedy", trailer: "https://www.youtube.com/embed/p6_Oa8K8F60" },
  { id: 16, title: "The Conjuring", category: "Horror", trailer: "https://www.youtube.com/embed/k10ETZ41q5o" },
  { id: 17, title: "Tumbbad", category: "Horror", trailer: "https://www.youtube.com/embed/sN7AtREzZ2U" },
  { id: 18, title: "IT", category: "Horror", trailer: "https://www.youtube.com/embed/hAUTdjf9rko" },
  { id: 19, title: "Aarya", category: "Web Series", trailer: "https://www.youtube.com/embed/7Vp8YmK_uI0" },
  { id: 20, title: "Special Ops", category: "Web Series", trailer: "https://www.youtube.com/embed/S7U84N_f2P0" },
  { id: 21, title: "Mirzapur", category: "Web Series", trailer: "https://www.youtube.com/embed/ZNeGF-PvRHY" },
  { id: 22, title: "Squid Game", category: "K-Drama", trailer: "https://www.youtube.com/embed/oqxAJKy0ii4" },
  { id: 23, title: "All of Us Are Dead", category: "K-Drama", trailer: "https://www.youtube.com/embed/IN5TD4vqiaw" },
  { id: 24, title: "The Glory", category: "K-Drama", trailer: "https://www.youtube.com/embed/tqVVV9Y_FvQ" },
  { id: 25, title: "MS Dhoni", category: "Real Life", trailer: "https://www.youtube.com/embed/6L6XqWoS8tw" },
  { id: 26, title: "Our Planet", category: "Documentary", trailer: "https://www.youtube.com/embed/aETNYyrqNYE" },
  { id: 27, title: "12th Fail", category: "Real Life", trailer: "https://www.youtube.com/embed/tMvD_XpG8fQ" },
  { id: 28, title: "Naruto", category: "Anime", trailer: "https://www.youtube.com/embed/-G9BqkgZXRA" },
  { id: 29, title: "Demon Slayer", category: "Anime", trailer: "https://www.youtube.com/embed/VQGCKyvzIM4" },
  { id: 30, title: "Shinchan", category: "Cartoons", trailer: "https://www.youtube.com/embed/o060C38fB_8" }
];

function App() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (!searchTerm && activeCategory === "All") {
      const timer = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % 5);
      }, 5000); 
      return () => clearInterval(timer); 
    }
  }, [searchTerm, activeCategory]);

  const moviesWithImages = movieData.map(m => ({
    ...m,
    img: `/images/${m.id}.jpg`
  }));

  const filteredData = moviesWithImages.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoriesList = [...new Set(movieData.map(m => m.category))].sort();

  return (
    <div className="App" style={{ backgroundColor: '#0f1014', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      
      {/* SIDEBAR */}
      <div style={{ width: '80px', height: '100vh', position: 'fixed', left: 0, borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px', gap: '30px', zIndex: 100, backgroundColor: '#0f1014' }}>
        <img src="https://img.hotstar.com/image/upload/v1656420261/masterbrand/hotstar-logo-white-with-vinyl.png" style={{ width: '45px', cursor: 'pointer' }} onClick={() => setActiveCategory("All")} alt="logo" />
        <div title="Home" onClick={() => setActiveCategory("All")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "All" ? 1 : 0.5, transition: '0.3s' }}>🏠</div>
        <div title="Hollywood" onClick={() => setActiveCategory("Hollywood")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "Hollywood" ? 1 : 0.5, transition: '0.3s' }}>🎬</div>
        <div title="Bollywood" onClick={() => setActiveCategory("Bollywood")} style={{ cursor: 'pointer', fontSize: '22px', opacity: activeCategory === "Bollywood" ? 1 : 0.5, transition: '0.3s' }}>🎥</div>
      </div>

      <div style={{ marginLeft: '80px', width: '100%' }}>
        
        {/* HERO BANNER */}
        {!searchTerm && activeCategory === "All" && (
          <div style={{ 
            height: '75vh', 
            backgroundImage: `linear-gradient(to top, #0f1014 10%, transparent 50%), linear-gradient(to right, #0f1014 20%, transparent 60%), url("/images/${movieData[currentBannerIndex]?.id}.jpg")`, 
            backgroundSize: 'cover', backgroundPosition: 'center top', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: '60px', transition: '1s ease-in-out'
          }}>
             <h1 style={{ fontSize: '60px', marginBottom: '10px', textShadow: '2px 2px 10px black' }}>{movieData[currentBannerIndex]?.title}</h1>
             <p style={{ fontSize: '18px', color: '#ccc', maxWidth: '500px', marginBottom: '20px' }}>Streaming now only on JioHotstar.</p>
             <button onClick={() => setSelectedVideo(movieData[currentBannerIndex]?.trailer)} style={{ width: '180px', padding: '15px', fontWeight: 'bold', backgroundColor: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }}>▶ WATCH NOW</button>
          </div>
        )}

        {/* SEARCH BAR */}
        <div style={{ padding: searchTerm || activeCategory !== "All" ? '100px 60px 20px' : '40px 60px' }}>
          <input type="text" placeholder="Search from 30 movies..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ padding: '12px 20px', width: '350px', borderRadius: '25px', border: '1px solid #444', background: 'rgba(255,255,255,0.1)', color: 'white', outline: 'none' }} />
        </div>

        {/* DYNAMIC ROWS */}
        <div style={{ minHeight: '400px' }}>
          {categoriesList
            .filter(cat => activeCategory === "All" || cat === activeCategory)
            .map(cat => {
              const movies = filteredData.filter(m => m.category === cat);
              if (movies.length === 0) return null;
              return (
                <div key={cat} style={{ marginBottom: '40px' }}>
                  <h3 style={{ paddingLeft: '60px', marginBottom: '15px', fontSize: '22px' }}>{cat}</h3>
                  <div className="no-scrollbar" style={{ display: 'flex', overflowX: 'auto', gap: '20px', padding: '10px 60px' }}>
                    {movies.map(movie => (
                      <div key={movie.id} style={{ minWidth: '180px', transition: '0.3s' }}>
                        <img 
                          src={movie.img} 
                          alt={movie.title} 
                          onClick={() => setSelectedVideo(movie.trailer)} 
                          style={{ 
                            width: '180px', 
                            height: '260px', 
                            borderRadius: '12px', 
                            cursor: 'pointer', 
                            objectFit: 'cover', 
                            transition: 'transform 0.4s ease, box-shadow 0.4s ease' 
                          }} 
                          // HOVER LOGIC START
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0px 10px 25px rgba(0,0,0,0.8)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                          // HOVER LOGIC END
                        />
                        <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#ccc' }}>{movie.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* MODAL */}
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