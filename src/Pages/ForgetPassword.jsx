import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData ? userData.userid : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("User not found. Please login again.");
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://nodesolution.in/etworld/change_pass.php",
        new URLSearchParams({
          change_pass: true,
          method: "post",
          password: password,
          userid: userId,
        })
      );

      // Check if the password was successfully changed
      if (response.data.response === "1") {
        setMessage("Password updated successfully!");
        console.log("Password changed successfully. Navigating to login.");

        // Redirect to login page or another relevant page
        navigate("/login");
      } else {
        setMessage("Failed to update password: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error updating password. Please try again later.");
    }
  };
  return (
    <>
      <Navbar />
      {/* new one */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4">
                  Reset Your Password
                </h4>
                <form className="was-validated" onSubmit={handleSubmit}>
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                      }}
                      type="Password"
                      className="form-control"
                      id="ConfirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="ConfirmPassword"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "15px" }}
                  >
                    Reset Password
                  </button>
                </form>
                {message && (
                  <div className="mt-3 alert alert-info">{message}</div>
                )}

                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgetPassword;
