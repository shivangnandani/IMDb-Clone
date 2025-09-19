import ListPage from "./ListPage";
function PopularShows() {
  return <ListPage title="Most Popular TV Shows" apiEndpoint="tv/popular" mediaType="tv" />;
}
export default PopularShows;