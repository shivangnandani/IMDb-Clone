import ListPage from "./ListPage";
function TopBoxOffice() {
  return <ListPage title="Top Box Office" apiEndpoint="movie/now_playing" mediaType="movie" />;
}
export default TopBoxOffice;