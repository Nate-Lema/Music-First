import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import musicService from "../../apis/service/music.service";
import "./LoginPage.css";

const LoginPage = () => {
  const [userForm, setUserForm] = useState({ username: "", password: "" });
  const { username, password } = userForm;
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberMeValue = sessionStorage.getItem("rememberMe") === "true";
    if (rememberMeValue) {
      const storedUsername = sessionStorage.getItem("username") || "";
      setUserForm((prevUserForm) => ({
        ...prevUserForm,
        username: storedUsername,
      }));
    }
    setRememberMe(rememberMeValue);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password)
      return setError("Username and Password are Required!");
    try {
      const response = await musicService.toLogin({ username, password });
      console.log(username, password, response.data.accessToken);
      if (response.status === 200 && response.data.accessToken) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        if (rememberMe) {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("rememberMe", "true");
        } else {
          sessionStorage.removeItem("username");
          sessionStorage.removeItem("rememberMe");
        }
        navigate(`/home`);
      } else {
        setError(response.data.message || "Invalid credentials");
        setUserForm({ username: "", password: "" });
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
      console.error("Error logging in", error);
    }
  };

  return (
    <div className="flex-container">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/music-first">
            Music First
          </Link>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-light">
              <div className="card-header bg-secondary text-white">
                <h1>Login</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {error && <p className="text-danger mb-3">{error}</p>}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUserForm({ ...userForm, username: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) =>
                        setUserForm({ ...userForm, password: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember Me
                    </label>
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-secondary">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <span>© 2024 Music First. All rights reserved.</span>
          </div>
          <div className="footer-links mt-3">
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

export default LoginPage;
