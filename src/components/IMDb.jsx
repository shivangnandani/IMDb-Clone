import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "./HeroCarousel";
import Header from "./Header";
import Footer from "./Footer";
import "./IMDb.css";

//This is a TMDB Public Key and used only for Educational Purpose 
const API_KEY = "8476a7ab80ad76f0936744df0430e67c";

function IMDb() {
  const [topMovies, setTopMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [trending, setTrending] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [celebs, setCelebs] = useState([]);
  const [loading, setLoading] = useState(true);

  const celebScrollRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const endpoints = {
          topMovies: `movie/top_rated`,
          upcoming: `movie/upcoming`,
          nowPlaying: `movie/now_playing`,
          trending: `trending/movie/day`,
          popularTV: `tv/popular`,
          topRatedTV: `tv/top_rated`,
          celebs: `person/popular`,
        };

        const responses = await Promise.all(
          Object.values(endpoints).map(endpoint =>
            fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`)
              .then(res => res.json())
          )
        );

        setTopMovies(responses[0]?.results || []);
        setUpcoming(responses[1]?.results || []);
        setNowPlaying(responses[2]?.results || []);
        setTrending(responses[3]?.results || []);
        setPopularTV(responses[4]?.results || []);
        setTopRatedTV(responses[5]?.results || []);
        setCelebs(responses[6]?.results || []);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    fetchData();
  }, []);

  const renderCarouselSection = (title, items, id, mediaType = "movie") => {
    if (!items || items.length === 0) return null;

    const chunkedItems = [];
    const itemsToShow = items.slice(0, 20);
    for (let i = 0; i < itemsToShow.length; i += 5) {
      chunkedItems.push(itemsToShow.slice(i, i + 5));
    }

    return (
      <div className="container-fluid movie-scroller">
        <h2 className="section-title">{title}</h2>
        <div id={id} className="carousel slide" data-bs-ride="false">
          <div className="carousel-inner">
            {chunkedItems.map((chunk, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="d-flex justify-content-center">
                  {chunk.map((item) => (
                    <div className="movie-card card" key={item.id}>
                      <Link to={`/details/${mediaType}/${item.id}`}>
                        <img
                          src={item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image"}
                          className="card-img-top"
                          alt={item.title || item.name}
                        />
                      </Link>
                      <div className="card-body">
                        <h5 className="card-title text-light">{item.title || item.name}</h5>
                        <Link to={`/details/${mediaType}/${item.id}`} className="btn" style={{ backgroundColor: 'var(--primary-color)' }}>
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  };

  const handleScroll = (direction) => {
    if (celebScrollRef.current) {
      const scrollAmount = direction === 'left' ? -500 : 500;
      celebScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const renderCelebsSection = (title, items) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="container-fluid movie-scroller celeb-section-container">
        <h2 className="section-title">{title}</h2>
        <div className="celeb-scroll-wrapper">
          <button className="scroll-arrow left" onClick={() => handleScroll('left')}>‹</button>
          <div className="d-flex flex-nowrap gap-4 celeb-list" ref={celebScrollRef}>
            {items.slice(0, 15).map((celeb, index) => (
              <Link key={celeb.id} to={`/details/person/${celeb.id}`} className="celeb-card-link">
                <div className="celeb-card text-center">
                  <div className="celeb-img-container">
                    <img
                      className="celeb-img"
                      src={celeb.profile_path ? `https://image.tmdb.org/t/p/w200${celeb.profile_path}` : "https://via.placeholder.com/200x200?text=No+Image"}
                      alt={celeb.name}
                    />
                  </div>
                  <p className="celeb-rank mt-2 mb-0">{index + 1}</p>
                  <p className="celeb-name">{celeb.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <button className="scroll-arrow right" onClick={() => handleScroll('right')}>›</button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <HeroCarousel />

      {renderCarouselSection("Trending Today", trending, "trendingCarousel", "movie")}
      {renderCarouselSection("Now Playing in Theaters", nowPlaying, "nowPlayingCarousel", "movie")}
      {renderCarouselSection("Upcoming Movies", upcoming, "upcomingCarousel", "movie")}

      {renderCelebsSection("Most Popular Celebrities", celebs)}

      <Footer />
    </>
  );
}

export default IMDb;

