import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
        <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <img
            src="img/ET logo.png"
            alt="Et World Logo"
            style={{ height: "100%" }}
          />
        </div>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0">
            <NavLink to="/" className="nav-item nav-link active">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-item nav-link">
              About
            </NavLink>
            {/* <NavLink to="/services" className="nav-item nav-link">
              Services
            </NavLink> */}
            <NavLink to="/loan-calculator" className="nav-item nav-link">
              Loan Calculator
            </NavLink>

            {/* Dropdown Menu */}
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to="/logistic" className="dropdown-item">
                    <i className="fas fa-truck mr-2" /> Logistic
                  </NavLink>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="btn btn-outline-primary me-2"
                    style={{ height: "auto", lineHeight: "normal" }}
                  >
                    Profile
                  </Link>
                  <button
                    className="btn btn-outline-primary me-2"
                    style={{ height: "auto", lineHeight: "normal" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-outline-primary me-2"
                    style={{ height: "auto", lineHeight: "normal" }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-outline-primary me-2"
                    style={{ height: "auto", lineHeight: "normal" }}
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

export default Navbar;
