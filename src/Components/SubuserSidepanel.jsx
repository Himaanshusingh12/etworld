import React from "react";
import { Link } from "react-router-dom";

function SubuserSidepanel() {
  return (
    <>
      <div
        className="d-flex flex-column bg-primary text-white p-3"
        style={{ width: "230px", height: "90vh" }}
      >
        <div className="mb-2">
          <h4 className="text-center">Subuser Panel</h4>
        </div>
        <div className="nav flex-column">
          <Link
            to="/subuser-dashboard"
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-house-door me-2"></i>Dashboard
          </Link>
          <Link
            to="/shipping-rate"
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-house-door me-2"></i>Shipping Rate
          </Link>
          <Link
            to="/role"
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-person-circle me-2"></i>Role
          </Link>
          <Link
            to="/add-role"
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-person-circle me-2"></i>Add Role
          </Link>
        </div>
      </div>
    </>
  );
}

export default SubuserSidepanel;
