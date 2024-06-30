import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="flex-container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/landing">
            Music First
          </Link>
          <div>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/help">
                  Help
                </Link>
              </li>
            </ul>
            <button className="btn btn-primary" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="container pt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h1>Welcome to Music First</h1>
              <p className="lead">Discover your favorite songs and artists.</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <h2>About</h2>
              <p>Learn more about our mission and story.</p>
            </div>
            <div className="col-md-4">
              <h2>Sign Up</h2>
              <p>Create an account to access more features.</p>
            </div>
            <div className="col-md-4">
              <h2>Help</h2>
              <p>Get assistance with using our platform.</p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <h1>Music First</h1>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <span>© 2024 Music First. All rights reserved.</span>
          </div>
          <div className="footer-links mt-3">
            <Link to="#" className="link">
              About
            </Link>
            <Link to="#" className="link">
              Sign Up
            </Link>
            <Link to="#" className="link">
              Help
            </Link>
            <Link to="#" className="link">
              Contact Us
            </Link>
            <Link to="#" className="link">
              Privacy Policy
            </Link>
            <Link to="#" className="link">
              Terms of Service
            </Link>
          </div>
          <div className="footer-social mt-3">
            <span>Follow us on:</span>
            <a href="#" className="link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
