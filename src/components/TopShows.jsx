import ListPage from "./ListPage";

function TopShows() {
  return <ListPage title="Top 250 TV Shows" apiEndpoint="tv/top_rated" mediaType="tv" />;
}

export default TopShows;