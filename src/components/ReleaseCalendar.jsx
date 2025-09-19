import ListPage from "./ListPage";
function ReleaseCalendar() {
  return <ListPage title="Release Calendar" apiEndpoint="movie/upcoming" mediaType="movie" />;
}
export default ReleaseCalendar;