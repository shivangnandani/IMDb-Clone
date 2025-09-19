import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";


//This is a TMDB Public Key and used only for Educational Purpose 
const API_KEY = "8476a7ab80ad76f0936744df0430e67c";

function Details() {
  const { id, media_type } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setDetails(null);
      setLoading(true);
      try {
        let url = "";

        if (media_type === "person") {
          url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&append_to_response=movie_credits,tv_credits`;
        } else {
          url = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&append_to_response=credits,videos`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setDetails(data);

      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    }

    fetchDetails();
  }, [id, media_type]);

  const knownForMovies = details?.movie_credits?.cast
    ? [...details.movie_credits.cast]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 10)
    : [];

  const topCast = details?.credits?.cast ? details.credits.cast.slice(0, 10) : [];

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (!details) {
    return <p>No data found for this item.</p>;
  }

  return (
    <>
      <Header />
      <div className="container details-page-container">
        {(media_type === "movie" || media_type === "tv") && (
          <>
            <div className="row">
              <div className="col-md-4 details-poster">
                <img src={details.poster_path ? `https://image.tmdb.org/t/p/w400${details.poster_path}` : "https://via.placeholder.com/400x600?text=No+Image"} alt={details.title || details.name} className="img-fluid rounded" />
              </div>
              <div className="col-md-8 details-info">
                <h1>{details.title || details.name}</h1>
                <p>⭐ {details.vote_average?.toFixed(1)} / 10 ({details.vote_count} votes)</p>
                <p>{details.overview}</p>
                <p><strong>Release Date:</strong> {details.release_date || details.first_air_date || "N/A"}</p>
                <p><strong>Genres:</strong> {details.genres?.map((g) => g.name).join(", ")}</p>
              </div>
            </div>

            {topCast.length > 0 && (
              <div className="known-for-container mt-5">
                <h2 className="section-title">Top Cast</h2>
                <div className="known-for-scroller">
                  {topCast.map(actor => (
                    <Link to={`/details/person/${actor.id}`} key={actor.id} className="known-for-card actor-card">
                      <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                        alt={actor.name}
                      />
                      <div className="actor-info">
                        <p className="known-for-title actor-name">{actor.name}</p>
                        <p className="actor-character">as {actor.character}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {media_type === "person" && (
          <>
            <div className="row">
              <div className="col-md-4 details-poster">
                <img src={details.profile_path ? `https://image.tmdb.org/t/p/w400${details.profile_path}` : "https://via.placeholder.com/400x600?text=No+Image"} alt={details.name} className="img-fluid rounded" />
              </div>
              <div className="col-md-8 details-info">
                <h1>{details.name}</h1>
                <p><strong>Known For:</strong> {details.known_for_department}</p>
                <p><strong>Birthday:</strong> {details.birthday || "N/A"}</p>
                <p><strong>Place of Birth:</strong> {details.place_of_birth || "N/A"}</p>
                <h4 className="mt-4">Biography</h4>
                <p>{details.biography || "No biography available."}</p>
              </div>
            </div>

            {knownForMovies.length > 0 && (
              <div className="known-for-container mt-5">
                <h2 className="section-title">Known For</h2>
                <div className="known-for-scroller">
                  {knownForMovies.map(movie => (
                    <Link to={`/details/movie/${movie.id}`} key={movie.id} className="known-for-card">
                      <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                        alt={movie.title}
                      />
                      <p className="known-for-title">{movie.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Details;

