import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";

const LocationInput = ({ placeholder, onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePlaceSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    try {
      const apiKey = "8fcfddceccc64e24bdaa5fe500984adc";
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: value,
            key: apiKey,
            limit: 5,
          },
        }
      );

      setSuggestions(response.data.results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    const city =
      item.components.city ||
      item.components.town ||
      item.components.village ||
      "";
    const zip = item.components.postcode || "";
    const country = item.components.country_code?.toUpperCase() || "";

    onSelect({ city, zip, country, formatted: item.formatted });
    setQuery(item.formatted);
    setSuggestions([]);
  };

  return (
    <div className="mb-2">
      <input
        type="text"
        className="form-control"
        value={query}
        onChange={handlePlaceSearch}
        placeholder={placeholder}
      />
      {loading && <p>Loading suggestions...</p>}
      <ul
        className="list-group"
        style={{ maxHeight: "200px", overflowY: "auto" }}
      >
        {suggestions.map((item, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => handleSelect(item)}
            style={{ cursor: "pointer" }}
          >
            {item.formatted} -{" "}
            {item.components.country_code?.toUpperCase() || ""}
          </li>
        ))}
      </ul>
    </div>
  );
};

const RateAndTransitTime = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [calculationData, setCalculationData] = useState({
    user: user?.userid,
    senderCity: "",
    senderPostalCode: "",
    senderCountryCode: "",
    recipientCity: "",
    recipientPostalCode: "",
    recipientCountryCode: "",
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

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!calculationData.senderCity) {
      newErrors.senderCity = "Sender city is required";
    }
    if (!calculationData.senderPostalCode) {
      newErrors.senderPostalCode = "Sender postal code is required";
    }
    if (!calculationData.recipientCity) {
      newErrors.recipientCity = "Recipient city is required";
    }
    if (!calculationData.recipientPostalCode) {
      newErrors.recipientPostalCode = "Recipient postal code is required";
    }
    if (calculationData.packagesNo < 1) {
      newErrors.packagesNo = "Number of packages must be at least 1";
    }
    if (!calculationData.packagesNo) {
      newErrors.packagesNo = "packages No is required";
    }
    if (!calculationData.weightValue) {
      newErrors.weightValue = "Weight is required";
    }
    if (!calculationData.length) {
      newErrors.length = "Length is required";
    }
    if (!calculationData.width) {
      newErrors.width = "Width is required";
    }
    if (!calculationData.height) {
      newErrors.height = "Height is required";
    }
    if (!calculationData.shipDateTime) {
      newErrors.shipDateTime = "Shipping date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCalculationData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setCalculationData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : null,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const [result, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleShowRate = async () => {
    if (!validateForm()) {
      return;
    }
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
        try {
          const response = await axios.post(
            "http://localhost:3000/api/fedex/rate-transit",
            {
              ...calculationData,
              serviceType,
            }
          );
          results.push({ data: response?.data?.data });
        } catch (error) {
          console.error(`Error fetching data for ${serviceType}:`, error);
          results.push({ serviceType, error: error.message });
        }
      }
      setResultData([...results]);
    } catch (error) {
      console.error("Unexpected error:", error);
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

  const handleSelectFrom = (data) => {
    setCalculationData((prev) => ({
      ...prev,
      senderCity: data.city,
      senderPostalCode: data.zip,
      senderCountryCode: data.country,
    }));
    setErrors((prev) => ({
      ...prev,
      senderCity: "",
      senderPostalCode: "",
    }));
  };

  const handleSelectTo = (data) => {
    setCalculationData((prev) => ({
      ...prev,
      recipientCity: data.city,
      recipientPostalCode: data.zip,
      recipientCountryCode: data.country,
    }));
    setErrors((prev) => ({
      ...prev,
      recipientCity: "",
      recipientPostalCode: "",
    }));
  };

  console.log(errors);

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
                  <LocationInput
                    placeholder="Select From"
                    onSelect={handleSelectFrom}
                  />
                  {(errors.senderCity || errors.senderPostalCode) && (
                    <div className="text-danger">
                      {errors.senderCity || errors.senderPostalCode}
                    </div>
                  )}
                </div>
                <h6>To *</h6>
                <div className="mb-2">
                  <LocationInput
                    placeholder="Select To"
                    onSelect={handleSelectTo}
                  />
                  {(errors.recipientCity || errors.recipientPostalCode) && (
                    <div className="text-danger">
                      {errors.recipientCity || errors.recipientPostalCode}
                    </div>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="residential"
                    checked={calculationData.residential}
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
                  {errors.shipDateTime && (
                    <div className="text-danger">{errors.shipDateTime}</div>
                  )}
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
                      {errors.packagesNo && (
                        <div className="text-danger">{errors.packagesNo}</div>
                      )}
                    </div>

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
                      {errors.weightValue && (
                        <div className="text-danger">{errors.weightValue}</div>
                      )}
                    </div>

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
                      {(errors.length || errors.width || errors.height) && (
                        <div className="text-danger">
                          {errors.length || errors.width || errors.height}
                        </div>
                      )}
                    </div>

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
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Show Rate"}
                  </button>
                </div>
              </div>
              <div>
                <div className="mt-3">
                  {result?.map((item, index) => (
                    <div
                      key={`item-${index}`}
                      className="d-flex border p-2 rounded justify-content-between align-items-center"
                    >
                      <div>{item?.data?.[0]?.serviceName || "N/A"}</div>
                      <div>
                        {item?.data?.[0]?.ratedShipmentDetails?.map(
                          (price, priceIndex) => (
                            <span key={`price-detail-${index}-${priceIndex}`}>
                              {`$${price?.totalNetFedExCharge || "0.00"} `}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ))}
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
