import React from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { City, Country, State } from "country-state-city";
import { useState } from "react";
import axios from "axios";
import { format } from "date-fns";

function Shipping() {
  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const stateOptions = selectedCountry?.value
    ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    : [];

  const cityOptions =
    selectedCountry?.value && selectedState?.value
      ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
          (c) => ({
            value: c.name,
            label: c.name,
          })
        )
      : [];

  const [currentSection, setCurrentSection] = useState(1);

  const addPackage = () => {
    setShipmentData((prevState) => ({
      ...prevState,
      packages: [
        ...prevState.packages,
        {
          packagesNo: "1",
          weight: "",
          weightUnit: "KG",
          length: "",
          width: "",
          height: "",
          units: "CM",
        },
      ],
    }));
  };

  const deletePackage = (index) => {
    if (ShipmentData.packages.length > 1) {
      setShipmentData((prevState) => ({
        ...prevState,
        packages: prevState.packages.filter((_, i) => i !== index),
      }));
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const [ShipmentData, setShipmentData] = useState({
    userId: user?.userid,
    recipientsPersonName: "meet",
    recipientsPhoneNumber: "7897987899",
    recipientsEmail: "meet@gmail.com",
    recipientsCountry: "US",
    recipientsAddress: "456 Cedar Lane",
    recipientsPostalCode: "77002",
    recipientsStateOrProvinceCode: "TX",
    recipientsCity: "Houston",
    recipientsIsResidential: false,
    recipientsIsSave: false,
    senderPersonName: "Meet",
    senderPhoneNumber: "7897986545",
    senderEmail: "meet@gmail.com",
    senderCountry: "US",
    senderAddress: "123 Maple Road",
    senderPostalCode: "02108",
    senderStateOrProvinceCode: "MA",
    senderCity: "Boston",
    senderIsResidential: false,
    senderIsSave: false,
    paymentType: "SENDER",
    serviceType: "FEDEX_2_DAY",
    packagingType: "YOUR_PACKAGING",
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
    packages: [
      {
        packagesNo: "1",
        weight: "10",
        weightUnit: "KG",
        length: "10",
        width: "10",
        height: "10",
        units: "CM",
      },
    ],
  });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (
      [
        "packagesNo",
        "weight",
        "length",
        "width",
        "height",
        "weightUnit",
        "units",
      ].includes(name)
    ) {
      setShipmentData((prev) => ({
        ...prev,
        packages: prev.packages.map((pkg, i) =>
          i === index
            ? {
                ...pkg,
                [name]: type === "checkbox" ? checked : value,
              }
            : pkg
        ),
      }));
    } else {
      setShipmentData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setShipmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateShipmentField = (fieldName) => (selectedOption) => {
    setShipmentData((prev) => ({
      ...prev,
      [fieldName]: selectedOption?.value ?? "",
    }));

    if (fieldName.includes("Country")) {
      setSelectedCountry(selectedOption);
    } else if (fieldName.includes("State")) {
      setSelectedState(selectedOption);
    }
  };

  const handleRecipientsCountryChange =
    updateShipmentField("recipientsCountry");
  const handleSenderCountryChange = updateShipmentField("senderCountry");
  const handleCityChange = updateShipmentField("recipientsCity");
  const handleSenderCityChange = updateShipmentField("senderCity");
  const handleSelectState = updateShipmentField(
    "recipientsStateOrProvinceCode"
  );
  const handleSenderStateChange = updateShipmentField(
    "senderStateOrProvinceCode"
  );

  const ServiceOptions = [
    { label: "International Economy", value: "INTERNATIONAL_ECONOMY" },
    { label: "FedEx Ground", value: "FEDEX_GROUND" },
    { label: "First Overnight", value: "FIRST_OVERNIGHT" },
    { label: "FedEx First Freight", value: "FEDEX_FIRST_FREIGHT" },
    { label: "FedEx 1 Day Freight", value: "FEDEX_1_DAY_FREIGHT" },
    { label: "FedEx 2 Day Freight", value: "FEDEX_2_DAY_FREIGHT" },
    { label: "FedEx 3 Day Freight", value: "FEDEX_3_DAY_FREIGHT" },
    { label: "Intl Ground Distribution", value: "INTL_GROUND_DISTRIBUTION" },
    { label: "Ground Home Delivery", value: "GROUND_HOME_DELIVERY" },
    { label: "Smart Post", value: "SMART_POST" },
    { label: "Priority Overnight", value: "PRIORITY_OVERNIGHT" },
    { label: "Standard Overnight", value: "STANDARD_OVERNIGHT" },
    { label: "FedEx 2 Day", value: "FEDEX_2_DAY" },
    { label: "FedEx 2 Day AM", value: "FEDEX_2_DAY_AM" },
    { label: "FedEx Express Saver", value: "FEDEX_EXPRESS_SAVER" },
    { label: "Same Day", value: "SAME_DAY" },
    { label: "Same Day City", value: "SAME_DAY_CITY" },
  ];

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

  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleShipment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://fedex-backend-1.onrender.com/api/fedex/shipment/",
        {
          userId: "456789",
          personName: ShipmentData.senderPersonName,
          phoneNumber: ShipmentData.senderPhoneNumber,
          address: ShipmentData.senderAddress,
          city: ShipmentData.senderCity,
          postalCode: ShipmentData.senderPostalCode,
          email: ShipmentData.senderEmail,
          countryCode: ShipmentData.senderCountry,
          stateOrProvinceCode: ShipmentData.senderStateOrProvinceCode,
          residential: JSON.stringify(ShipmentData.senderIsResidential),
          recipientsPersonName: ShipmentData.recipientsPersonName,
          recipientsPhoneNumber: ShipmentData.recipientsPhoneNumber,
          recipientsAddress: ShipmentData.recipientsAddress,
          recipientsCity: ShipmentData.recipientsCity,
          recipientsPostalCode: ShipmentData.recipientsPostalCode,
          recipientsEmail: ShipmentData.recipientsEmail,
          recipientsCountryCode: ShipmentData.recipientsCountry,
          recipientsStateOrProvinceCode:
            ShipmentData.recipientsStateOrProvinceCode,
          recipientsResidential: JSON.stringify(
            ShipmentData.recipientsIsResidential
          ),
          pickupType: ShipmentData.pickupType,
          serviceType: ShipmentData.serviceType,
          packagingType: ShipmentData.packagingType,
          paymentType: ShipmentData.paymentType,
          totalWeight: ShipmentData.packages.weight,
          packages: ShipmentData.packages.map((pkg) => ({
            weightValue: pkg.weight,
            weightUnits: pkg.weightUnit,
            length: pkg.length,
            width: pkg.width,
            height: pkg.height,
            units: pkg.units,
          })),
        }
      );
      console.log(response.data);
      setResultData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to go to the next step
  const nextSection = () => {
    setCurrentSection((prev) => prev + 1);
    if (currentSection === 2) {
      handleShipment();
    }
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>
        {/* from here main content start */}
        <div>
          <header className="bg-light py-2 border-bottom">
            <div className="container d-flex justify-content-between align-items-center">
              <div>
                <select className="form-select d-inline w-auto">
                  <option selected>Outbound shipment</option>
                  <option selected>Import shipment</option>
                  <option selected>Return shipment</option>
                </select>
              </div>
              <div>
                <a href="#" className="text-primary me-3">
                  SAVE
                </a>
                <a href="#" className="text-primary me-3">
                  RESET FORM
                </a>
                <a href="#" className="text-primary me-3">
                  SAVE AS SHIPMENT PROFILE
                </a>
                <a href="#" className="text-primary">
                  VIEWS
                </a>
              </div>
            </div>
          </header>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-8 ps-5">
                {currentSection === 1 && (
                  <>
                    <div>
                      <h5 className="fw-bold text-primary">
                        <i className="fa fa-user-circle"></i> Receiver
                      </h5>
                      <p className="fs-5">Who is receiving the shipment?</p>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search in Address Book"
                        />
                      </div>
                      <h6>Contact details</h6>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact Name *"
                          name="recipientsPersonName"
                          value={ShipmentData.recipientsPersonName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={ShipmentData.recipientsCountry?.toLowerCase()}
                          value={ShipmentData.recipientsPhoneNumber}
                          onChange={(value) =>
                            setShipmentData((prev) => ({
                              ...prev,
                              recipientsPhoneNumber: value,
                            }))
                          }
                          inputClass="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="recipientsEmail"
                          value={ShipmentData.recipientsEmail}
                          onChange={handleChange}
                        />
                      </div>
                      <h6>Address</h6>
                      <div className="mb-2">
                        <Select
                          options={countryOptions}
                          placeholder="Select Country/Territory"
                          value={countryOptions.find(
                            (option) =>
                              option.value === ShipmentData.recipientsCountry
                          )}
                          onChange={handleRecipientsCountryChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1 *"
                          name="recipientsAddress"
                          value={ShipmentData.recipientsAddress}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal Code"
                          name="recipientsPostalCode"
                          value={ShipmentData.recipientsPostalCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <Select
                          options={stateOptions}
                          placeholder="Select State"
                          value={countryOptions.find(
                            (option) =>
                              option.value ===
                              ShipmentData.recipientsStateOrProvinceCode
                          )}
                          onChange={handleSelectState}
                        />
                      </div>
                      <div className="mb-2">
                        <Select
                          options={cityOptions}
                          placeholder="Select City *"
                          value={countryOptions.find(
                            (option) =>
                              option.value === ShipmentData.receiverCity
                          )}
                          onChange={handleCityChange}
                        />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="residentialAddress"
                          name="receiverIsResidential"
                          checked={ShipmentData.receiverIsResidential}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="residentialAddress"
                        >
                          This is a residential address
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="saveRecipient"
                          name="receiverIsSave"
                          checked={ShipmentData.receiverIsSave}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="saveRecipient"
                        >
                          Save as new recipient in
                          <select className="form-select d-inline w-auto">
                            <option selected>Personal Address Book</option>
                          </select>
                        </label>
                      </div>
                      <hr className="my-4 border-3 border-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold text-primary">
                        <i className="fa fa-user-circle"></i> Sender
                      </h5>
                      <p className="fs-5">Who is Sending the shipment?</p>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search in Address Book"
                        />
                      </div>
                      <h6>Contact details</h6>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Contact Name *"
                          name="senderPersonName"
                          value={ShipmentData.senderPersonName}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={ShipmentData.senderCountry?.toLowerCase()}
                          value={ShipmentData.senderPhoneNumber}
                          onChange={(value) =>
                            setShipmentData((prev) => ({
                              ...prev,
                              senderPhoneNumber: value,
                            }))
                          }
                          inputClass="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="senderEmail"
                          value={ShipmentData.senderEmail}
                          onChange={handleChange}
                        />
                      </div>
                      <h6>Address</h6>
                      <div className="mb-2">
                        <Select
                          options={countryOptions}
                          placeholder="Select Country/Territory"
                          value={countryOptions.find(
                            (option) =>
                              option.value === ShipmentData.senderCountry
                          )}
                          onChange={handleSenderCountryChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1 *"
                          name="senderAddress"
                          value={ShipmentData.senderAddress}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal Code"
                          name="senderPostalCode"
                          value={ShipmentData.senderPostalCode}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-2">
                        <Select
                          options={stateOptions}
                          placeholder="Select State"
                          value={countryOptions.find(
                            (option) =>
                              option.value ===
                              ShipmentData.senderStateOrProvinceCode
                          )}
                          onChange={handleSenderStateChange}
                        />
                      </div>
                      <div className="mb-2">
                        <Select
                          options={cityOptions}
                          placeholder="Select City *"
                          value={countryOptions.find(
                            (option) => option.value === ShipmentData.senderCity
                          )}
                          onChange={handleSenderCityChange}
                        />
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="senderResidential"
                          name="senderIsResidential"
                          checked={ShipmentData.senderIsResidential}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="residentialAddress"
                        >
                          This is a residential address
                        </label>
                      </div>
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="saveSender"
                          name="senderIsSave"
                          checked={ShipmentData.senderIsSave}
                          onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="saveSender"
                        >
                          Save as new sender in
                          <select className="form-select d-inline w-auto">
                            <option selected>Personal Address Book</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </>
                )}

                {/* Package detail section */}
                {currentSection === 2 && (
                  <div>
                    <h5 className="fw-bold text-primary">
                      <i className="fa fa-check-circle"></i> Package details
                    </h5>
                    <p className="fs-5">What type of packaging will be used?</p>

                    <div className="mb-2">
                      <label className="form-label fw-bold">PickUp *</label>
                      <select
                        onChange={handleSelectChange}
                        name="pickupType"
                        value={ShipmentData.pickupType}
                        className="form-control"
                      >
                        <option selected value={"DROPOFF_AT_FEDEX_LOCATION"}>
                          Dropoff at Fedex Location
                        </option>
                        <option value={"CONTACT_FEDEX_TO_SCHEDULE"}>
                          Contact Fedex To Schedule
                        </option>
                        <option value={"USE_SCHEDULED_PICKUP"}>
                          Use Scheduled Pickup
                        </option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-bold">Service *</label>
                      <select
                        onChange={handleSelectChange}
                        name="serviceType"
                        value={ShipmentData.serviceType}
                        className="form-control"
                      >
                        {ServiceOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-bold">Packaging *</label>
                      <select
                        onChange={handleSelectChange}
                        name="packagingType"
                        value={ShipmentData.packagingType}
                        className="form-control"
                      >
                        {PackagingOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="liabilityCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="liabilityCheck"
                      >
                        Purchase a higher limit of liability from Et World
                        <i className="fa fa-info-circle"></i>
                      </label>
                    </div>

                    {/* Package Input Rows */}
                    {ShipmentData.packages.map((pkg, index) => (
                      <div key={index}>
                        <div className="row align-items-end g-2 mb-3">
                          <div className="col-md-2">
                            <label className="form-label fw-bold">
                              {index === 0 ? "Packages *" : ""}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={pkg.packagesNo}
                              name="packagesNo"
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>

                          {/* Weight */}
                          <div className="col-md-3">
                            <label className="form-label fw-bold">
                              {index === 0 ? "Weight *" : ""}
                            </label>
                            <div className="input-group">
                              <input
                                type="number"
                                name="weight"
                                onChange={(e) => handleChange(e, index)}
                                value={pkg.weight}
                                className="form-control"
                                placeholder="0"
                              />
                              <select
                                onChange={(e) => handleChange(e, index)}
                                value={pkg.weightUnit}
                                name="weightUnit"
                                className="form-select p-0"
                              >
                                <option value="KG">kg</option>
                                <option value="LB">lbs</option>
                              </select>
                            </div>
                          </div>

                          {/* Dimensions */}
                          <div className="col-md-5">
                            <label className="form-label fw-bold">
                              {index === 0 ? "Dimensions (L × W × H)" : ""}
                            </label>
                            <div className="input-group">
                              <input
                                type="number"
                                value={pkg.length}
                                onChange={(e) => handleChange(e, index)}
                                name="length"
                                className="form-control"
                                placeholder="L"
                              />
                              <span className="input-group-text">×</span>
                              <input
                                type="number"
                                value={pkg.width}
                                onChange={(e) => handleChange(e, index)}
                                name="width"
                                className="form-control"
                                placeholder="W"
                              />
                              <span className="input-group-text">×</span>
                              <input
                                type="number"
                                value={pkg.height}
                                onChange={(e) => handleChange(e, index)}
                                name="height"
                                className="form-control"
                                placeholder="H"
                              />
                            </div>
                          </div>

                          {/* Dimension Unit */}
                          <div className="col-md-2">
                            <label className="form-label fw-bold">
                              {index === 0 ? "Unit" : ""}
                            </label>
                            <select
                              onChange={(e) => handleChange(e, index)}
                              name="units"
                              value={pkg.units}
                              className="form-select"
                            >
                              <option selected value="CM">
                                cm
                              </option>
                              <option value="IN">in</option>
                            </select>
                          </div>

                          {index !== 0 && (
                            <div className="col-md-2">
                              <button
                                className="btn btn-danger mt-3"
                                onClick={() => deletePackage(index)}
                              >
                                -
                              </button>
                            </div>
                          )}
                        </div>

                        <a href="#" className="text-primary d-block mb-3 parse">
                          ADD PACKAGE OPTIONS
                        </a>
                        <hr />
                      </div>
                    ))}

                    <a
                      href="#"
                      className="text-primary d-block mb-4"
                      onClick={(e) => {
                        e.preventDefault();
                        addPackage();
                      }}
                    >
                      + ADD PACKAGE
                    </a>

                    <p className="fw-bold">
                      Total packages: {ShipmentData.packages.length}
                    </p>
                  </div>
                )}

                {/* third section */}
                {currentSection === 3 && (
                  <div>
                    <h3>Third Section Content</h3>
                    <p>This is the content for the third section.</p>
                    Service
                    {loading ? (
                      <div>loading....</div>
                    ) : (
                      <div className="my-3 d-flex justify-content-between border p-3">
                        <div>
                          {resultData?.data?.transactionShipments?.[0]
                            ?.pieceResponses?.[0]?.deliveryDatestamp
                            ? format(
                                new Date(
                                  resultData.data.transactionShipments[0].pieceResponses[0].deliveryDatestamp
                                ),
                                "MMMM dd, yyyy hh:mm a"
                              )
                            : "N/A"}
                        </div>
                        <div>
                          $
                          {resultData?.data?.transactionShipments?.[0]
                            ?.completedShipmentDetail?.shipmentRating
                            ?.shipmentRateDetails?.[0]?.totalNetFedExCharge ??
                            "0"}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button className="btn btn-primary w-100" onClick={nextSection}>
                  NEXT
                </button>
                <button className="btn btn-primary w-100" onClick={prevSection}>
                  Back
                </button>
              </div>
              {/* new one */}
              <div className="col-md-4">
                <div className="border p-3 bg-light">
                  <h6>Ship from</h6>
                  <p className="small mb-0"></p>
                  <p className="small">
                    <br />
                  </p>
                  <hr />
                  <ul className="list-unstyled">
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Deliver to
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Package details
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Service
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Service options
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Pickup/drop-off
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Notifications
                    </li>
                    <hr />
                    <li>
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                      />
                      Billing details
                    </li>
                  </ul>
                </div>
                <div className="alert alert-secondary mt-4 text-center">
                  Please provide the sender and recipient addresses, package
                  details, and select a service to see the estimated delivery
                  date and total costs.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
