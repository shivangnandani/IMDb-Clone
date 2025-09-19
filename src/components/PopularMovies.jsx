import ListPage from "./ListPage";
function PopularMovies() {
  return <ListPage title="Most Popular Movies" apiEndpoint="movie/popular" mediaType="movie" />;
}
export default PopularMovies;