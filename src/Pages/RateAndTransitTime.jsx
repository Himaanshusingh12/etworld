import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import axios from "axios";
import { getRateAndTransitTime } from "../AxiosConfig/AxiosConfig";
import { Country } from "country-state-city";

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
    user: "user13579",
    senderCity: "New York",
    senderPostalCode: "10001",
    senderCountryCode: "US",
    recipientCity: "Chicago",
    recipientPostalCode: "60601",
    recipientCountryCode: "US",
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
    serviceType: "FEDEX_GROUND",
    packagingType: "YOUR_PACKAGING",
    weightUnits: "LB",
    shipDateTime: "2025-03-30T15:00:00",
    packagesNo: 2,
    weightValue: "10",
    length: "16",
    width: "12",
    residential: true,
    height: "8",
    dimensionUnits: "IN",
    customsValueAmount: "400.00",
    customsValueCurrency: "USD",
    commodityDescription: "Handmade Jewelry",
    unitPriceAmount: "200.00",
    unitPriceCurrency: "USD",
    quantity: "2",
    quantityUnits: "PCS",
    shipmentPurpose: "GIFT",
    countryOfManufacture: "US",
  });

  const [errors, setErrors] = useState({});
  const [result, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!calculationData.senderCity)
      newErrors.senderCity = "Sender city is required";
    if (!calculationData.senderPostalCode)
      newErrors.senderPostalCode = "Sender postal code is required";
    if (!calculationData.recipientCity)
      newErrors.recipientCity = "Recipient city is required";
    if (!calculationData.recipientPostalCode)
      newErrors.recipientPostalCode = "Recipient postal code is required";
    if (!calculationData.packagesNo || calculationData.packagesNo < 1)
      newErrors.packagesNo = "Number of packages must be at least 1";
    if (!calculationData.weightValue)
      newErrors.weightValue = "Weight is required";
    if (!calculationData.length) newErrors.length = "Length is required";
    if (!calculationData.width) newErrors.width = "Width is required";
    if (!calculationData.height) newErrors.height = "Height is required";
    if (!calculationData.shipDateTime)
      newErrors.shipDateTime = "Shipping date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCalculationData((prevData) => {
      const newValue = type === "checkbox" ? checked : value;
      let updatedWeightUnits = prevData.weightUnits;
      if (name === "dimensionUnits") {
        updatedWeightUnits = value === "IN" ? "LB" : "KG";
      }
      return {
        ...prevData,
        [name]: newValue,
        ...(name === "dimensionUnits" && { weightUnits: updatedWeightUnits }),
      };
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (selectedOption, { name }) => {
    setCalculationData((prevData) => ({
      ...prevData,
      [name]: selectedOption ? selectedOption.value : "",
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleShowRate = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const serviceTypes =
      calculationData.senderCountryCode !== calculationData.recipientCountryCode
        ? [
            "INTERNATIONAL_FIRST",
            "FEDEX_INTERNATIONAL_PRIORITY",
            "FEDEX_INTERNATIONAL_PRIORITY_EXPRESS",
            "INTERNATIONAL_ECONOMY",
            "FEDEX_INTERNATIONAL_GROUND",
          ]
        : [
            "FEDEX_GROUND",
            "FEDEX_2_DAY",
            "FEDEX_2_DAY_AM",
            "FEDEX_EXPRESS_SAVER",
            "STANDARD_OVERNIGHT",
          ];

    const customsData =
      calculationData.senderCountryCode !== calculationData.recipientCountryCode
        ? {
            customsValueAmount: calculationData.customsValueAmount,
            customsValueCurrency: calculationData.customsValueCurrency,
            commodityDescription: calculationData.commodityDescription,
            unitPriceAmount: calculationData.unitPriceAmount,
            unitPriceCurrency: calculationData.unitPriceCurrency,
            quantity: calculationData.quantity,
            quantityUnits: calculationData.quantityUnits,
            shipmentPurpose: calculationData.shipmentPurpose,
            countryOfManufacture: calculationData.countryOfManufacture,
          }
        : {};

    try {
      const ratePromises = serviceTypes.map(async (serviceType) => {
        try {
          const response = await getRateAndTransitTime({
            ...calculationData,
            serviceType,
            ...customsData,
          });

          if (!response?.data?.data) {
            throw new Error(`Invalid response for ${serviceType}`);
          }
          return {
            serviceType,
            data: response.data.data,
            error: null,
          };
        } catch (error) {
          console.error(`Error fetching data for ${serviceType}:`, error);
          return {
            serviceType,
            data: null,
            error: error.message || "Unknown error",
          };
        }
      });
      const results = await Promise.all(ratePromises);
      setResultData(results);
    } catch (error) {
      console.error("Unexpected error in handleShowRate:", error);
      setResultData([{ serviceType: null, data: null, error: error.message }]);
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

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

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

  const quantityUnits = [
    { label: "LITER", value: "LTR" },
    { label: "METER", value: "M" },
    { label: "MILLIGRAM", value: "MG" },
    { label: "MILLILITER", value: "ML" },
    { label: "NUMBER", value: "NO" },
    { label: "OUNCE", value: "OZ" },
    { label: "PAIR", value: "PR" },
    { label: "PIECES", value: "PCS" },
    { label: "POUND", value: "LB" },
    { label: "CARAT", value: "AR" },
    { label: "CENTIMETER", value: "CM" },
    { label: "DOZEN", value: "DOZ" },
    { label: "EACH", value: "EA" },
    { label: "FOOT", value: "LFT" },
    { label: "GRAM", value: "G" },
    { label: "GROSS", value: "GR" },
    { label: "KILOGRAM", value: "KG" },
    { label: "LINEAR METER", value: "LNM" },
    { label: "DOZEN PAIR", value: "DPR" },
    { label: "CUBIC FOOT", value: "CFT" },
    { label: "CUBIC METER", value: "M3" },
    { label: "SQUARE FOOT", value: "SFT" },
    { label: "SQUARE METER (M2)", value: "M2" },
    { label: "SQUARE YARD", value: "SYD" },
    { label: "YARD", value: "YD" },
  ];

  const shipmentPurposeOptions = [
    { label: "Gift", value: "GIFT" },
    { label: "Not Sold", value: "NOT_SOLD" },
    { label: "Personal Effects", value: "PERSONAL_EFFECTS" },
    { label: "Repair and Return", value: "REPAIR_AND_RETURN" },
    { label: "Sample", value: "SAMPLE" },
    { label: "Sold", value: "SOLD" },
  ];

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
              <h5 className="fw-bold text-primary">
                <i className="fa fa-user-circle"></i> Calculate FedEx shipping
                rates
              </h5>

              <h6>From *</h6>
              <LocationInput
                placeholder="Select From"
                onSelect={handleSelectFrom}
              />
              {(errors.senderCity || errors.senderPostalCode) && (
                <div className="text-danger">
                  {errors.senderCity || errors.senderPostalCode}
                </div>
              )}

              <h6>To *</h6>
              <LocationInput
                placeholder="Select To"
                onSelect={handleSelectTo}
              />
              {(errors.recipientCity || errors.recipientPostalCode) && (
                <div className="text-danger">
                  {errors.recipientCity || errors.recipientPostalCode}
                </div>
              )}

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="residential"
                  checked={calculationData.residential}
                  onChange={handleChange}
                />
                <label className="form-check-label">
                  I'm shipping to a residential address
                </label>
              </div>

              {calculationData.senderCountryCode !==
                calculationData.recipientCountryCode && (
                <div className="mb-3">
                  <div className="row g-3 mb-3">
                    <div className="col-md-4 col-sm-6">
                      <label className="form-label fw-semibold">
                        Unit Price <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          name="unitPriceAmount"
                          className="form-control"
                          value={calculationData.unitPriceAmount}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                        />
                        <select
                          name="unitPriceCurrency"
                          className="form-select"
                          value={calculationData.unitPriceCurrency}
                          onChange={handleChange}
                        >
                          <option value="USD">USD</option>
                          <option value="EUR">EUR</option>
                          <option value="GBP">GBP</option>
                          <option value="INR">INR</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                      <label className="form-label fw-semibold">
                        Quantity <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="number"
                          name="quantity"
                          className="form-control"
                          value={calculationData.quantity}
                          onChange={handleChange}
                          placeholder="0"
                          min="0"
                        />
                        <select
                          name="commodityQuantityUnits"
                          className="form-select"
                          value={quantityUnits.find(
                            (option) =>
                              option.value === calculationData.quantityUnits
                          )}
                          onChange={(option) =>
                            handleSelectChange(option, {
                              name: "quantityUnits",
                            })
                          }
                        >
                          {quantityUnits.map((unit) => (
                            <option key={unit.value} value={unit.value}>
                              {unit.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <Select
                        placeholder="Select Manufacturer Country"
                        options={countryOptions}
                        value={countryOptions.find(
                          (option) =>
                            option.value ===
                            calculationData.countryOfManufacture
                        )}
                        onChange={(option) =>
                          handleSelectChange(option, {
                            name: "countryOfManufacture",
                          })
                        }
                        name="countryOfManufacture"
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        options={shipmentPurposeOptions}
                        placeholder="Select purpose"
                        value={shipmentPurposeOptions.find(
                          (option) =>
                            option.value === calculationData.shipmentPurpose
                        )}
                        onChange={(option) =>
                          handleSelectChange(option, {
                            name: "shipmentPurpose",
                          })
                        }
                        name="shipmentPurpose"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter item description"
                      name="commodityDescription"
                      value={calculationData.commodityDescription}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              <h6 className="my-2">Tell us more about your shipment</h6>
              <div className="mb-2">
                <Select
                  options={PackagingOptions}
                  placeholder="Your Packaging"
                  name="packagingType"
                  value={PackagingOptions.find(
                    (option) => option.value === calculationData.packagingType
                  )}
                  onChange={(option) =>
                    handleSelectChange(option, { name: "packagingType" })
                  }
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
                  onChange={(option) =>
                    handleSelectChange(option, { name: "shipDateTime" })
                  }
                />
                {errors.shipDateTime && (
                  <div className="text-danger">{errors.shipDateTime}</div>
                )}
              </div>

              <div className="row align-items-end g-2 mb-3">
                <div className="col-md-2">
                  <label className="form-label fw-bold">Packages *</label>
                  <input
                    type="number"
                    value={calculationData.packagesNo}
                    className="form-control"
                    name="packagesNo"
                    onChange={handleChange}
                    min="1"
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
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                    />
                    <select
                      name="weightUnits"
                      value={calculationData.weightUnits}
                      className="form-select"
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
                      min="0"
                    />
                    <span className="input-group-text">×</span>
                    <input
                      type="number"
                      name="width"
                      value={calculationData.width}
                      className="form-control"
                      placeholder="W"
                      onChange={handleChange}
                      min="0"
                    />
                    <span className="input-group-text">×</span>
                    <input
                      type="number"
                      name="height"
                      value={calculationData.height}
                      className="form-control"
                      placeholder="H"
                      onChange={handleChange}
                      min="0"
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

              <button
                type="button"
                onClick={handleShowRate}
                className="btn btn-primary w-100 mb-3"
                disabled={loading}
              >
                {loading ? "Loading..." : "Show Rate"}
              </button>

              <div className="mt-3">
                {result?.map(
                  (item, itemIndex) =>
                    item?.data?.length > 0 &&
                    item.data.map((dataItem, index) => (
                      <div
                        key={`item-${itemIndex}-${index}`}
                        className="d-flex border p-2 rounded justify-content-between align-items-center mb-2"
                      >
                        <div>{dataItem?.serviceName || "N/A"}</div>
                        <div>
                          {dataItem?.ratedShipmentDetails?.length > 0 ? (
                            dataItem.ratedShipmentDetails.map(
                              (price, priceIndex) => (
                                <span
                                  key={`price-detail-${itemIndex}-${index}-${priceIndex}`}
                                >
                                  ${price?.totalNetFedExCharge || "0.00"}
                                </span>
                              )
                            )
                          ) : (
                            <span>$0.00</span>
                          )}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RateAndTransitTime;
