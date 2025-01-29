import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaMapMarkerAlt, FaCity } from "react-icons/fa";
import { BsInfoCircle, BsCheckCircle } from "react-icons/bs";

function Shipping() {
  const [formType, setFormType] = useState("Domestic");

  const handleTypeChange = (type) => {
    setFormType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted");
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-4">
          <button
            className={`btn ${
              formType === "Domestic" ? "btn-light" : "btn-dark"
            } me-2`}
            onClick={() => handleTypeChange("Domestic")}
          >
            Domestic
          </button>
          <button
            className={`btn ${
              formType === "International" ? "btn-dark" : "btn-light"
            }`}
            onClick={() => handleTypeChange("International")}
          >
            International
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
          {formType === "International" && (
            <div className="mb-4">
              <label
                htmlFor="destinationCountry"
                className="form-label fw-bold text-secondary"
              >
                Destination Country *
              </label>
              <div className="input-group">
                <span className="input-group-text bg-white">
                  <FaCity className="text-secondary" />
                </span>
                <input
                  type="text"
                  id="destinationCountry"
                  className="form-control"
                  placeholder="Enter Destination Country"
                />
              </div>
            </div>
          )}

          {/* Origin/Shipper Pincode */}
          <div className="mb-4">
            <label
              htmlFor="originPincode"
              className="form-label fw-bold text-secondary"
            >
              Origin / Shipper Pincode *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaMapMarkerAlt className="text-secondary" />
              </span>
              <input
                type="text"
                id="originPincode"
                className="form-control"
                defaultValue="382418"
              />
              <span className="input-group-text text-success fw-bold">
                AHMEDABAD
              </span>
              <span className="input-group-text bg-white text-success">
                <BsCheckCircle />
              </span>
            </div>
          </div>

          {/* Destination/Consignee Pincode */}
          <div className="mb-4">
            <label
              htmlFor="destinationPincode"
              className="form-label fw-bold text-secondary"
            >
              Destination / Consignee Pincode *
            </label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <FaMapMarkerAlt className="text-secondary" />
              </span>
              <input
                type="text"
                id="destinationPincode"
                className="form-control"
                placeholder="Select Destination Pincode"
              />
              <span className="input-group-text bg-white text-info">
                <BsInfoCircle />
              </span>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-dark fw-bold py-2">
              Get Started
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Shipping;
