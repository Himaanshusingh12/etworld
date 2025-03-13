import React, { useState } from "react";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import LogisticHeader from "../Components/LogisticHeader";
import Select from "react-select";
import axios from "axios";

const ServicesAndPackagingOptions = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showDetail, setShowDetail] = useState({
    postalCode: "38115",
    countryCode: "US",
    recipientPostalCode: "38115",
    recipientCountryCode: "US",
    weightUnits: "KG",
    weightValue: "4",
    carrierCode: "FDXE",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShowDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setShowDetail((prev) => ({
      ...prev,
      carrierCode: selectedOption ? selectedOption.value : "",
    }));
  };

  const pickUpType = [
    { label: "FedEx Express", value: "FDXE" },
    { label: "FedEx Ground", value: "FDXG" },
    { label: "FedEx SmartPost", value: "FXSP" },
    { label: "FedEx Custom Critical", value: "FXCC" },
  ];

  const handleShowdetail = async () => {
    if (
      !showDetail.weightValue ||
      !showDetail.postalCode ||
      !showDetail.recipientPostalCode
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/api/fedex/service-availability/PackagingOptions",
        showDetail
      );
      console.log(response.data.data, "response");
      setResult(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch shipping rates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
                <h5 className="fw-bold text-primary mb-4">
                  <i className="fa fa-user-circle me-2"></i>Calculate FedEx
                  shipping rates
                </h5>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="mb-3">
                  <h6>From *</h6>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="From *"
                    name="senderCity"
                    value={showDetail.senderCity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <h6>To *</h6>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="To *"
                    name="recipientCity"
                    value={showDetail.recipientCity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <h6>Pickup Type</h6>
                  <Select
                    options={pickUpType}
                    placeholder="Select Pickup Type"
                    value={pickUpType.find(
                      (option) => option.value === showDetail.carrierCode
                    )}
                    onChange={handleSelectChange}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label fw-bold">Weight *</label>
                  <div className="input-group">
                    <input
                      type="number"
                      name="weightValue"
                      className="form-control"
                      value={showDetail.weightValue}
                      placeholder="0"
                      onChange={handleChange}
                    />
                    <select
                      name="weightUnits"
                      value={showDetail.weightUnits}
                      className="form-select p-0"
                      onChange={handleChange}
                    >
                      <option value="KG">kg</option>
                      <option value="LB">lbs</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex gap-3 my-2">
                  <button
                    type="button"
                    onClick={handleShowdetail}
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Show Rate"}
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

export default ServicesAndPackagingOptions;
