import React from "react";
import Footer from "../Components/Footer";
import LogisticHeader from "../Components/LogisticHeader";
import { NavLink } from "react-router-dom";

function Logistic() {
  return (
    <>
      <LogisticHeader />
      <div className="position-relative vh-100">
        {/* Background Image */}
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark">
          <img
            src="img/logistic6.jpeg"
            alt="Background"
            className="w-100 h-100 object-fit-cover opacity-75"
          />
        </div>

        {/* Content */}
        <div className="position-relative z-1 text-center py-5">
          <h1 className="fw-bold text-white">Where now meets next</h1>

          {/* Menu Options */}
          <div className="d-flex mt-5 justify-content-center align-items-center text-center">
            <div className="d-flex">
              <div className="bg-white text-dark px-5 py-4 rounded shadow-sm">
                <i className="bi bi-calculator fs-2 d-block"></i>
                <span className="fw-bold">RATE</span>
              </div>

              <div className="bg-primary text-white px-5 py-4 rounded shadow-sm">
                <i className="bi bi-box-seam fs-2 d-block"></i>
                <span className="fw-bold">TRACK</span>
              </div>

              <NavLink
                to="/shipping"
                className="text-dark text-decoration-none"
              >
                <div className="bg-white text-dark px-5 py-4 rounded shadow-sm">
                  <i className="bi bi-box fs-2 d-block"></i>
                  <span className="fw-bold">SHIP</span>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Tracking ID Input */}
          <div className="d-flex justify-content-center mt-4">
            <input
              type="text"
              className="form-control w-50 fw-bold py-3"
              placeholder="TRACKING ID"
            />
            <button className="btn btn-primary fw-bold px-4 ms-3 py-3">
              TRACK →
            </button>
          </div>

          {/* Ask FedEx Button */}
          <div className="position-fixed bottom-0 end-0 m-4">
            <button className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
              Ask Et World
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Logistic;
