import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";

const RateAndTransitTime = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [calculationData, setCalculationData] = useState({
    user: user?.userid,
    senderCity: "Chicago",
    senderPostalCode: "60601",
    senderCountryCode: "US",
    recipientCity: "Houston",
    recipientPostalCode: "77001",
    recipientCountryCode: "US",
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
    serviceType: "FEDEX_GROUND",
    packagingType: "YOUR_PACKAGING",
    weightUnits: "KG",
    shipDateTime: "2025-03-11",
    packagesNo: 1,
    weightValue: 10,
    length: 18,
    width: 12,
    residential: false,
    height: 8,
    dimensionUnits: "IN",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCalculationData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Select component changes
  const handleSelectChange = (selectedOption, { name }) => {
    setCalculationData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : null,
    }));
  };

  const [result, setResultData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleShowRate = async () => {
    try {
      setLoading(true);

      const serviceTypes = [
        "FEDEX_GROUND",
        "FEDEX_2_DAY",
        "FEDEX_2_DAY_AM",
        "FEDEX_EXPRESS_SAVER",
      ];

      let results = [];

      for (const serviceType of serviceTypes) {
        const response = await axios.post(
          "https://fedex-backend-1.onrender.com/api/fedex/rate-transit",
          {
            ...calculationData,
            serviceType,
          }
        );

        console.log(`Response for ${serviceType}:`, response.data);

        results.push({ serviceType, data: response.data });
        setResultData([...results]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateDateOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split("T")[0];
      options.push({
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        value: dateString,
      });
    }
    return options;
  };

  const DateOptions = generateDateOptions();

  const PackagingOptions = [
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

  console.log(result);

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
                  <i className="fa fa-user-circle"></i> Calculate FedEx shipping
                  rates
                </h5>
                <h6>From *</h6>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={calculationData.senderCity}
                    placeholder="From *"
                    name="senderCity"
                    onChange={handleChange}
                  />
                </div>
                <h6>To *</h6>
                <div className="mb-2">
                  <input
                    type="text"
                    value={calculationData.recipientCity}
                    className="form-control"
                    placeholder="To *"
                    name="recipientCity"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="residential" // Added name
                    checked={calculationData.residential} // Changed to checked
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="residential">
                    I'm shipping to a residential address
                  </label>
                </div>

                <h6 className="my-2">Tell us more about your shipment</h6>
                <div className="mb-2">
                  <Select
                    options={PackagingOptions}
                    placeholder="Your Packaging"
                    name="packagingType"
                    value={PackagingOptions.find(
                      (option) => option.value === calculationData.packagingType
                    )}
                    onChange={handleSelectChange}
                  />
                </div>
                <div className="mb-2">
                  <Select
                    options={DateOptions}
                    placeholder="Shipment Date"
                    name="shipDateTime"
                    value={DateOptions.find(
                      (option) => option.value === calculationData.shipDateTime
                    )}
                    onChange={handleSelectChange}
                  />
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                  <label
                    className="form-check-label"
                    htmlFor="purchaseLiability"
                  >
                    Purchase a higher limit of liability from FedEx
                  </label>
                </div>

                <div>
                  <div className="row align-items-end g-2 mb-3">
                    <div className="col-md-2">
                      <label className="form-label fw-bold">Packages *</label>
                      <input
                        type="number"
                        value={calculationData.packagesNo}
                        className="form-control"
                        name="packagesNo"
                        onChange={handleChange}
                      />
                    </div>

                    {/* Weight */}
                    <div className="col-md-3">
                      <label className="form-label fw-bold">Weight *</label>
                      <div className="input-group">
                        <input
                          type="number"
                          name="weightValue"
                          className="form-control"
                          value={calculationData.weightValue}
                          placeholder="0"
                          onChange={handleChange}
                        />
                        <select
                          name="weightUnits"
                          value={calculationData.weightUnits}
                          className="form-select p-0"
                          onChange={handleChange}
                        >
                          <option value="KG">kg</option>
                          <option value="LB">lbs</option>
                        </select>
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div className="col-md-5">
                      <label className="form-label fw-bold">
                        Dimensions (L × W × H)
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          value={calculationData.length}
                          name="length"
                          className="form-control"
                          placeholder="L"
                          onChange={handleChange}
                        />
                        <span className="input-group-text">×</span>
                        <input
                          type="number"
                          name="width"
                          value={calculationData.width}
                          className="form-control"
                          placeholder="W"
                          onChange={handleChange}
                        />
                        <span className="input-group-text">×</span>
                        <input
                          type="number"
                          name="height"
                          value={calculationData.height}
                          className="form-control"
                          placeholder="H"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Dimension Unit */}
                    <div className="col-md-2">
                      <label className="form-label fw-bold">Unit</label>
                      <select
                        name="dimensionUnits"
                        value={calculationData.dimensionUnits}
                        className="form-select"
                        onChange={handleChange}
                      >
                        <option value="CM">cm</option>
                        <option value="IN">in</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 my-2">
                  <button
                    type="button"
                    onClick={handleShowRate}
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

export default RateAndTransitTime;
