import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

//This is a TMDB Public Key and used only for Educational Purpose 
const API_KEY = "8476a7ab80ad76f0936744df0430e67c";

function MediaCard({ item, mediaType }) {
  const type = mediaType || item.media_type || (item.title ? 'movie' : 'tv');
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card h-100 movie-card">
        <Link to={`/details/${type}/${item.id}`}>
          <img
            src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
            className="card-img-top"
            alt={item.title || item.name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-light">{item.title || item.name}</h5>
          <p className="text">⭐ {item.vote_average?.toFixed(1)} / 10</p>
          <Link to={`/details/${type}/${item.id}`} className="btn" style={{ backgroundColor: 'var(--primary-color)' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

function ListPage({ title, apiEndpoint, mediaType }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        let allResults = [];
        const totalPagesToFetch = 5;

        for (let page = 1; page <= totalPagesToFetch; page++) {
          const res = await fetch(`https://api.themoviedb.org/3/${apiEndpoint}?api_key=${API_KEY}&language=en-US&page=${page}`);
          const data = await res.json();
          if (data.results && Array.isArray(data.results)) {
            allResults = [...allResults, ...data.results];
          }
        }

        const uniqueResults = Array.from(new Map(allResults.map(item => [item.id, item])).values());
        setItems(uniqueResults);
      } catch (err) {
        console.error("Error fetching list:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }
    fetchData();
  }, [apiEndpoint, location.pathname]);

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
      <div className="container my-5">
        <h1 className="section-title mb-4">{title}</h1>
        <div className="row">
          {items.map(item => (
            <MediaCard key={item.id} item={item} mediaType={mediaType} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ListPage;

