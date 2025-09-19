import { Link } from 'react-router-dom';
import Header from './Header';

function SignIn() {
  return (
    <>
      <Header />

      <div className="container-fluid signin-main-container position-relative">
        <div className="row vh-100">
          <div className="col-lg-6 col-md-12 d-flex align-items-center justify-content-center signin-left-section">
            <div style={{ maxWidth: '400px', width: '100%' }}>
              <h1 className="sign-in-title">Sign in</h1>
              <button className="btn btn-lg btn-create-account w-100 mb-3">Create an account</button>
              <div className="signin-divider">or</div>
              <button className="btn btn-lg btn-social w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="40" alt="IMDb" />
                <span>Sign in with IMDb</span>
              </button>
              <button className="btn btn-lg btn-social w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" width="30" alt="Amazon" />
                <span>Sign in with Amazon</span>
              </button>
              <button className="btn btn-lg btn-social w-100 mb-2 d-flex align-items-center justify-content-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width="25" alt="Google" />
                <span>Sign in with Google</span>
              </button>
              <div className="legal-text">
                By signing in, you agree to IMDb's <a href="#">Conditions of Use</a> and <a href="#">Privacy Policy</a>.
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 d-none d-lg-flex align-items-center justify-content-center signin-right-section">
            <div style={{ maxWidth: '450px' }}>
              <h2 className="benefits-title">It's so much better when you sign in</h2>
              <div className="mb-4">
                <h5 style={{ color: '#000' }}>Personalized recommendations</h5>
                <p>Titles tailored to your taste.</p>
              </div>
              <div className="mb-4">
                <h5 style={{ color: '#000' }}>Your Watchlist</h5>
                <p>Track your future views and get reminders.</p>
              </div>
              <div className="mb-4">
                <h5 style={{ color: '#000' }}>Your ratings</h5>
                <p>Rate and remember what you watch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
