import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import { City, Country, State } from "country-state-city";
import axios from "axios";

const OpenShipment = () => {
  const [loading, setLoading] = useState(false);

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

  const user = JSON.parse(localStorage.getItem("user"));

  const [openShipment, setOpenShipment] = useState({
    userId: user?.userid,
    personName: "Aarav Sharma",
    phoneNumber: "312-555-7890",
    address: "789 Oak Avenue",
    city: "",
    stateOrProvinceCode: "",
    email: "meet@gmail.com",
    postalCode: "38655",
    countryCode: "",
    recipientsPersonName: "Sofia Rivera",
    recipientsPhoneNumber: "305-444-1234",
    recipientsAddress: "101 Palm Boulevard",
    recipientsEmail: "meet@gmail.com",
    recipientsCity: "",
    recipientsStateOrProvinceCode: "",
    recipientsPostalCode: "38655",
    recipientsCountryCode: "",
    pickupType: "DROPOFF_AT_FEDEX_LOCATION",
    packagingType: "FEDEX_BOX",
    serviceType: "FEDEX_2_DAY",
    paymentType: "RECIPIENT",
    weightUnits: "LB",
    weightValue: "15.5",
    packages: [
      { packagesNo: "1", length: "18", width: "8", height: "8", units: "IN" },
    ],
  });

  const [currentSection, setCurrentSection] = useState(1);

  const addPackage = () => {
    setOpenShipment((prevState) => ({
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
    if (openShipment.packages.length > 1) {
      setOpenShipment((prevState) => ({
        ...prevState,
        packages: prevState.packages.filter((_, i) => i !== index),
      }));
    }
  };

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    setOpenShipment((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setOpenShipment((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateShipmentField = (fieldName) => (selectedOption) => {
    setOpenShipment((prev) => ({
      ...prev,
      [fieldName]: selectedOption?.value ?? "",
    }));

    if (fieldName.includes("Country")) {
      setSelectedCountry(selectedOption);
    } else if (fieldName.includes("State")) {
      setSelectedState(selectedOption);
    }
  };

  const handleRecipientsCountryChange = updateShipmentField(
    "recipientsCountryCode"
  );
  const handleSenderCountryChange = updateShipmentField("senderCountryCode");
  const handleCityChange = updateShipmentField("recipientsCity");
  const handleSenderCityChange = updateShipmentField("senderCity");
  const handleSelectState = updateShipmentField(
    "recipientsStateOrProvinceCode"
  );
  const handleSenderStateChange = updateShipmentField(
    "senderStateOrProvinceCode"
  );

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

  const PickupOptions = [
    { label: "Drop at Fedex Location", value: "DROPOFF_AT_FEDEX_LOCATION" },
    { label: "Contact Fedex To Schedule", value: "CONTACT_FEDEX_TO_SCHEDULE" },
    { label: "Use Scheduled Pickup", value: "USE_SCHEDULED_PICKUP" },
  ];

  const ServiceOptions = [
    { label: "FedEx Ground", value: "FEDEX_GROUND" },
    { label: "First Overnight", value: "FIRST_OVERNIGHT" },
    { label: "FedEx First Freight", value: "FEDEX_FIRST_FREIGHT" },
    { label: "Priority Overnight", value: "PRIORITY_OVERNIGHT" },
    { label: "Standard Overnight", value: "STANDARD_OVERNIGHT" },
    { label: "FedEx 2 Day", value: "FEDEX_2_DAY" },
    { label: "FedEx 2 Day AM", value: "FEDEX_2_DAY_AM" },
    { label: "FedEx Express Saver", value: "FEDEX_EXPRESS_SAVER" },
  ];

  const [resultData, setResultData] = useState(null);

  const handleShipment = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/fedex/shipment/"
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

  console.log(openShipment);

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
              {currentSection === 1 && (
                <>
                  <div>
                    <h5 className="fw-bold text-primary">
                      <i className="fa fa-user-circle"></i> Receiver
                    </h5>
                    <h6>Contact details</h6>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Name *"
                        value={openShipment.recipientsPersonName}
                        onChange={handleChange}
                        name="recipientsPersonName"
                      />
                    </div>
                    <div className="mb-2">
                      <PhoneInput
                        country={openShipment.recipientsPhoneNumber?.toLowerCase()}
                        inputClass="form-control"
                        value={openShipment.recipientsPhoneNumber}
                        onChange={(value) =>
                          setOpenShipment((prev) => ({
                            ...prev,
                            recipientsPhoneNumber: value,
                          }))
                        }
                        name="recipientsPhoneNumber"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={openShipment.recipientsEmail}
                        onChange={handleChange}
                        name="recipientsEmail"
                      />
                    </div>
                    <h6>Address</h6>
                    <div className="mb-2">
                      <Select
                        options={countryOptions}
                        placeholder="Select Country/Territory"
                        value={countryOptions.find(
                          (option) =>
                            option.value === openShipment.recipientsCountryCode
                        )}
                        onChange={handleRecipientsCountryChange}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1 *"
                        value={openShipment.recipientsAddress}
                        onChange={handleChange}
                        name="recipientsAddress"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code"
                        value={openShipment.recipientsPostalCode}
                        onChange={handleChange}
                        name="recipientsPostalCode"
                      />
                    </div>
                    <div className="mb-2">
                      <Select
                        options={stateOptions}
                        placeholder="Select State"
                        value={countryOptions.find(
                          (option) =>
                            option.value ===
                            openShipment.recipientsStateOrProvinceCode
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
                            option.value === openShipment.recipientsCity
                        )}
                        onChange={handleCityChange}
                      />
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold text-primary">
                      <i className="fa fa-user-circle"></i> Sender
                    </h5>
                    <h6>Contact details</h6>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contact Name *"
                        value={openShipment.personName}
                        onChange={handleChange}
                        name="personName"
                      />
                    </div>
                    <div className="mb-2">
                      <PhoneInput
                        inputClass="form-control"
                        value={openShipment.phoneNumber}
                        onChange={(value) =>
                          setOpenShipment((prev) => ({
                            ...prev,
                            phoneNumber: value,
                          }))
                        }
                        name="senderPhoneNumber"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={openShipment.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    <h6>Address</h6>
                    <div className="mb-2">
                      <Select
                        options={countryOptions}
                        placeholder="Select Country/Territory"
                        value={countryOptions.find(
                          (option) => option.value === openShipment.countryCode
                        )}
                        onChange={handleSenderCountryChange}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address Line 1 *"
                        value={openShipment.address}
                        onChange={handleChange}
                        name="address"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Postal Code"
                        value={openShipment.postalCode}
                        onChange={handleChange}
                        name="postalCode"
                      />
                    </div>
                    <div className="mb-2">
                      <Select
                        options={stateOptions}
                        placeholder="Select State"
                        value={stateOptions.find(
                          (option) =>
                            option.value === openShipment.stateOrProvinceCode
                        )}
                        onChange={handleSenderStateChange}
                      />
                    </div>
                    <div className="mb-2">
                      <Select
                        options={cityOptions}
                        placeholder="Select City *"
                        value={cityOptions.find(
                          (option) => option.value === openShipment.city
                        )}
                        onChange={handleSenderCityChange}
                      />
                    </div>
                  </div>
                </>
              )}

              {currentSection === 2 && (
                <div>
                  <div className="mb-2">
                    <label className="form-label fw-bold">PickUp *</label>
                    <Select
                      options={PickupOptions}
                      value={PickupOptions.find(
                        (option) => option.value === openShipment.pickupType
                      )}
                      onChange={handleSelectChange}
                      name="pickupType"
                      placeholder="Select PickUp"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Service *</label>
                    <Select
                      options={ServiceOptions}
                      value={ServiceOptions.find(
                        (option) => option.value === openShipment.serviceType
                      )}
                      onChange={handleSelectChange}
                      name="serviceType"
                      placeholder="Select Service"
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-bold">Packaging *</label>
                    <Select
                      options={PackagingOptions}
                      value={PackagingOptions.find(
                        (option) => option.value === openShipment.packagingType
                      )}
                      onChange={handleSelectChange}
                      name="packagingType"
                      placeholder="Select Packaging"
                    />
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

                  <div>
                    {openShipment.packages.map((pkg, index) => (
                      <div key={index} className="row align-items-end g-2 mb-3">
                        <div className="col-md-3">
                          <label className="form-label fw-bold">Weight *</label>
                          <div className="input-group">
                            <input
                              type="number"
                              name="weightValue"
                              className="form-control"
                              placeholder="0"
                              value={pkg.weightValue}
                              onChange={(e) => handleChange(e, index)}
                            />
                            <select
                              name="weightUnits"
                              onChange={(e) => handleChange(e, index)}
                              value={pkg.weightUnits}
                              className="form-select p-0"
                            >
                              <option value="KG">kg</option>
                              <option value="LB">lbs</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-5">
                          <label className="form-label fw-bold">
                            Dimensions (L × W × H)
                          </label>
                          <div className="input-group">
                            <input
                              type="number"
                              name="length"
                              className="form-control"
                              placeholder="L"
                              value={pkg.length}
                              onChange={(e) => handleChange(e, index)}
                            />
                            <span className="input-group-text">×</span>
                            <input
                              type="number"
                              name="width"
                              className="form-control"
                              placeholder="W"
                              value={pkg.width}
                              onChange={(e) => handleChange(e, index)}
                            />
                            <span className="input-group-text">×</span>
                            <input
                              type="number"
                              name="height"
                              className="form-control"
                              placeholder="H"
                              value={pkg.height}
                              onChange={(e) => handleChange(e, index)}
                            />
                          </div>
                        </div>

                        <div className="col-md-2">
                          <label className="form-label fw-bold">Unit</label>
                          <select
                            name="units"
                            onChange={(e) => handleChange(e, index)}
                            value={pkg.units}
                            className="form-select"
                          >
                            <option value="CM">cm</option>
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
                  </div>
                </div>
              )}
              <button className="btn btn-primary w-100" onClick={nextSection}>
                Next
              </button>
              <button className="btn btn-primary w-100" onClick={prevSection}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenShipment;
