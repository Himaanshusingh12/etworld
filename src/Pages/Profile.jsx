import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [editMessage, setEditMessage] = useState("");

  const [activeButton, setActiveButton] = useState("profile");
  // State to manage password visibility
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user ID from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.userid : null;

    if (userId) {
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
    setShowEditProfile(false);
    setActiveButton("changePassword");
  };

  const handleProfileClick = () => {
    setShowChangePassword(false);
    setShowEditProfile(false);
    setActiveButton("profile");
  };

  //Function to handle Edit profile button click
  const handleEditProfileClick = () => {
    setShowEditProfile(true);
    setShowChangePassword(false);
    setActiveButton("editProfile");
  };

  //Logout function with navigate
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // edit profile
  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData ? userData.userid : null;

    if (!userId) {
      setEditMessage("User  not found. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://nodesolution.in/etworld/update_profile.php",
        new URLSearchParams({
          update_profile: true,
          userid: userId,
          first_name: profileData.first_name,
          last_name: profileData.last_name,
        })
      );

      if (response.data.response === "1") {
        setEditMessage("Profile updated successfully!");
      } else {
        setEditMessage("Failed to update profile: " + response.data.message);
      }
    } catch (error) {
      setEditMessage("Error updating profile. Please try again later.");
    }
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
        navigate("/home");
      } else {
        setMessage("Failed to update password: " + response.data.message);
      }
    } catch (error) {
      setMessage("Error updating password. Please try again later.");
    }
  };

  // for password hide show
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };
  const togglePasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                <h5 className="list-group-item text-center">Manage Profile</h5>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeButton === "profile" ? "active bg-primary" : ""
                  }`}
                  onClick={handleProfileClick}
                >
                  Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeButton === "editProfile" ? "active bg-primary" : ""
                  }`}
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeButton === "changePassword" ? "active bg-primary" : ""
                  }`}
                  onClick={handleChangePasswordClick}
                >
                  Change Password
                </button>
                <button
                  className={`list-group-item list-group-item-action text-danger ${
                    activeButton === "logout" ? "active bg-primary" : ""
                  }`}
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
                    <form
                      className="was-validated"
                      onSubmit={handleSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 50px",
                      }}
                    >
                      <div
                        className="mb-3 mt-3"
                        style={{ position: "relative" }}
                      >
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type={showOldPassword ? "text" : "password"}
                          className="form-control"
                          id="oldPassword"
                          placeholder="Old Password"
                          name="oldPassword"
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleOldPasswordVisibility}
                          className="btn btn-link"
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "2px",
                            fontSize: "16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {showOldPassword ? (
                            <i className="fas fa-eye"></i>
                          ) : (
                            <i className="fas fa-eye-slash"></i>
                          )}
                        </button>
                      </div>

                      <div className="mb-3" style={{ position: "relative" }}>
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type={showNewPassword ? "text" : "password"}
                          className="form-control"
                          id="newPassword"
                          placeholder="New Password"
                          name="newPassword"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="btn btn-link"
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "2px",
                            fontSize: "16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {showNewPassword ? (
                            <i className="fas fa-eye"></i>
                          ) : (
                            <i className="fas fa-eye-slash"></i>
                          )}
                        </button>
                      </div>

                      <div className="mb-3" style={{ position: "relative" }}>
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type={showConfirmPassword ? "text" : "password"}
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="btn btn-link"
                          style={{
                            position: "absolute",
                            right: "20px",
                            top: "2px",
                            fontSize: "16px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          {showConfirmPassword ? (
                            <i className="fas fa-eye"></i>
                          ) : (
                            <i className="fas fa-eye-slash"></i>
                          )}
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ borderRadius: "15px" }}
                      >
                        Change Password
                      </button>
                    </form>
                    {message && (
                      <div className="mt-3 alert alert-info">{message}</div>
                    )}

                    <hr className="my-4" />
                  </div>
                ) : showEditProfile ? (
                  <div>
                    <form
                      onSubmit={handleEditProfileSubmit}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0 50px",
                      }}
                    >
                      <div>
                        <h5>
                          Unique ID:{" "}
                          {profileData ? profileData.unique_id : "N/A"}
                        </h5>
                      </div>

                      <div className="mb-2">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          value={profileData ? profileData.first_name : ""}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              first_name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          value={profileData ? profileData.last_name : ""}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              last_name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          value={profileData ? profileData.email : ""}
                          readOnly
                        />
                      </div>

                      {/* Phone - Read Only */}
                      <div className="mb-3">
                        <input
                          style={{
                            border: "none",
                            borderBottom: "1px solid black",
                            textDecoration: "none",
                            width: "100%",
                          }}
                          type="text"
                          className="form-control"
                          placeholder="Phone"
                          value={profileData ? profileData.mobile : ""}
                          readOnly
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-40"
                        style={{ borderRadius: "15px" }}
                      >
                        Save Changes
                      </button>
                    </form>
                    {editMessage && (
                      <div className="mt-3 alert alert-info">{editMessage}</div>
                    )}
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
