import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import { getServicesAndSpecialServiceOptions } from "../AxiosConfig/AxiosConfig";

const SpecialServiceOptions = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showDetail, setShowDetail] = useState({
    senderPostalCode: "",
    senderCountryCode: "",
    recipientPostalCode: "",
    recipientCountryCode: "",
    packagingType: "YOUR_PACKAGING",
    weightUnits: "LB",
    weightValue: "",
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!showDetail.senderPostalCode) {
      newErrors.senderCity = "Sender city is required";
    }
    if (!showDetail.senderCountryCode) {
      newErrors.senderCountryCode = "Sender country code is required";
    }
    if (!showDetail.recipientPostalCode) {
      newErrors.recipientCity = "Recipient city is required";
    }
    if (!showDetail.recipientCountryCode) {
      newErrors.recipientCountryCode = "Recipient country code is required";
    }
    if (!showDetail.packagingType) {
      newErrors.packagingType = "Packaging type is required";
    }
    if (!showDetail.weightValue > 0) {
      newErrors.weightValue = "Weight is must be greater than 0";
    }
    if (!showDetail.weightUnits) {
      newErrors.weightUnits = "Weight units is required";
    }
    if (!showDetail.pickupType) {
      newErrors.pickupType = "Pickup type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShowRates = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const response = await getServicesAndSpecialServiceOptions(showDetail);
      setResult(response.data.data);
    } catch (err) {
      console.error(err);
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
                  {errors.senderCity && (
                    <div className="text-danger">{errors.senderCity}</div>
                  )}
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
                  {errors.recipientCity && (
                    <div className="text-danger">{errors.recipientCity}</div>
                  )}
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
                  {errors.pickupType && (
                    <div className="text-danger">{errors.pickupType}</div>
                  )}
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
                  {errors.packagingType && (
                    <div className="text-danger">{errors.packagingType}</div>
                  )}
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
                {errors.weightValue && (
                  <div className="text-danger">{errors.weightValue}</div>
                )}
                {errors.weightUnits && (
                  <div className="text-danger">{errors.weightUnits}</div>
                )}

                <div className="d-flex gap-3 my-2">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
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
