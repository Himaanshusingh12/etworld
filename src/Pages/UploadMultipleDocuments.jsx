import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";
import { Country } from "country-state-city";

const UploadMultipleDocuments = () => {
  const [formData, setFormData] = useState({
    files: [],
    workflowName: "",
    originCountry: "",
    shipDocumentType: "",
    destinationCountry: "",
  });

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(
      (file) => file.type === "application/pdf"
    );

    if (selectedFiles.length > 5) {
      alert("Maximum 5 files allowed");
      setFormData({
        ...formData,
        files: validFiles.slice(0, 5),
      });
    } else {
      setFormData({
        ...formData,
        files: validFiles,
      });
    }
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.files.length < 0) {
      tempErrors.files = "Please upload a file";
    }
    if (!formData.fileName) {
      tempErrors.fileName = "File name is required";
    }
    if (!formData.workflowName) {
      tempErrors.workflowName = "ETD Shipment is required";
    }
    if (!formData.shipDocumentType) {
      tempErrors.shipDocumentType = "Please select a document type";
    }
    if (!formData.originCountry) {
      tempErrors.originCountry = "Please select an origin country";
    }
    if (!formData.destinationCountry) {
      tempErrors.destinationCountry = "Please select a destination country";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const data = new FormData();

      formData.files.forEach((file, index) => {
        data.append("files", file);
      });

      data.append("workflowName", formData.workflowName);
      data.append("shipDocumentType", formData.shipDocumentType);
      data.append("originCountryCode", formData.originCountry);
      data.append("destinationCountryCode", formData.destinationCountry);

      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/fedex/upload/multiple`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFormData({
        files: [],
        workflowName: "",
        originCountry: "",
        shipDocumentType: "",
        destinationCountry: "",
      });
      console.log(res);
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    }
  };

  const handleSelectChange = (fieldName) => (selectedOption) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption ? selectedOption.value : "",
    });
  };

  const shimentOption = [
    { value: "CERTIFICATE_OF_ORIGIN", label: "Certificate of Origin" },
    { value: "COMMERCIAL_INVOICE", label: "Commercial Invoice" },
    { value: "ETD_LABEL", label: "ETD Label" },
    {
      value: "USMCA_CERTIFICATION_OF_ORIGIN",
      label: "USMCA Certification of Origin",
    },
    {
      value: "USMCA_COMMERCIAL_INVOICE_CERTIFICATION_OF_ORIGIN",
      label: "USMCA Commercial Invoice and Certification of Origin",
    },
    { value: "PRO_FORMA_INVOICE", label: "Pro Forma Invoice" },
    { value: "OTHER", label: "Other" },
  ];

  console.log(formData);

  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-8 ps-5">
              <form onSubmit={handleSubmit}>
                <h5 className="fw-bold text-primary">
                  <i className="fa fa-user-circle"></i> Upload Documents
                </h5>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    name="files"
                    multiple
                    onChange={handleFileChange}
                  />
                  {errors.files && (
                    <div className="text-danger">{errors.files}</div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ETD Shipment"
                    value={formData.workflowName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workflowName: e.target.value,
                      })
                    }
                  />
                  {errors.workflowName && (
                    <div className="text-danger">{errors.workflowName}</div>
                  )}
                </div>
                <div className="mb-2">
                  <Select
                    options={shimentOption}
                    placeholder="Shipment Document Type"
                    value={shimentOption.find(
                      (option) => option.value === formData.shipDocumentType
                    )}
                    onChange={handleSelectChange("shipDocumentType")}
                  />
                  {errors.shipDocumentType && (
                    <div className="text-danger">{errors.shipDocumentType}</div>
                  )}
                </div>
                <div className="mb-2">
                  <Select
                    options={countryOptions}
                    placeholder="Origin Country Code"
                    value={countryOptions.find(
                      (option) => option.value === formData.originCountry
                    )}
                    onChange={handleSelectChange("originCountry")}
                  />
                  {errors.originCountry && (
                    <div className="text-danger">{errors.originCountry}</div>
                  )}
                </div>
                <div className="mb-2">
                  <Select
                    options={countryOptions}
                    placeholder="Destination Country Code"
                    value={countryOptions.find(
                      (option) => option.value === formData.destinationCountry
                    )}
                    onChange={handleSelectChange("destinationCountry")}
                  />
                  {errors.destinationCountry && (
                    <div className="text-danger">
                      {errors.destinationCountry}
                    </div>
                  )}
                </div>
                <div className="d-flex gap-3 my-2">
                  <button type="submit" className="btn btn-primary w-100">
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadMultipleDocuments;
