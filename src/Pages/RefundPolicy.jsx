import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import DOMPurify from "dompurify";

function RefundPolicy() {
  const [refund, setRefund] = useState(null);
  const [error, setError] = useState(null);

  // Fetch Terms and Conditions from the API
  useEffect(() => {
    const fetchRefundData = async () => {
      try {
        console.log("Sending request to the API...");
        const response = await axios.post(
          "https://eyemesto.com/mapp/refund_policy.php",
          new URLSearchParams({
            refund_policy: true,
            method: "post",
          })
        );
        // Check if the response contains the 'content' field
        if (response.data && response.data.content) {
          console.log("Refund Policy Content:", response.data.content); // Log the actual content
          setRefund(response.data.content);
        } else {
          console.log("No content found in the response.");
          setRefund("No content found");
        }
      } catch (err) {
        console.error("API Error:", err); // Log any errors during the request
        setError("Failed to fetch Refund Policy");
      }
    };

    fetchRefundData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={styles.refundContainer}>
        <h1 style={styles.refundTitle}>Refund Policy</h1>
        <div style={styles.refundContent}>
          {error ? (
            <p style={styles.error}>{error}</p>
          ) : refund ? (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(refund), // Sanitize and set HTML
              }}
            />
          ) : (
            <p>No Refund Policy available.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// Inline styles
const styles = {
  refundContainer: {
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  refundTitle: {
    textAlign: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#ff6347",
    marginBottom: "20px",
  },
  refundContent: {
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

export default RefundPolicy;
