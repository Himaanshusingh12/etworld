import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function Feedback() {
  const [region, setRegion] = useState("");
  const [phonecode, setPhoneCode] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <>
      <Navbar />
      <Header title="Feedback" secondtitle="Feedback" />
      <div>
        <h6>Region / Continent</h6>
        <RegionSelect
          onChange={(e) => {
            setRegion(e.name);
          }}
          placeHolder="Select Region"
        />
        <h6>Country</h6>
        <CountrySelect
          onChange={(e) => {
            setCountryid(e.id);
          }}
          placeHolder="Select Country"
          region={region}
        />
        <h6>Phone Code</h6>
        <PhonecodeSelect
          onChange={(e) => {
            console.log("Selected Phone Code:", e);
            setPhoneCode(e.phone_code);
          }}
          placeHolder="Select Phone Code"
          phonecode={phonecode}
        />
        <h6>State</h6>
        <StateSelect
          countryid={countryid}
          onChange={(e) => {
            setstateid(e.id);
          }}
          placeHolder="Select State"
        />
        <h6>City</h6>
        <CitySelect
          countryid={countryid}
          stateid={stateid}
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select City"
        />
        <h6>Language</h6>
        <LanguageSelect
          onChange={(e) => {
            console.log(e);
          }}
          placeHolder="Select Language"
        />
      </div>
      <Footer />
    </>
  );
}

export default Feedback;
