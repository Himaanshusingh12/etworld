import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import DOMPurify from "dompurify";

function PrivacyPolicy() {
  const [privacy, setPrivacy] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Terms and Conditions from the API
  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        const response = await axios.post(
          "https://eyemesto.com/mapp/privacy_policy.php",
          new URLSearchParams({
            privacy_policy: true,
            method: "post",
          })
        );
        // console.log("API Response:", response);
        // Check if response contains the 'content' field
        if (response.data && response.data.content) {
          setPrivacy(response.data.content);
        } else {
          setPrivacy("No content found");
        }
      } catch (err) {
        setError("Failed to fetch Privacy Policy");
      }
    };

    fetchPrivacyData();
  }, []);
  return (
    <>
      <Navbar />
      <div style={styles.termsContainer}>
        <h1 style={styles.termsTitle}>Privacy and Policy</h1>
        <div style={styles.termsContent}>
          {error ? (
            <p style={styles.error}>{error}</p>
          ) : privacy ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(privacy),
              }}
            />
          ) : (
            <p>No Privacy and Policy available.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// Inline styles
const styles = {
  termsContainer: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  termsTitle: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: "20px",
  },
  termsContent: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#555",
    padding: "0 20px",
    whiteSpace: "pre-line",
  },
  loading: {
    fontSize: "20px",
    textAlign: "center",
    marginTop: "20px",
    color: "#007bff",
  },
  error: {
    fontSize: "20px",
    textAlign: "center",
    marginTop: "20px",
    color: "red",
  },
};

export default PrivacyPolicy;
