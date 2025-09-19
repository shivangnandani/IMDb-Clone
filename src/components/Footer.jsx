function Footer() {
    return (
        <div className="container-fluid footer-section">
            <div className="text-center mb-5">
                <h3>Recently viewed</h3>
                <p className="text fs-5">You have no recently viewed pages</p>
            </div>

            <div className="row g-5">
                <div className="col-lg-6">
                    <div className="footer-box">
                        <h5>Follow IMDb on social</h5>
                        <div className="social-icons">
                            <i className="bi bi-tiktok"></i>
                            <i className="bi bi-instagram"></i>
                            <i className="bi bi-twitter-x"></i>
                            <i className="bi bi-youtube"></i>
                            <i className="bi bi-facebook"></i>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="footer-box">
                        <h5>Get the IMDb App</h5>
                        <p className="text">For Android and iOS</p>
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=imdb.com" alt="QR Code" />
                    </div>
                </div>
            </div>

            <div className="footer-links mt-5">
                <a href="#">Help</a>
                <a href="#">Site Index</a>
                <a href="#">IMDbPro</a>
                <a href="#">Box Office Mojo</a>
                <a href="#">License IMDb Data</a>
                <a href="#">Press Room</a>
                <a href="#">Advertising</a>
                <a href="#">Jobs</a>
                <a href="#">Conditions of Use</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Your Ads Privacy Choices</a>
            </div>

            <div className="footer-bottom">
                an <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" /> company
            </div>
            <div className="copyright">
               &copy; 1990-2025 by IMDb.com, Inc.
            </div>
        </div>
    );
}

export default Footer;
