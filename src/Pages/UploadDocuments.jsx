import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";
import { Country } from "country-state-city";

const UploadDocuments = () => {
  const [formData, setFormData] = useState({
    file: null,
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
      fileName: file ? file.name : formData.fileName,
    });
  };

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("file", formData.file);
      data.append("fileName", formData.fileName);
      data.append("workflowName", formData.workflowName);
      data.append("shipDocumentType", formData.shipDocumentType);
      data.append("originCountry", formData.originCountry);
      data.append("destinationCountry", formData.destinationCountry);

      const res = await axios.post(
        "https://fedex-backend-1.onrender.com/api/fedex/upload",
        {
          file: formData.file,
          fileName: formData.fileName,
          workflowName: formData.workflowName,
          shipDocumentType: formData.shipDocumentType,
          originCountryCode: formData.originCountry,
          destinationCountryCode: formData.destinationCountry,
        },
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

  const handleSelectChange = (fieldName) => (selectedOption) => {
    setFormData({
      ...formData,
      [fieldName]: selectedOption ? selectedOption.value : "",
    });
  };

  const shimentOption = [
    {
      value: "CERTIFICATE_OF_ORIGIN",
      label: "Certificate of Origin",
    },
    {
      value: "COMMERCIAL_INVOICE",
      label: "Commercial Invoice",
    },
    {
      value: "ETD_LABEL",
      label: "ETD Label",
    },
    {
      value: "USMCA_CERTIFICATION_OF_ORIGIN",
      label: "USMCA Certification of Origin",
    },
    {
      value: "USMCA_COMMERCIAL_INVOICE_CERTIFICATION_OF_ORIGIN",
      label: "USMCA Commercial Invoice and Certification of Origin",
    },
    {
      value: "PRO_FORMA_INVOICE",
      label: "Pro Forma Invoice",
    },
    {
      value: "OTHER",
      label: "Other",
    },
  ];

  const EDTOptions = [
    {
      label: "ETD Preshipment",
      value: "ETDPreshipment",
    },
    {
      label: "ETD Postshipment",
      value: "ETDPostshipment",
    },
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
              <div>
                <h5 className="fw-bold text-primary">
                  <i className="fa fa-user-circle"></i> Upload Documents
                </h5>
                <div className="mb-2">
                  <input
                    type="file"
                    className="form-control"
                    name="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mb-2">
                  <input
                    placeholder="File Name"
                    className="form-control"
                    value={formData.fileName}
                    onChange={(e) =>
                      handleInputChange("fileName", e.target.value)
                    }
                  />
                </div>
                <div className="mb-2">
                  <Select
                    options={EDTOptions}
                    placeholder="ETD Shipment"
                    value={EDTOptions.find(
                      (option) => option.value === formData.workflowName
                    )}
                    onChange={handleSelectChange("workflowName")}
                  />
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

export default UploadDocuments;
