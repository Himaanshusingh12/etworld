import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import { useState } from "react";

function Request() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [phone, setPhone] = useState("");

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (c) => ({
          value: c.name,
          label: c.name,
        })
      )
    : [];

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setSelectedCity(null);
    setPhone(`+${selectedOption.code}`);
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setSelectedCity(null);
  };

  return (
    <>
      <Navbar />
      <style>
        {`
     .gradient-custom {
      background: -webkit-linear-gradient(left, #3931af, #00c6ff);
    }

    .card-custom {
    border-bottom-left-radius: 10% 50%;
    border-top-left-radius: 10% 50%;
    background-color: #f8f9fa ;
    }

    .input-custom {
    background-color: white ;
    }

   .white-text {
   color: hsl(52, 0%, 98%);
   font-weight: 100 ;
   font-size: 14px;
   }

   .back-button {
    background-color: hsl(52, 0%, 98%);
    font-weight: 700;
    color: black ;
    margin-top: 50px ;
    }`}
      </style>
      <div className="row mt-3 mx-3 bg-primary" style={{ marginTop: 25 }}>
        <div className="col-md-3">
          <div
            style={{ marginTop: 50, marginLeft: 10 }}
            className="text-center"
          >
            <i
              id="animationDemo"
              data-mdb-animation="slide-right"
              data-mdb-toggle="animation"
              data-mdb-animation-reset="true"
              data-mdb-animation-start="onScroll"
              data-mdb-animation-on-scroll="repeat"
              className="fas fa-3x fa-shipping-fast text-white"
            />
            <h3 className="mt-3 text-white">Welcome</h3>
            <p className="white-text">
              You are 30 seconds away from compleating your access!
            </p>
          </div>
          <div className="text-center">
            <button
              type="submit"
              data-mdb-button-init
              data-mdb-ripple-init
              className="btn btn-white btn-rounded back-button"
            >
              Go back
            </button>
          </div>
        </div>
        <div className="col-md-9 justify-content-center">
          <div className="card card-custom pb-4">
            <div className="card-body mt-0 mx-5">
              <div className="text-center mb-3 pb-2 mt-3">
                <h4 style={{ color: "#495057" }}>Request Access</h4>
              </div>
              <form className="mb-0 was-validated">
                <div className="row ">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Company Name"
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <Select
                      options={countryOptions}
                      placeholder="Select Country"
                      onChange={handleCountryChange}
                    />
                  </div>
                </div>
                {/* from here */}
                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <Select
                      options={stateOptions}
                      placeholder="Select province"
                      isDisabled={!selectedCountry}
                      onChange={handleStateChange}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <Select
                      options={cityOptions}
                      placeholder="Select City"
                      isDisabled={!selectedState}
                      onChange={(option) => setSelectedCity(option)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter Postal Code"
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <PhoneInput
                      country={selectedCountry?.value?.toLowerCase()}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputClass="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="Enter Cell No."
                      required
                    />
                  </div>
                  <div className="col-sm-12 col-md-6 mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
                <div className="float-start ">
                  <button
                    type="submit"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-primary rounded-pill mt-2"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Request;
