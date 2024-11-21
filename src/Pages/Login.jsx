import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [credintials, setCredentials] = useState({
    unique_id: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credintials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credintials.unique_id || !credintials.password) {
      setError("Please enter both Unique ID and Password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Send API request to login
      const response = await axios.post(
        "https://nodesolution.in/etworld/signin.php",
        new URLSearchParams({
          signin: true,
          unique_id: credintials.unique_id,
          password: credintials.password,
        })
      );

      if (response.data.response === "1") {
        // Successful login
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
      } else if (response.data.response === "0") {
        setError("Invalid Unique ID or password");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Header title="Login" secondtitle="Login" />
      {/* <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4">Log in</h4>
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
                      value={credintials.unique_id}
                      onChange={handleChange}
                      id="unique_id"
                      placeholder="Unique Id"
                      name="unique_id"
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
                      value={credintials.password}
                      onChange={handleChange}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <Link
                        to="/veryfy-email"
                        className="text-end"
                        style={{ textDecoration: "none" }}
                      >
                        Forget Password
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "15px" }}
                  >
                    Login
                  </button>
                </form>
                <hr className="my-4" />
                <div className="text-center">
                  <p className="mb-0">
                    don't have an account? <Link to="/signup">SIGNUP</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container">
        <div
          style={{
            display: "flex",
            height: "80vh",
          }}
          className="mt-5 d-flex align-items-stretch"
        >
          <div className="col-lg-6 col-md-8 p-0">
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                alt="Decorative"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 d-flex align-items-center">
            <div
              className="card shadow w-100"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: "40px 80px",
              }}
            >
              <div className="card-body p-0">
                <h4 className="card-title text-center mb-4">Log in</h4>
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
                      value={credintials.unique_id}
                      onChange={handleChange}
                      id="unique_id"
                      placeholder="Unique Id"
                      name="unique_id"
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
                      type="password"
                      value={credintials.password}
                      onChange={handleChange}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      name="password"
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <div className="d-flex justify-content-between mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms"
                        required
                      />
                      <label className="form-check-label" htmlFor="terms">
                        Remember me
                      </label>
                    </div>
                    <div>
                      <Link
                        to="/veryfy-email"
                        className="text-end"
                        style={{ textDecoration: "none" }}
                      >
                        Forget Password
                      </Link>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{ borderRadius: "15px" }}
                  >
                    Login
                  </button>
                </form>
                <hr className="my-4" />
                <div className="text-center">
                  <p className="mb-0">
                    don't have an account? <Link to="/signup">SIGNUP</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
