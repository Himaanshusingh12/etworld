import React from "react";
import { Link, NavLink } from "react-router-dom";

function LogisticHeader() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
        <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <NavLink
            to="/logistic"
            className="d-flex align-items-center"
            style={{ height: "auto" }}
          >
            <img
              src="img/ET logo.png"
              alt="Et World Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </NavLink>
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
            <NavLink to="/shipping" className="nav-item nav-link active">
              Create a shipment
            </NavLink>
            <NavLink to="/track-consingnment" className="nav-item nav-link">
              Track shipment
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
                Support
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to="" className="dropdown-item">
                    <i className="fas fa-truck mr-2" />
                    Claims
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink to="" className="dropdown-item">
                    <i className="fas fa-route mr-2" />
                    Report Fraud
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </div>

            {/* second dropdown */}
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Account
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink to="" className="dropdown-item">
                    <i className="fas fa-truck mr-2" />
                    View and pay bills
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink to="" className="dropdown-item">
                    <i className="fas fa-route mr-2" />
                    profile
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            </div>

            {/* <div className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarSubuserDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Manage Subuser
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarSubuserDropdown"
                  >
                    <li>
                      <NavLink to="/manage-roles" className="dropdown-item">
                        Manage Roles
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink to="/create-new-user" className="dropdown-item">
                        Create New Users
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink to="/list-of-users" className="dropdown-item">
                        List of Users
                      </NavLink>
                    </li>
                  </ul>
                </div> */}
            <div className="d-flex align-items-center">
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
                >
                  Logout
                </button>
              </>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default LogisticHeader;
