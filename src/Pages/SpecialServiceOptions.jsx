import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select"; // Fixed import
import axios from "axios"; // Added axios import

const SpecialServiceOptions = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const [showDetail, setShowDetail] = useState({
    senderPostalCode: "90210",
    senderCountryCode: "US",
    recipientPostalCode: "33101",
    recipientCountryCode: "US",
    packagingType: "YOUR_PACKAGING",
    weightUnits: "LB",
    weightValue: "10",
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
  });

  const pickupTypeOptions = [
    { label: "Contact FedEx to Schedule", value: "CONTACT_FEDEX_TO_SCHEDULE" },
    { label: "Drop at FedEx Location", value: "DROPOFF_AT_FEDEX_LOCATION" },
    { label: "Use Scheduled Pickup", value: "USE_SCHEDULED_PICKUP" },
  ];

  const packagingOptions = [
    { label: "Your Packaging", value: "YOUR_PACKAGING" },
    { label: "FedEx Envelope", value: "FEDEX_ENVELOPE" },
    { label: "FedEx Box", value: "FEDEX_BOX" },
    { label: "FedEx Small Box", value: "FEDEX_SMALL_BOX" },
    { label: "FedEx Medium Box", value: "FEDEX_MEDIUM_BOX" },
    { label: "FedEx Large Box", value: "FEDEX_LARGE_BOX" },
    { label: "FedEx Extra Large Box", value: "FEDEX_EXTRA_LARGE_BOX" },
    { label: "FedEx Pak", value: "FEDEX_PAK" },
    { label: "FedEx Tube", value: "FEDEX_TUBE" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShowDetail((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setShowDetail((prev) => ({
      ...prev,
      [name]: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleShowRates = async () => {
    if (
      !showDetail.senderPostalCode ||
      !showDetail.recipientPostalCode ||
      !showDetail.weightValue
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/api/fedex/service-availability/SpecialService",
        showDetail
      );
      setResult(response.data.data);
    } catch (err) {
      setError("Failed to fetch shipping rates. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(showDetail);

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

                <div className="mb-3">
                  <h6>From *</h6>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Sender City"
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
                    placeholder="Recipient City"
                    name="recipientCity"
                    value={showDetail.recipientCity}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <h6>Pickup Type</h6>
                  <Select
                    options={pickupTypeOptions}
                    placeholder="Select Pickup Type"
                    name="pickupType"
                    value={pickupTypeOptions.find(
                      (option) => option.value === showDetail.pickupType
                    )}
                    onChange={(option) =>
                      handleSelectChange(option, { name: "pickupType" })
                    }
                  />
                </div>

                <div className="mb-3">
                  <h6>Packaging Type</h6>
                  <Select
                    options={packagingOptions}
                    placeholder="Select Packaging Type"
                    name="packagingType"
                    value={packagingOptions.find(
                      (option) => option.value === showDetail.packagingType
                    )}
                    onChange={(option) =>
                      handleSelectChange(option, { name: "packagingType" })
                    }
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
                    className="btn btn-primary"
                    onClick={handleShowRates}
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

export default SpecialServiceOptions;
