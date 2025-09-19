import React from 'react';
import { HashRouter, Routes, Route } from "react-router-dom";

import IMDb from "./IMDb";
import Details from "./Details";
import SignIn from "./SignIn";
import Watchlist from './Watchlist';
import TopMovies from './TopMovies';
import TopShows from './TopShows';
import PopularMovies from './PopularMovies';
import PopularShows from './PopularShows';
import ReleaseCalendar from './ReleaseCalendar';
import TopBoxOffice from './TopBoxOffice';
import OnTheAir from './OnTheAirr';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<IMDb />} />
        <Route path="/details/:media_type/:id" element={<Details />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/watchlist" element={<Watchlist />} />

        <Route path="/movie/top-rated" element={<TopMovies />} />
        <Route path="/tv/top-rated" element={<TopShows />} />
        <Route path="/movie/popular" element={<PopularMovies />} />
        <Route path="/tv/popular" element={<PopularShows />} />
        <Route path="/movie/upcoming" element={<ReleaseCalendar />} />
        <Route path="/movie/now-playing" element={<TopBoxOffice />} />
        <Route path="/tv/on-the-air" element={<OnTheAir />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
