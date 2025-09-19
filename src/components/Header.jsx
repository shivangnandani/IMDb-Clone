import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentLang, setCurrentLang] = useState('EN');
    const dropdownRef = useRef(null);

    const categories = [
        { value: 'all', label: 'All', icon: 'las la-search' },
        { value: 'titles', label: 'Titles', icon: 'las la-film' },
        { value: 'tv-episodes', label: 'TV Episodes', icon: 'las la-tv' },
        { value: 'celebs', label: 'Celebs', icon: 'las la-user' },
        { value: 'companies', label: 'Companies', icon: 'las la-building' },
    ];

    const languages = [
        { code: 'EN', name: 'English (US)' },
        { code: 'FR', name: 'Français (France)' },
        { code: 'DE', name: 'Deutsch (Deutschland)' },
        { code: 'ES', name: 'Español (España)' },
        { code: 'HI', name: 'हिंदी (भारत)' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="container-fluid px-md-5" id="myNav">
                <nav className="container-fluid navbar d-flex align-items-center">
                    <Link className="navbar-brand" to="/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="80" alt="IMDb Logo" />
                    </Link>
                    <button
                        className="btn btn-dark d-flex align-items-center gap-2"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasTop"
                        aria-controls="offcanvasTop"
                    >
                        <i className="bi bi-list"></i>
                        <span className="fw-bold">Menu</span>
                    </button>
                    <div className="search-container" ref={dropdownRef}>
                        <div className="search-wrapper">
                            <button
                                className={`search-dropdown ${isDropdownOpen ? 'show' : ''}`}
                                type="button"
                                onClick={() => setDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{selectedCategory}</span>
                                <i className={`icon las la-angle-down ${isDropdownOpen ? 'show' : ''}`}></i>
                            </button>
                            {isDropdownOpen && (
                                <div className="search-dropdown-menu">
                                    {categories.map((cat) => (
                                        <a
                                            key={cat.value}
                                            href="#"
                                            className="dropdown-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedCategory(cat.label);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <i className={cat.icon}></i> {cat.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                            <input className="search-input" type="search" placeholder="Search IMDb" aria-label="Search" />
                        </div>
                    </div>

                    <div className="d-flex align-items-center ms-auto right-nav-container">
                        <div className="nav-item pro-tooltip-container" data-tooltip="The essential resource for entertainment professionals">
                            <a className="nav-link fw-bold" href="#">
                                <span className="d-none d-lg-inline">IMDb</span><span style={{ color: '#00a3e0' }}>Pro</span>
                            </a>
                        </div>
                        <span className="separator mx-2 text-muted d-none d-lg-block">|</span>
                        <Link to="/watchlist" className="nav-link d-flex align-items-center">
                            <i className="bi bi-bookmark-plus-fill me-1" style={{ color: 'var(--primary-color)' }}></i>
                            <span className="d-none d-md-inline">Watchlist</span>
                        </Link>
                        <Link to="/signin" className="nav-link">
                            Sign In
                        </Link>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {currentLang}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end lang-dropdown-menu">
                                {languages.map(lang => (
                                    <li key={lang.code}>
                                        <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); setCurrentLang(lang.code); }}>
                                            {lang.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div
                style={{ backgroundColor: 'rgb(29, 29, 29)' }}
                className="offcanvas h-auto offcanvas-top text-light"
                tabIndex="-1"
                id="offcanvasTop"
                aria-labelledby="offcanvasTopLabel"
            >
                <div className="offcanvas-header">
                    <div className="container mt-3 d-flex align-items-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="80" alt="IMDb Logo" />
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            style={{ backgroundColor: '#ffbf00', borderRadius: '50%' }}
                        ></button>
                    </div>
                </div>

                <div className="offcanvas-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <h2><i className="las la-film"></i> Movies</h2>
                                <ul className="list-unstyled">
                                    <li><Link to="/movie/upcoming">Release Calendar</Link></li>
                                    <li><Link to="/movie/top-rated">Top 250 Movies</Link></li>
                                    <li><Link to="/movie/popular">Most Popular Movies</Link></li>
                                    <li><Link to="/movie/now-playing">Top Box Office</Link></li>
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>Browse Movies by Genre</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h2><i className="las la-tv"></i> TV Shows</h2>
                                <ul className="list-unstyled">
                                    <li><Link to="/tv/on-the-air">What's on TV & Streaming</Link></li>
                                    <li><Link to="/tv/top-rated">Top 250 TV Shows</Link></li>
                                    <li><Link to="/tv/popular">Most Popular TV Shows</Link></li>
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>Browse TV Shows by Genre</a></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <h2><i className="las la-trophy"></i> Awards & Events</h2>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>Oscars</a></li>
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>Emmys</a></li>
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>San Diego Comic-Con</a></li>
                                    <li><a href="#" className="text" style={{ pointerEvents: 'none' }}>All Events</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;

