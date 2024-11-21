import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

function Profile() {
  const [profileData, setProfileData] = useState(null);

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
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="card mx-auto shadow-lg" style={{ maxWidth: "500px" }}>
          <div className="card-body">
            <h4 className="card-title text-center mb-4">User Profile</h4>
            {profileData ? (
              <>
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Unique ID:</strong>
                    <span>{profileData.unique_id}</span>
                  </div>

                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>First Name:</strong>
                    <span>{profileData.first_name}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Last Name:</strong>
                    <span>{profileData.last_name}</span>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>Email:</strong>
                    <span>{profileData.email}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center">Loading profile data...</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
