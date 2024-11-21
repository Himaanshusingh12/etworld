import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/login");
  };
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
        <a
          href="index.html"
          className="navbar-brand bg-primary d-flex align-items-center px-4 px-lg-5"
        >
          <h2 className="mb-2 text-white">Et World</h2>
        </a>
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
            <NavLink to="/services" className="nav-item nav-link">
              Services
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
                Pages
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to="/profile" className="dropdown-item">
                    <i className="fas fa-user-circle mr-2" /> Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/change-password" className="dropdown-item">
                    <i className="fas fa-key mr-2" /> Change Password
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/loan-calculator" className="dropdown-item">
                    <i className="fas fa-calculator mr-2" /> Loan Calculator
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/terms-condition" className="dropdown-item">
                    <i className="fas fa-file-alt mr-2" /> Terms & Condition
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/privacy-policy" className="dropdown-item">
                    <i className="fas fa-lock mr-2" /> Privacy & Policy
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    to="/login"
                    onClick={handleLogout}
                    className="dropdown-item"
                  >
                    <i className="fas fa-sign-out-alt mr-2" /> Logout
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
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
            </div>
          </div>
        </div>
      </nav>
      {/* Navbar End */}
    </>
  );
}

export default Navbar;
