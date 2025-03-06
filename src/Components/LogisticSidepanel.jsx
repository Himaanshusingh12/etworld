import React from "react";
import { NavLink } from "react-router-dom";

function LogisticSidepanel() {
  return (
    <>
      <div
        className="d-flex flex-column bg-primary text-white p-3"
        style={{ width: "230px", height: "100%" }}
      >
        <div className="mb-2 ms-3">
          <h4 className="text-white">Logistic</h4>
        </div>
        <div className="nav flex-column">
          <NavLink
            to="/shipping"
            // className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
            className="nav-link text-white p-2 mb-2 rounded text-nowrap d-inline-block"
          >
            <i className="bi bi-box me-2"></i>Create Shipment
          </NavLink>
          {/* <NavLink
            to=""
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-house-door me-2"></i>Shipping Rate
          </NavLink> */}
          {/* <NavLink
            to=""
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-person-circle me-2"></i>Role
          </NavLink> */}
          {/* <NavLink
            to=""
            className="nav-link text-white p-2 mb-2 rounded hover-bg-secondary"
          >
            <i className="bi bi-person-circle me-2"></i>Add Role
          </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default LogisticSidepanel;
