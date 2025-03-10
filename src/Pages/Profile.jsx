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
  const [showEtCoin, setShowEtCoin] = useState(false);
  const [showManageSubusers, setShowManageSubusers] = useState(false); // New state for dropdown
  const [activeSubuserSection, setActiveSubuserSection] = useState(null); // New state for subuser sections
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user ID from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const api_token = localStorage.getItem("api_token");
    const userId = user ? user.userid : null;

    if (userId) {
      axios
        .post(
          "https://eyemesto.com/mapp_dev/user_profile.php",
          new URLSearchParams({
            user_profile: true,
            userid: userId,
            api_token: api_token,
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
    setShowManageSubusers(false); // Hide dropdown
    setActiveButton("changePassword");
    setActiveSubuserSection(null); // Reset subuser section
  };

  const handleProfileClick = () => {
    setShowChangePassword(false);
    setShowEditProfile(false);
    setShowManageSubusers(false); // Hide dropdown
    setShowEtCoin(false);
    setActiveButton("profile");
    setActiveSubuserSection(null); // Reset subuser section
  };

  //Function to handle Edit profile button click
  const handleEditProfileClick = () => {
    setShowEditProfile(true);
    setShowChangePassword(false);
    setShowManageSubusers(false); // Hide dropdown
    setActiveButton("editProfile");
    setActiveSubuserSection(null); // Reset subuser section
  };

  // Function to handle Et Coin button click
  const handleEtCoinClick = () => {
    setShowEtCoin(true);
    setShowChangePassword(false);
    setShowEditProfile(false);
    setShowManageSubusers(false); // Hide dropdown
    setActiveButton("etCoin");
    setActiveSubuserSection(null); // Reset subuser section
  };

  // function to handle manage usersection
  const handleManageSubusersClick = () => {
    setShowManageSubusers(!showManageSubusers); // Toggle dropdown visibility
    setShowChangePassword(false);
    setShowEditProfile(false);
    setShowEtCoin(false);
    setActiveButton("manageSubusers");
    setActiveSubuserSection(null); // Reset subuser section
  };

  const handleManageRolesClick = () => {
    setActiveSubuserSection("manageRoles");
    // setShowManageSubusers(false); // Hide dropdown after selection
  };

  const handleCreateNewUsersClick = () => {
    setActiveSubuserSection("createNewUsers");
    // setShowManageSubusers(false); // Hide dropdown after selection
  };

  const handleListOfUsersClick = () => {
    setActiveSubuserSection("listOfUsers");
    // setShowManageSubusers(false); // Hide dropdown after selection
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
    const api_token = localStorage.getItem("api_token");
    const userId = userData ? userData.userid : null;

    if (!userId) {
      setEditMessage("User  not found. Please login again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://eyemesto.com/mapp_dev/update_profile.php",
        new URLSearchParams({
          update_profile: true,
          api_token: api_token,
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
    const api_token = localStorage.getItem("api_token");
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
        "https://eyemesto.com/mapp_dev/change_pass.php",
        new URLSearchParams({
          change_pass: true,
          method: "post",
          api_token: api_token,
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

  // section for create new subuser
  const [subusermessage, setsubuserMessage] = useState("");

  const [formData, setFormData] = useState({
    subuserunique_id: "",
    role: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roles, SetRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.post(
        "https://eyemesto.com/mapp_dev/get_user_roles.php",
        new URLSearchParams({
          get_user_roles: true,
        })
      );
      if (response.status === 200 && response.data.response === "1") {
        SetRoles(response.data.Data || []);
        // console.log("The fetched roles are:", response.data);
      } else {
        setsubuserMessage("Failed to load roles.");
      }
    } catch (error) {
      console.log("Error fetching roles:", error);
      setsubuserMessage("Error loading roles.");
    }
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSelectedRoles((prev) => [...prev, value]);
    } else {
      setSelectedRoles((prev) => prev.filter((role) => role !== value));
    }
  };

  const handleSubmits = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      role: selectedRoles.join(", "),
    };

    setsubuserMessage("");

    // Get unique_id from localStorage
    const storedUser = localStorage.getItem("user");
    const unique_id = storedUser ? JSON.parse(storedUser).unique_id : null;

    // console.log("The current login user unique_id is:", unique_id);

    if (!unique_id) {
      setsubuserMessage("User is not logged in.");
      return;
    }

    // Log the data being submitted, including unique_id
    console.log("Submitting data:", {
      ...updatedFormData,
      unique_id,
    });

    try {
      const response = await axios.post(
        " https://eyemesto.com/mapp_dev/reg_subuser.php",
        new URLSearchParams({
          reg_subuser: true,
          unique_id,
          subuserunique_id: updatedFormData.subuserunique_id,
          role: updatedFormData.role,
        })
      );

      console.log("API Response:", response.data);
      console.log("Raw API Response:", response);

      if (response.data.response === "1") {
        setsubuserMessage("Subuser Registered Successfully !");
        setFormData({
          subuserunique_id: "",
          role: [],
        });
      } else {
        console.log("Error message from API:", response.data.message);
        setsubuserMessage(response.data.message || "Unknown error occurred.");
      }
    } catch (err) {
      console.error("Error during API call:", err);
      setsubuserMessage(
        "An error occurred while creating the user. Please try again."
      );
    }
  };
  // Section for fetch list of users from backend
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      const unique_id = storedUser ? JSON.parse(storedUser).unique_id : null;

      if (!unique_id) {
        console.error("User ID not found in localStorage");
        return;
      }

      const response = await axios.post(
        "https://eyemesto.com/mapp_dev/get_subuser.php",
        new URLSearchParams({
          get_subuser: true,
          user_id: unique_id,
        })
      );

      console.log("The fetched users are:", response.data);
      if (response.status === 200) {
        setUser([response.data]);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setUser([]);
    }
  };

  // section for add new role
  // const [value, setValue] = useState({
  //   role: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

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
                  className={`list-group-item list-group-item-action ${
                    activeButton === "etCoin" ? "active bg-primary" : ""
                  }`}
                  onClick={handleEtCoinClick}
                >
                  Et Coin
                </button>
                <button
                  className={`list-group-item list-group-item-action ${
                    activeButton === "manageSubusers" ? "active bg-primary" : ""
                  }`}
                  onClick={handleManageSubusersClick}
                >
                  Manage Subusers
                </button>
                {showManageSubusers && (
                  <div className="list-group">
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={handleManageRolesClick}
                    >
                      Manage Roles
                    </button>
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={handleCreateNewUsersClick}
                    >
                      Create New Users
                    </button>
                    <button
                      className="list-group-item list-group-item-action"
                      onClick={handleListOfUsersClick}
                    >
                      List of Users
                    </button>
                  </div>
                )}
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
                {/* Conditionally render the heading only for the profile section */}
                {activeButton === "profile" && (
                  <h4 className="card-title text-center mb-4">User Profile</h4>
                )}
                {/* Conditionally render Change Password or other sections */}
                {showChangePassword ? (
                  <div>
                    <h4 className="card-title text-center mb-4">
                      Change Your Password
                    </h4>
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
                ) : showEtCoin ? (
                  <div>
                    <h4 className="card-title text-center mb-4">Et Coin</h4>
                    <div className="mb-3">
                      <p className="text-center">
                        Your current Et Coin balance is: 0
                      </p>
                      {/* Add any additional functionality related to Et Coin here */}
                    </div>
                  </div>
                ) : activeSubuserSection === "manageRoles" ? (
                  <div>
                    {/* <h5>Manage Roles Section</h5> */}
                    <div>
                      <h4 className="card-title text-center mb-4">
                        Add New Role
                      </h4>
                      <form
                        className="was-validated"
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
                            className="form-control"
                            type="text"
                            id="role"
                            placeholder="Enter Role Name"
                            name="role"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ borderRadius: "15px" }}
                        >
                          Create New Role
                        </button>
                      </form>
                      {message && (
                        <div className="mt-3 alert alert-info">{message}</div>
                      )}

                      <hr className="my-4" />
                    </div>
                    {/* Manage Roles Content */}
                  </div>
                ) : activeSubuserSection === "createNewUsers" ? (
                  <div>
                    {/* <h5>Create New Users Section</h5> */}
                    <div>
                      <h4 className="card-title text-center mb-4">
                        Create New User
                      </h4>
                      <form
                        className="was-validated"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0 50px",
                        }}
                        onSubmit={handleSubmits}
                      >
                        <div
                          className="mb-3 mt-3"
                          style={{ position: "relative" }}
                        >
                          <input
                            className="form-control"
                            value={formData.subuserunique_id}
                            onChange={handleInputChange}
                            type="text"
                            id="subuserunique_id"
                            placeholder="Enter Subuser Id"
                            name="subuserunique_id"
                            required
                          />
                        </div>

                        <div class="mb-3" style={{ position: "relative" }}>
                          <div class="dropdown" aria-expanded="false">
                            <input
                              className="form-control"
                              type="text"
                              id="role"
                              placeholder="Select Role(s)"
                              value={selectedRoles.join(",")}
                              readonly
                              data-bs-toggle="dropdown"
                            />
                            <ul
                              className="dropdown-menu p-2"
                              required
                              aria-labelledby="role"
                              style={{
                                position: "absolute",
                                top: "40px",
                                left: "0",
                                right: "0",
                                width: "100%",
                                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                                maxHeight: "200px",
                                overflowY: "auto",
                              }}
                            >
                              {roles.map((role, index) => (
                                <li key={index}>
                                  <label>
                                    <input
                                      type="checkbox"
                                      value={role}
                                      checked={selectedRoles.includes(role)}
                                      onChange={handleRoleChange}
                                    />
                                    {role}
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{ borderRadius: "15px" }}
                        >
                          Create Sub User
                        </button>
                      </form>
                      {subusermessage && (
                        <div className="mt-3 alert alert-info mt-3">
                          {subusermessage}
                        </div>
                      )}

                      <hr className="my-4" />
                    </div>
                  </div>
                ) : activeSubuserSection === "listOfUsers" ? (
                  <div>
                    {/* <h5>List of Users Section</h5> */}
                    <div class="container mt-3">
                      <h2>Manage Sub User</h2>
                      <div className="table-responsive">
                        <table class="table table table-striped">
                          <thead>
                            <tr>
                              <th>User Id</th>
                              <th>Subuser Id</th>
                              <th>Role</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user?.map((item, index) => (
                              <tr key={index}>
                                <td>{item.user_id}</td>
                                <td>{item.subuserunique_id}</td>
                                <td>{item.role}</td>
                                <td>
                                  <button className="btn btn-primary btn-sm">
                                    Edit
                                  </button>
                                  <button className="btn btn-danger btn-sm ms-2">
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            )) ?? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  No users found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* List of Users Content */}
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
