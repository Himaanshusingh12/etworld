import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";
import { Country } from "country-state-city";

const UploadImage = () => {
  const [formData, setFormData] = useState({
    attachment: null,
    fileName: "",
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

  const shipmentOptions = [
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

  // Assuming these are your ETD options - adjust as needed
  const ETDOptions = [
    { value: "STANDARD", label: "Standard" },
    { value: "EXPRESS", label: "Express" },
    { value: "OVERNIGHT", label: "Overnight" },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      attachment: file,
      fileName: file ? file.name : formData.fileName,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (fieldName) => (selectedOption) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption ? selectedOption.value : "",
    });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("attachment", formData.attachment);
      data.append("fileName", formData.fileName);
      data.append("workflowName", formData.workflowName);
      data.append("shipDocumentType", formData.shipDocumentType);
      data.append("originCountryCode", formData.originCountry);
      data.append("destinationCountryCode", formData.destinationCountry);

      const res = await axios.post(
        "http://localhost:3000/api/fedex/upload/image",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

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
              <div>
                <h5 className="fw-bold text-primary">
                  <i className="fa fa-user-circle"></i> Upload Documents
                </h5>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    name="attachment"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-2">
                  <input
                    placeholder="File Name"
                    className="form-control"
                    name="fileName"
                    value={formData.fileName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <input
                    className="form-control"
                    placeholder="ETD Shipment"
                    name="workflowName"
                    value={formData.workflowName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <Select
                    options={shipmentOptions}
                    placeholder="Shipment Document Type"
                    value={shipmentOptions.find(
                      (option) => option.value === formData.shipDocumentType
                    )}
                    onChange={handleSelectChange("shipDocumentType")}
                  />
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
                </div>
                <div className="d-flex gap-3 my-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadImage;
