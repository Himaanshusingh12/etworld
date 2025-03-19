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

  const handleSchedulePickUp = async () => {
    try {
      setLoading(true);
      const payload = {
        ...schedulePickUp,
      };
      const response = await axios.post(
        "http://localhost:3000/api/fedex/pickUp/",
        payload
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
                </div>
                <div className="mb-2">
                  <PhoneInput
                    country={schedulePickUp.countryCode?.toLowerCase()}
                    value={schedulePickUp.phoneNumber}
                    onChange={handlePhoneChange}
                    inputClass="form-control"
                  />
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
                </div>

                <h6>When should we pick up your shipment?</h6>
                <div className="d-flex gap-3">
                  <Select
                    options={dateOptions}
                    placeholder="Select PickUp Date"
                    onChange={(value) =>
                      handlePickUpDateChange("pickupDate", value)
                    }
                  />
                  <Select
                    options={earliestTimeOptions}
                    placeholder="Select Earliest Possible Time"
                    onChange={(value) =>
                      handlePickUpDateChange("earliestTime", value)
                    }
                  />
                  <Select
                    options={endTimeOption}
                    placeholder="Select Last Possible Time"
                    onChange={(value) =>
                      handlePickUpDateChange("lastTime", value)
                    }
                  />
                </div>
                <div className="d-flex gap-3 my-2">
                  <button
                    type="button"
                    className="btn btn-primary"
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
