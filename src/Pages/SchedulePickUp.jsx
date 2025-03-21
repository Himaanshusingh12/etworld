import React, { useCallback, useEffect, useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { City, Country, State } from "country-state-city";
import { format } from "date-fns";
import axios from "axios";

const SchedulePickUp = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const [schedulePickUp, setSchedulePickUp] = useState({
    userId: user?.userid,
    contactName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    address: "",
    countryCode: "",
    city: "",
    stateOrProvinceCode: "",
    postalCode: "",
    carrierCode: "",
    readyDateTimestamp: "",
    customerCloseTime: "",
    residential: false,
    packages: "",
    totalWeight: "",
    pickupInstructions: "",
  });

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSchedulePickUp((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSchedulePickUp((prev) => ({
      ...prev,
      countryCode: selectedOption ? selectedOption.value : "",
      stateOrProvinceCode: "",
      city: "",
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSchedulePickUp((prev) => ({
      ...prev,
      stateOrProvinceCode: selectedOption ? selectedOption.value : "",
      city: "",
    }));
  };

  const handleCityChange = (selectedOption) => {
    setSchedulePickUp((prev) => ({
      ...prev,
      city: selectedOption ? selectedOption.value : "",
    }));
  };

  const handlePhoneChange = (value) => {
    setSchedulePickUp((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  const [pickupDetails, setPickupDetails] = useState({
    pickupDate: "",
    earliestTime: "",
    lastTime: "",
  });

  const handlePickUpDateChange = useCallback((field, value) => {
    setPickupDetails((prev) => ({
      ...prev,
      [field]: value.value,
    }));
  }, []);

  useEffect(() => {
    const { pickupDate, earliestTime, lastTime } = pickupDetails;
    if (pickupDate && earliestTime && lastTime) {
      setSchedulePickUp((prev) => ({
        ...prev,
        readyDateTimestamp: `${pickupDate}T${earliestTime}:00`,
        customerCloseTime: `${lastTime}:00`,
      }));
    }
  }, [pickupDetails]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dateOptions = [
    { value: format(today, "yyyy-MM-dd"), label: format(today, "EEEE, MMM d") },
    {
      value: format(tomorrow, "yyyy-MM-dd"),
      label: format(tomorrow, "EEEE, MMM d"),
    },
  ];

  const earliestTimeOptions = [
    { value: "8:00", label: "8:00 AM" },
    { value: "8:30", label: "8:30 PM" },
    { value: "9:00", label: "9:00 PM" },
    { value: "9:30", label: "9:30 PM" },
    { value: "10:00", label: "10:00 PM" },
    { value: "10:30", label: "10:30 PM" },
    { value: "11:00", label: "11:00 PM" },
    { value: "11:30", label: "11:30 PM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
  ];

  const endTimeOption = [
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "15:30", label: "3:30 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "17:30", label: "5:30 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "19:30", label: "7:30 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "20:30", label: "8:30 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "21:30", label: "9:30 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "22:30", label: "10:30 PM" },
    { value: "23:00", label: "11:00 PM" },
    { value: "23:30", label: "11:30 PM" },
    { value: "23:59", label: "11:59 PM" },
  ];

  const serviceOptions = [
    {
      value: "FDXE",
      label: "FedEx Express",
    },
    {
      value: "FDXG",
      label: "FedEx Ground",
    },
  ];

  const PickUpInstrunctions = [
    {
      value: "NONE",
      label: "None",
    },
    {
      value: "FRONT",
      label: "Front",
    },
    {
      value: "REAR",
      label: "Rear",
    },
    {
      value: "SIDE",
      label: "Side",
    },
  ];

  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!schedulePickUp.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    } else if (schedulePickUp.contactName.trim().length < 2) {
      newErrors.contactName = "Contact name must be at least 2 characters";
    }

    if (!schedulePickUp.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    } else if (schedulePickUp.companyName.trim().length < 2) {
      newErrors.companyName = "Company name must be at least 2 characters";
    }

    if (!schedulePickUp.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?\d{10,15}$/.test(schedulePickUp.phoneNumber)) {
      newErrors.phoneNumber =
        "Phone number must be 10-15 digits (including country code)";
    }

    if (!schedulePickUp.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        schedulePickUp.email.trim()
      )
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!schedulePickUp.address.trim()) {
      newErrors.address = "Address is required";
    } else if (schedulePickUp.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!schedulePickUp.countryCode) {
      newErrors.countryCode = "Country is required";
    }

    if (!schedulePickUp.city) {
      newErrors.city = "City is required";
    } else if (schedulePickUp.city.trim().length < 2) {
      newErrors.city = "City name must be at least 2 characters";
    }

    if (!schedulePickUp.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(schedulePickUp.postalCode.trim())) {
      newErrors.postalCode =
        "Postal code must be in format 12345 or 12345-6789";
    }

    if (!schedulePickUp.stateOrProvinceCode) {
      newErrors.stateOrProvinceCode = "State/Province is required";
    }

    if (!schedulePickUp.carrierCode) {
      newErrors.carrierCode = "Service selection is required";
    }

    if (!schedulePickUp.packages) {
      newErrors.packages = "Number of packages is required";
    } else if (
      isNaN(schedulePickUp.packages) ||
      Number(schedulePickUp.packages) <= 0
    ) {
      newErrors.packages = "Number of packages must be a positive number";
    }

    if (!schedulePickUp.totalWeight) {
      newErrors.totalWeight = "Total weight is required";
    } else if (
      isNaN(schedulePickUp.totalWeight) ||
      Number(schedulePickUp.totalWeight) <= 0
    ) {
      newErrors.totalWeight = "Total weight must be a positive number";
    }

    if (!pickupDetails.pickupDate) {
      newErrors.pickupDate = "Pickup date is required";
    } else if (
      new Date(pickupDetails.pickupDate) < new Date().setHours(0, 0, 0, 0)
    ) {
      newErrors.pickupDate = "Pickup date cannot be in the past";
    }

    if (!pickupDetails.earliestTime) {
      newErrors.earliestTime = "Earliest pickup time is required";
    }

    if (!pickupDetails.lastTime) {
      newErrors.lastTime = "Latest pickup time is required";
    } else if (pickupDetails.earliestTime && pickupDetails.lastTime) {
      const earliest = pickupDetails.earliestTime.split(":").map(Number);
      const last = pickupDetails.lastTime.split(":").map(Number);
      const earliestMinutes = earliest[0] * 60 + earliest[1];
      const lastMinutes = last[0] * 60 + last[1];
      if (earliestMinutes >= lastMinutes) {
        newErrors.lastTime = "Latest time must be after earliest time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSchedulePickUp = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/fedex/pickUp/`,
        schedulePickUp
      );
      setResultData(response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
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
                <h5 className="fw-bold text-primary">
                  <i className="fa fa-user-circle"></i> Where should we pick up
                  your shipment?
                </h5>
                <h6>Contact details</h6>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Name *"
                    name="contactName"
                    value={schedulePickUp.contactName}
                    onChange={handleChange}
                  />
                  {errors.contactName && (
                    <div className="text-danger">{errors.contactName}</div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name *"
                    name="companyName"
                    value={schedulePickUp.companyName}
                    onChange={handleChange}
                  />
                  {errors.companyName && (
                    <div className="text-danger">{errors.companyName}</div>
                  )}
                </div>
                <div className="mb-2">
                  <PhoneInput
                    country={schedulePickUp.countryCode?.toLowerCase()}
                    value={schedulePickUp.phoneNumber}
                    onChange={handlePhoneChange}
                    inputClass="form-control"
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">{errors.phoneNumber}</div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={schedulePickUp.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <h6>Address</h6>
                <div className="mb-2">
                  <Select
                    options={countryOptions}
                    placeholder="Select Country/Territory"
                    value={countryOptions.find(
                      (option) => option.value === schedulePickUp.countryCode
                    )}
                    onChange={handleCountryChange}
                  />
                  {errors.countryCode && (
                    <div className="text-danger">{errors.countryCode}</div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address Line 1 *"
                    name="address"
                    value={schedulePickUp.address}
                    onChange={handleChange}
                  />
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal Code"
                    name="postalCode"
                    value={schedulePickUp.postalCode}
                    onChange={handleChange}
                  />
                  {errors.postalCode && (
                    <div className="text-danger">{errors.postalCode}</div>
                  )}
                </div>
                <div className="mb-2">
                  <Select
                    options={stateOptions}
                    placeholder="Select State"
                    value={stateOptions.find(
                      (option) =>
                        option.value === schedulePickUp.stateOrProvinceCode
                    )}
                    onChange={handleStateChange}
                    isDisabled={!selectedCountry}
                  />
                  {errors.stateOrProvinceCode && (
                    <div className="text-danger">
                      {errors.stateOrProvinceCode}
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <Select
                    options={cityOptions}
                    placeholder="Select City *"
                    value={cityOptions.find(
                      (option) => option.value === schedulePickUp.city
                    )}
                    onChange={handleCityChange}
                    isDisabled={!selectedState}
                  />
                  {errors.city && (
                    <div className="text-danger">{errors.city}</div>
                  )}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="residentialAddress"
                    name="receiverIsResidential"
                    checked={schedulePickUp.receiverIsResidential}
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
                    checked={schedulePickUp.receiverIsSave}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="saveRecipient">
                    Save as new recipient in
                    <select className="form-select d-inline w-auto ms-1">
                      <option value="personal">Personal Address Book</option>
                    </select>
                  </label>
                </div>
                <div className="mb-3">
                  <h6>Which service would you like to schedule?</h6>
                  <Select
                    options={serviceOptions}
                    placeholder="Select Service"
                    name="carrierCode"
                    value={serviceOptions.find(
                      (option) => option.value === schedulePickUp.carrierCode
                    )}
                    onChange={(selectedOption) => {
                      setSchedulePickUp((prevState) => ({
                        ...prevState,
                        carrierCode: selectedOption.value,
                      }));
                    }}
                  />
                  {errors.carrierCode && (
                    <div className="text-danger">{errors.carrierCode}</div>
                  )}
                </div>
                <h6>What do you want picked up?</h6>
                <div className="d-flex gap-3">
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Packages"
                      name="packages"
                      value={schedulePickUp.packages}
                      onChange={handleChange}
                    />
                    {errors.packages && (
                      <div className="text-danger">{errors.packages}</div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      name="totalWeight"
                      placeholder="Total weight"
                      value={schedulePickUp.totalWeight}
                      onChange={handleChange}
                    />
                    {errors.totalWeight && (
                      <div className="text-danger">{errors.totalWeight}</div>
                    )}
                  </div>
                  <Select
                    options={PickUpInstrunctions}
                    placeholder="PickUp Instructions"
                    value={PickUpInstrunctions.find(
                      (option) =>
                        option.value === schedulePickUp.pickupInstructions
                    )}
                    onChange={(selectedOption) => {
                      setSchedulePickUp((prevState) => ({
                        ...prevState,
                        pickupInstructions: selectedOption.value,
                      }));
                    }}
                  />
                  {errors.pickupInstructions && (
                    <div className="text-danger">
                      {errors.pickupInstructions}
                    </div>
                  )}
                </div>

                <h6>When should we pick up your shipment?</h6>
                <div className="d-flex gap-3">
                  <div>
                    <Select
                      options={dateOptions}
                      placeholder="Select PickUp Date"
                      onChange={(value) =>
                        handlePickUpDateChange("pickupDate", value)
                      }
                    />
                    {errors.pickupDate && (
                      <div className="text-danger">{errors.pickupDate}</div>
                    )}
                  </div>
                  <div>
                    <Select
                      options={earliestTimeOptions}
                      placeholder="Select Earliest Possible Time"
                      onChange={(value) =>
                        handlePickUpDateChange("earliestTime", value)
                      }
                    />
                    {errors.earliestTime && (
                      <div className="text-danger">{errors.earliestTime}</div>
                    )}
                  </div>
                  <div>
                    <Select
                      options={endTimeOption}
                      placeholder="Select Last Possible Time"
                      onChange={(value) =>
                        handlePickUpDateChange("lastTime", value)
                      }
                    />
                    {errors.lastTime && (
                      <div className="text-danger">{errors.lastTime}</div>
                    )}
                  </div>
                </div>
                <div className="d-flex gap-3 my-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSchedulePickUp}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Next"}
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

export default SchedulePickUp;
