import { useState, useEffect, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsLoggedIn(false)
    console.log('logged out')
    navigate('/')
  }
  return (
    <>
      {/* Topbar */}
      <div className="container-fluid bg-primary text-white d-none d-lg-flex">
        <div className="container py-3">
          <div className="d-flex align-items-center">
            <Link
              to="/"
              className="text-white fw-bold m-0 text-decoration-none"
            >
              <h2>WELDORK</h2>
            </Link>
            <div className="ms-auto d-flex align-items-center">
              <small className="ms-4">
                <i className="fa fa-map-marker-alt me-3"></i>123 Street, New
                York, USA
              </small>
              <small className="ms-4">
                <i className="fa fa-envelope me-3"></i>info@example.com
              </small>
              <small className="ms-4">
                <i className="fa fa-phone-alt me-3"></i>+012 345 67890
              </small>
              <div className="ms-3 d-flex">
                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="#"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="#"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  className="btn btn-sm-square btn-light text-primary ms-2"
                  href="#"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className={`container-fluid bg-white sticky-top 'shadow-sm' : ''}`}>
        <div className="container">
          <nav className="navbar navbar-expand-lg bg-white navbar-light p-lg-0">
            <Link to="/" className="navbar-brand d-lg-none">
              <h1 className="fw-bold m-0">WELDORK</h1>
            </Link>
            <button
              className="navbar-toggler me-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Home
                </Link>
                <Link to="/about" className="nav-item nav-link">
                  About
                </Link>
                <Link to="/services" className="nav-item nav-link">
                  Services
                </Link>
                <div className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    Pages
                  </span>
                  <div className="dropdown-menu bg-light rounded-0 rounded-bottom m-0">
                    <Link to="/team" className="dropdown-item">
                      Our Team
                    </Link>
                    <Link to="/testimonials" className="dropdown-item">
                      Testimonials
                    </Link>
                    <Link to="/Appoinment" className="dropdown-item">
                      Appointment
                    </Link>
                  </div>
                </div>
                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>
                {isLoggedIn ? (
                  <button className="nav-iten nav-link" onClick={handleLogout}>logout</button>
                ) : (
                  <>
                    <Link to="/register" className="nav-item nav-link">
                      Register
                    </Link>
                    <Link to="/login" className="nav-iten nav-link">
                      Login
                    </Link>
                  </>
                )}
              </div>
              <div className="ms-auto d-none d-lg-block">
                <Link to="/quote" className="btn btn-primary py-2 px-3">
                  Get A Quote
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
