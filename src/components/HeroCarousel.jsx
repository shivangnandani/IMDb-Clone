import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HeroCarousel.css';

const API_KEY = "4e44d9029b1270a757cddc766a1bcb63";

function HeroCarousel() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCarouselMovies() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
        const data = await res.json();
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results.slice(0, 10)); 
        }
      } catch (err) {
        console.error("Error fetching carousel movies:", err);
      }
    }
    fetchCarouselMovies();
  }, []);

  if (movies.length < 5) {
    return null;
  }

  const featuredMovies = movies.slice(0, 5);

  const getUpNextMovies = () => {
    const upNext = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentIndex + i) % featuredMovies.length;
      upNext.push(featuredMovies[nextIndex]);
    }
    return upNext;
  };
  
  const upNextMovies = getUpNextMovies();

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-lg-8">
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            showArrows={true}
            onChange={(index) => setCurrentIndex(index)}
          >
            {featuredMovies.map((movie) => (
              <div key={movie.id} className="hero-slide-container" onClick={() => navigate(`/details/movie/${movie.id}`)}>
                <img
                  className="hero-backdrop"
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                />
                <div className="hero-overlay"></div>
                <img
                  className="hero-poster"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                />
                <div className="hero-caption">
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-play-circle-fill hero-play-icon"></i>
                    <div>
                      <h2 className="hero-title">{movie.title}</h2>
                      <p className="hero-subtitle">Watch the Trailer</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="col-lg-4 d-none d-lg-block">
          <h3 className="up-next-title">Up next</h3>
          <div className="up-next-list">
            {upNextMovies.map(movie => (
              <div key={`up-next-${movie.id}`} className="up-next-item" onClick={() => navigate(`/details/movie/${movie.id}`)}>
                <img 
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                  alt={movie.title}
                />
                <div className="up-next-info">
                  <i className="bi bi-play-circle-fill up-next-play-icon"></i>
                  <p className="up-next-movie-title">{movie.title}</p>
                  <small>Watch the Trailer</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;

