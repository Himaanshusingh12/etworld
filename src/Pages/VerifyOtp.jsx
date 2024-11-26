import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

function VeryfyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");

    // Check if entered OTP matches the stored OTP
    if (otp === storedOtp) {
      setMessage("OTP verified successfully.");
      console.log("OTP verified successfully, navigating to forget-password");

      // Redirect to the change-password page
      navigate("/forget-password");
    } else {
      console.log("Failed to verify OTP: OTP does not match");
      setMessage("Error: OTP does not match. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4">Verify OTP</h4>
                <form className="was-validated" onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="text"
                      className="form-control"
                      id="otp"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      name="otp"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "15px" }}
                  >
                    Verify
                  </button>
                </form>
                {message && (
                  <div className="mt-3 alert alert-info">{message}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default VeryfyOtp;
