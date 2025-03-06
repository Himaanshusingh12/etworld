import React from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";

function PackageDetails() {
  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>
        <div className="container mt-5 p-4 border rounded shadow-sm bg-white">
          <h5 className="fw-bold text-primary">
            <i className="fa fa-check-circle"></i> Package details
          </h5>
          <p className="mt-3">What type of packaging will be used?</p>

          <div className="mb-3">
            <label className="form-label fw-bold">PACKAGING *</label>
            <select className="form-select">
              <option selected>Your Packaging</option>
            </select>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="liabilityCheck"
            />
            <label className="form-check-label" htmlFor="liabilityCheck">
              Purchase a higher limit of liability from FedEx{" "}
              <i className="fa fa-info-circle"></i>
            </label>
          </div>

          <div className="row g-2 align-items-center mb-3">
            <div className="col-md-2">
              <label className="form-label fw-bold">PACKAGES *</label>
              <input type="number" className="form-control" defaultValue="1" />
            </div>
            <div className="col-md-2">
              <label className="form-label fw-bold">WEIGHT *</label>
              <div className="input-group">
                <input type="number" className="form-control" placeholder="0" />
                <select className="form-select">
                  <option>kg</option>
                  <option>lbs</option>
                </select>
              </div>
            </div>
            <div className="col-md-5">
              <label className="form-label fw-bold">
                DIMENSIONS (L × W × H)
              </label>
              <div className="input-group">
                <input type="number" className="form-control" placeholder="L" />
                <span className="input-group-text">×</span>
                <input type="number" className="form-control" placeholder="W" />
                <span className="input-group-text">×</span>
                <input type="number" className="form-control" placeholder="H" />
              </div>
            </div>
            <div className="col-md-2">
              <label className="form-label d-block">&nbsp;</label>
              <select className="form-select">
                <option>cm</option>
                <option>in</option>
              </select>
            </div>
          </div>

          <a href="#" className="text-primary d-block mb-3">
            ADD PACKAGE OPTIONS
          </a>

          <p className="fw-bold">Total packages: 1</p>
          <a href="#" className="text-primary d-block mb-4">
            + ADD PACKAGE
          </a>

          <button className="btn btn-warning w-100 fw-bold">NEXT</button>
          <p className="text-center mt-2 text-muted">to 'Service'</p>
        </div>
      </div>
    </>
  );
}

export default PackageDetails;
