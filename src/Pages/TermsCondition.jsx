import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import axios from "axios";
import DOMPurify from "dompurify";
function TermsCondition() {
  const [termsData, setTermsData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Terms and Conditions from the API
  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        const response = await axios.post(
          "https://eyemesto.com/mapp/terms_conditions.php",
          new URLSearchParams({
            terms_conditions: true,
            method: "post",
          })
        );
        // Check if response contains the 'content' field
        if (response.data && response.data.content) {
          setTermsData(response.data.content); // Set the content from the API
        } else {
          setTermsData("No content found");
        }
      } catch (err) {
        setError("Failed to fetch terms and conditions");
      }
    };

    fetchTermsData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div style={styles.termsContainer}>
        <h1 style={styles.termsTitle}>Terms & Condition</h1>
        <div style={styles.termsContent}>
          {error ? (
            <p style={styles.error}>{error}</p>
          ) : termsData ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(termsData),
              }}
            />
          ) : (
            <p>No Terms & Condition Available .</p>
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

export default TermsCondition;
