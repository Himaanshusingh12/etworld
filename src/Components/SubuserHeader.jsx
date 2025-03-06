import React from "react";
import { Link, NavLink } from "react-router-dom";
// import SubuserSidepanel from "./SubuserSidepanel";

function SubuserHeader() {
  return (
    <>
      {/* <SubuserSidepanel /> */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow border-top border-5 border-primary sticky-top p-0">
        <div className="navbar-brand d-flex align-items-center px-4 px-lg-5">
          <NavLink
            to=""
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
            <div className="d-flex align-items-center">
              <Link
                to="/role"
                className="btn btn-outline-primary me-2"
                style={{ height: "auto", lineHeight: "normal" }}
              >
                Role
              </Link>
              <button
                className="btn btn-outline-primary me-2"
                style={{ height: "auto", lineHeight: "normal" }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SubuserHeader;
