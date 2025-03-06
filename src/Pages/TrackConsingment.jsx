import React from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";

function TrackConsingment() {
  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>
        <div className="container-fluid   mt-5 text-center">
          <h2>Track Consignment</h2>
          <p>Enter your AWB number below to track your consignment.</p>
          <form className="text-center">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter AWB Number"
                required
                style={{
                  borderRadius: "50px",
                  margin: "auto",
                  width: "auto",
                  padding: "5px 40px",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: "50px", padding: "5px 80px" }}
            >
              Track
            </button>
          </form>
          <div className="mt-3 alert alert-info" style={{ display: "none" }}>
            {/* for displayed message */}
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackConsingment;
