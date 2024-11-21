import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function Feedback() {
  return (
    <>
      <Navbar />
      <Header title="Feedback" secondtitle="Feedback" />
      {/* <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4">Feedback</h4>
                <form className="was-validated">
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="text"
                      className="form-control"
                      id="unique_id"
                      placeholder="Unique ID"
                      name="unique_id"
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="text"
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                      name="first_name"
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="text"
                      className="form-control"
                      id="last_name"
                      placeholder="Last Name"
                      name="last_name"
                      required
                    />
                  </div>
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email"
                      name="email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="text"
                      className="form-control"
                      id="message"
                      placeholder="Message"
                      name="message"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "15px" }}
                  >
                    Send Feedback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default Feedback;
