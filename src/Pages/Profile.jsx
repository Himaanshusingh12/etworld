import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user ID from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userid : null;

    if (userId) {
      // Fetch profile data
      axios
        .post(
          "https://nodesolution.in/etworld/user_profile.php",
          new URLSearchParams({
            user_profile: true,
            userid: userId,
          })
        )
        .then((response) => {
          setProfileData(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the profile data!", error);
        });
    }
  }, []);
  // Handle the toggle for displaying the Change Password form
  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };

  const handleProfileClick = () => {
    setShowChangePassword(false);
  };

  //Logout function with navigate
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData ? userData.userid : null;

    if (!userId) {
      setMessage("User  not found. Please login again.");
      return;
    }

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
          old_password: oldPassword,
          password: password,
          userid: userId,
        })
      );

      if (response.data.response === "1") {
        setMessage("Password updated successfully!");
        navigate("/");
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
      <div className="container mt-5">
        <div className="row gx-3">
          {/* First Section (Navigation) */}
          <div className="col-md-4 d-flex">
            <div className="card shadow h-100 w-100">
              <div className="list-group">
                <button
                  className="list-group-item list-group-item-action active"
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  className="list-group-item list-group-item-action"
                  onClick={handleChangePasswordClick}
                >
                  Change Password
                </button>
                <button
                  className="list-group-item list-group-item-action text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Second Section (Content Area) */}
          <div className="col-md-8 d-flex">
            <div className="card shadow h-100 w-100">
              <div className="card-body">
                <h4 className="card-title text-center mb-4">
                  {showChangePassword ? "Change Your Password" : "User Profile"}
                </h4>

                {/* Conditionally render Profile or Change Password form */}
                {showChangePassword ? (
                  <div>
                    <form className="was-validated" onSubmit={handleSubmit}>
                      <div className="mb-3 mt-3">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "50%",
                            marginLeft: "150px",
                          }}
                          type="password"
                          className="form-control"
                          id="oldPassword"
                          placeholder="Old Password"
                          name="oldPassword"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "50%",
                            marginLeft: "150px",
                          }}
                          type="password"
                          className="form-control"
                          id="newPassword"
                          placeholder="New Password"
                          name="newPassword"
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
                            width: "50%",
                            marginLeft: "150px",
                          }}
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-50"
                        style={{ borderRadius: "15px", marginLeft: "150px" }}
                      >
                        Change Password
                      </button>
                    </form>
                    {message && (
                      <div className="mt-3 alert alert-info">{message}</div>
                    )}

                    <hr className="my-4" />
                  </div>
                ) : (
                  <div className="list-group">
                    {profileData ? (
                      <>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <strong style={{ marginLeft: "80px" }}>
                            Unique ID
                          </strong>
                          <span style={{ marginRight: "80px" }}>
                            {profileData.unique_id}
                          </span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <strong style={{ marginLeft: "80px" }}>
                            First Name
                          </strong>
                          <span style={{ marginRight: "80px" }}>
                            {profileData.first_name}
                          </span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <strong style={{ marginLeft: "80px" }}>
                            Last Name
                          </strong>
                          <span style={{ marginRight: "80px" }}>
                            {profileData.last_name}
                          </span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <strong style={{ marginLeft: "80px" }}>Email</strong>
                          <span style={{ marginRight: "80px" }}>
                            {profileData.email}
                          </span>
                        </div>
                        <div className="list-group-item d-flex justify-content-between align-items-center">
                          <strong style={{ marginLeft: "80px" }}>Phone</strong>
                          <span style={{ marginRight: "80px" }}>
                            {profileData.mobile}
                          </span>
                        </div>
                      </>
                    ) : (
                      <p className="text-center">Loading profile data...</p>
                    )}
                  </div>
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

export default Profile;
