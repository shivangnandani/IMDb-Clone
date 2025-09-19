import ListPage from "./ListPage";

function TopMovies() {
  return <ListPage title="Top 250 Movies" apiEndpoint="movie/top_rated" mediaType="movie" />;
}

export default TopMovies;