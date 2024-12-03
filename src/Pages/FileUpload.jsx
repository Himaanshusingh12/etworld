import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import "@cyntler/react-doc-viewer/dist/index.css";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // Handle file drop
  const onDrop = (acceptedFiles, rejectedFiles) => {
    // Check for errors
    const rejectedFile = rejectedFiles[0];
    if (rejectedFile) {
      setError(
        "Invalid file type. Only PDF, DOCX, PNG,JPG, and PPTX files are allowed."
      );
      setFiles([]);
    } else {
      setError("");
      setFiles(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf,.docx,.png,.jpg,.pptx",
    multiple: false, // Set to true if you want to allow multiple file uploads
  });

  // Simulate file upload (this is where the actual upload would happen)
  const handleUpload = () => {
    if (files.length > 0) {
      setUploading(true);
      setUploadStatus("Uploading...");

      // Simulate a file upload process with setTimeout
      setTimeout(() => {
        setUploading(false);
        setUploadStatus("File uploaded successfully!");
      }, 2000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h3 className="text-center mb-4">Upload Your Document</h3>
        <div
          {...getRootProps()}
          className="border border-primary rounded p-5 text-center"
          style={styles.dropzone}
        >
          <input {...getInputProps()} />
          <p className="h5 text-muted">
            Drag & drop your file here, or click to select files
          </p>
          <i
            className="bi bi-cloud-upload mb-3"
            style={{ fontSize: "40px" }}
          ></i>
          <p className="text-muted">
            Supported formats: PDF, DOCX, PNG, JPG,PPTX
          </p>
        </div>

        {/* File details display */}
        {files.length > 0 && (
          <div className="mt-4">
            <h5>File Selected:</h5>
            <p>
              <strong>{files[0].name}</strong>
            </p>

            {/* Display Image Preview for PNG/JPG */}
            {files[0].type.startsWith("image") && (
              <div className="mb-3">
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Preview"
                  className="img-fluid"
                  style={{ maxWidth: "100%", maxHeight: "300px" }}
                />
              </div>
            )}

            {/* Display Document Viewer for PDF and DOCX */}
            {(files[0].type === "application/pdf" ||
              files[0].type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              files[0].type ===
                "application/vnd.openxmlformats-officedocument.presentationml.presentation") && (
              <DocViewer
                documents={[{ uri: URL.createObjectURL(files[0]) }]}
                pluginRenderers={DocViewerRenderers}
                onError={(error) => {
                  console.error("Error loading document:", error);
                  setError("Failed to load the document. Please try again.");
                }}
              />
            )}

            {/* Provide PDF or DOCX download link */}
            {files[0].type === "application/pdf" && (
              <a
                href={URL.createObjectURL(files[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                View PDF Document
              </a>
            )}

            {files[0].type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
              <a
                href={URL.createObjectURL(files[0])}
                download={files[0].name}
                className="btn btn-outline-success mt-2"
              >
                Download DOCX Document
              </a>
            )}

            {files[0].type ===
              "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
              <a
                href={URL.createObjectURL(files[0])}
                download={files[0].name}
                className="btn btn-outline-info mt-2"
              >
                Download PPTX Document
              </a>
            )}
          </div>
        )}

        {/* Error handling */}
        {error && <p className="text-danger mt-3">{error}</p>}

        {/* Upload Button */}
        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn btn-primary btn-lg"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {/* Upload Status */}
        {uploadStatus && <p className="text-center mt-3">{uploadStatus}</p>}
      </div>
      <Footer />
    </>
  );
};
// Custom styles (optional)
const styles = {
  dropzone: {
    cursor: "pointer",
  },
};
export default FileUpload;
