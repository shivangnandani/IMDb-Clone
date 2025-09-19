import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Watchlist.css';

function Watchlist() {
  return (
    <>
      <Header />
      <div className="watchlist-section">
        <div className="topbar">
          <h3>What to watch</h3>
          <a href="#" className="recommend-link">Get more recommendations &gt;</a>
        </div>

        <a href="#" className="watchlist-link">From your Watchlist &gt;</a>

        <div className="watchlist-box text-center">
          <div className="bookmark-icon">
            <span>+</span>
          </div>
          <h5 className="fw-bold">Your Watchlist is empty</h5>
          <p className="subtext">Save shows and movies to keep track of what you want to watch.</p>

          <Link to="/movie/popular" className="browse-btn-link">
            <button className="browse-btn">
              Browse popular movies
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Watchlist;

