import React from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { City, Country, State } from "country-state-city";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { resetState, setShipmentData } from "../Redux/Slices/ShipmentSlice";
import { handleChange as handleChangeAction } from "../Redux/Slices/ShipmentSlice";
import {
  addPackage as addPackageAction,
  deletePackage as deletePackageAction,
  calculateTotals,
} from "../Redux/Slices/ShipmentSlice";
import {
  CreateShipment,
  EditShipment,
  getToken,
  SavaShipmentData,
} from "../AxiosConfig/AxiosConfig";
import { useNavigate } from "react-router-dom";

function Shipping() {
  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const ShipmentData = useSelector((state) => state.Shipping);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const navigate = useNavigate()

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

  useEffect(() => {
    dispatch(calculateTotals());
  }, [ShipmentData]);

  const addPackage = () => {
    dispatch(addPackageAction());
    dispatch(calculateTotals());
  };

  const deletePackage = (index) => {
    dispatch(deletePackageAction(index));
    dispatch(calculateTotals());
  };

  const [currentSection, setCurrentSection] = useState(1);

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
      dispatch(
        handleChangeAction({
          name: `packages.${name}`,
          value: type === "checkbox" ? checked : value,
          packageIndex: index,
        })
      );
      if (name === "weightUnit") {
        dispatch(
          handleChangeAction({
            name: "packages.units",
            value: value === "KG" ? "CM" : "IN",
            packageIndex: index,
          })
        );
      } else if (name === "units") {
        dispatch(
          handleChangeAction({
            name: "packages.weightUnit",
            value: value === "CM" ? "KG" : "LB",
            packageIndex: index,
          })
        );
      }
    } else {
      dispatch(
        handleChangeAction({
          name,
          value: type === "checkbox" ? checked : value,
        })
      );
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    dispatch(
      handleChangeAction({
        name,
        value,
      })
    );
  };

  const handleDropdownChange = (selectedOption, { name }) => {
    dispatch(
      handleChangeAction({
        name,
        value: selectedOption ? selectedOption.value : "",
      })
    );
  };

  const updateShipmentField = (fieldName) => (selectedOption) => {
    dispatch(
      handleChangeAction({
        name: fieldName,
        value: selectedOption ? selectedOption.value : "",
      })
    );

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

  const paymentTypeOptions = [
    { label: "Sender", value: "SENDER" },
    { label: "Receiver", value: "RECIPIENT" },
    { label: "Third Party", value: "THIRD_PARTY" },
    { label: "Collect", value: "COLLECT" },
  ];

  const TermOfSaleOptions = [
    {
      label: "Free On Board Origin",
      value: "FOB",
    },
    {
      label: "CIF Destination",
      value: "CIF",
    },
    {
      label: "Ex Works",
      value: "EXW",
    },
    {
      label: "Free Carrier",
      value: "FCA",
    },
    {
      label: "Carriage Paid To",
      value: "CPT",
    },
    {
      label: "Carriage and Insurance Paid",
      value: "CIP",
    },
    {
      label: "Delivered At Place",
      value: "DAP",
    },
    {
      label: "Delivered Under Promise",
      value: "DPU",
    },
    {
      label: "Delivered Duty Paid",
      value: "DDP",
    },
    {
      label: "Cost and Freight",
      value: "CFR",
    },
  ];

  const [resultData, setResultData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleShipment = async () => {
    try {
      setLoading(true);
      const serviceTypes =
        ShipmentData.senderCountry !== ShipmentData.recipientsCountry
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

      let results = [];

      for (const serviceType of serviceTypes) {
        try {
          const response = await CreateShipment({
            userId: user?.userid,
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
            serviceType: serviceType,
            packagingType: ShipmentData.packagingType,
            paymentType: ShipmentData.paymentType,
            totalWeight: ShipmentData.totalWeight,
            totalPackages: ShipmentData.totalPackages,

            ...(ShipmentData.senderCountry !==
              ShipmentData.recipientsCountry && {
              totalAmount: ShipmentData.totalAmount,
              totalCurrency: ShipmentData.totalCurrency,
              unitPriceAmount: ShipmentData.unitPriceAmount,
              unitPriceCurrency: ShipmentData.unitPriceCurrency,
              commodityDescription: ShipmentData.commodityDescription,
              commodityQuantity: ShipmentData.commodityQuantity,
              commodityQuantityUnits: ShipmentData.commodityQuantityUnits,
              commodityCountryOfManufacture:
                ShipmentData.commodityCountryOfManufacture,
              shipmentPurpose: ShipmentData.shipmentPurpose,
              dutiesPaymentType: ShipmentData.dutiesPaymentType,
              termsOfSale: ShipmentData.termsOfSale,
            }),

            packages: ShipmentData.packages.map((pkg) => ({
              weightValue: pkg.weight,
              weightUnits: pkg.weightUnit,
              length: pkg.length,
              width: pkg.width,
              height: pkg.height,
              units: pkg.units,
            })),
          });
          results.push({
            data: response.data || null,
          });
        } catch (error) {
          console.error(`Error fetching data for ${serviceType}:`, error);
          results.push({
            data: null,
          });
        }
      }

      setResultData(results);
    } catch (error) {
      console.error("Unexpected error:", error);
      setResultData(null);
    } finally {
      setLoading(false);
    }
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const [errors, setErrors] = useState({});

  const validateForm = (section) => {
    const addressField = {
      senderPersonName: "Contact name is required",
      senderPhoneNumber: "Phone number is required",
      senderAddress: "Address is required",
      senderCity: "City is required",
      senderCountry: "Country is required",
      senderPostalCode: "Postal code is required",
      senderStateOrProvinceCode: "State is required",
      recipientsPersonName: "Contact name is required",
      recipientsPhoneNumber: "Phone number is required",
      recipientsAddress: "Address is required",
      recipientsCity: "City is required",
      recipientsStateOrProvinceCode: "State is required",
      recipientsCountry: "Country is required",
      recipientsPostalCode: "Postal code is required",
      recipientsEmail: "Invalid email format",
      senderEmail: "Invalid email format",
    };

    const packageField = {
      packagingType: "Packaging type is required",
      packagesNo: "Number of packages is required",
      weight: "Weight is required",
      weightUnit: "Weight unit is required",
      length: "Length is required",
      width: "Width is required",
      height: "Height is required",
      units: "Unit is required",
    };

    const tempErrors = {};
    let fieldsToValidate = {};

    if (section === 1) {
      fieldsToValidate = addressField;
    } else if (section === 2) {
      fieldsToValidate = packageField;
    }

    Object.entries(fieldsToValidate).forEach(([field, message]) => {
      let value;
      if (
        section === 2 &&
        ShipmentData.packages &&
        ShipmentData.packages.length > 0
      ) {
        value =
          field === "packagingType"
            ? ShipmentData[field]
            : ShipmentData.packages[0][field];
      } else {
        value = ShipmentData[field];
      }

      if (!value?.trim()) {
        tempErrors[field] = message;
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const nextSection = () => {
    const nextSectionNum = currentSection + 1;
    if (validateForm(currentSection)) {
      setCurrentSection(nextSectionNum);
      if (currentSection === 2) {
        handleShipment();
      }
    } else {
      console.log("Form has errors");
    }
  };

  const handleSave = async () => {
    try {
      if (ShipmentData.isEdit === true) {
        const res = await EditShipment({
          shipmentId: ShipmentData.shipmentId,
          ShipmentData,
        });
        console.log(res.data);
      } else {
        const res = await SavaShipmentData(ShipmentData);
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetForm = () => {
    dispatch(resetState());
  };

  const PickUpOption = [
    {
      value: "DROPOFF_AT_FEDEX_LOCATION",
      label: "Drop off at FedEx location",
    },
    {
      value: "CONTACT_FEDEX_TO_SCHEDULE",
      label: "Contact FedEx to schedule pickup",
    },
    {
      value: "USE_SCHEDULED_PICKUP",
      label: "Use scheduled pickup",
    },
  ];

  const token = async () => {
    try {
      if (!user.userid) {
        console.log("User id not found please login");
        return;
      }
      navigate("/");
      const res = await getToken({
        data: user?.userid,
      });
      if (res?.data?.data) {
        localStorage.setItem("fedex_token", JSON.stringify(res.data.data));
      }
    } catch (error) {
      console.log("somting went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("fedex_token")) token();
  }, []);

  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>
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
                <button onClick={handleSave} className="btn text-primary me-3">
                  SAVE
                </button>
                <button
                  onClick={handleResetForm}
                  className="btn text-primary me-3"
                >
                  RESET FORM
                </button>
                <button className="btn text-primary me-3">
                  SAVE AS SHIPMENT PROFILE
                </button>
                <button className="btn text-primary">VIEWS</button>
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
                        {errors.senderPersonName && (
                          <div className="text-danger">
                            {errors.senderPersonName}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={ShipmentData.senderCountry?.toLowerCase()}
                          value={ShipmentData.senderPhoneNumber}
                          onChange={(value) =>
                            dispatch(
                              setShipmentData({
                                senderPhoneNumber: value,
                              })
                            )
                          }
                          inputClass="form-control"
                          name="senderPhoneNumber"
                        />
                        {errors.senderPhoneNumber && (
                          <div className="text-danger">
                            {errors.senderPhoneNumber}
                          </div>
                        )}
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
                        {errors.senderEmail && (
                          <div className="text-danger">
                            {errors.senderEmail}
                          </div>
                        )}
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
                        {errors.senderCountry && (
                          <div className="text-danger">
                            {errors.senderCountry}
                          </div>
                        )}
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
                        {errors.senderAddress && (
                          <div className="text-danger">
                            {errors.senderAddress}
                          </div>
                        )}
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
                        {errors.senderPostalCode && (
                          <div className="text-danger">
                            {errors.senderPostalCode}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <Select
                          options={stateOptions}
                          placeholder="Select State"
                          value={stateOptions.find(
                            (option) =>
                              option.value ===
                              ShipmentData.senderStateOrProvinceCode
                          )}
                          onChange={handleSenderStateChange}
                        />
                        {errors.senderStateOrProvinceCode && (
                          <div className="text-danger">
                            {errors.senderStateOrProvinceCode}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <Select
                          options={cityOptions}
                          placeholder="Select City *"
                          value={cityOptions.find(
                            (option) => option.value === ShipmentData.senderCity
                          )}
                          onChange={handleSenderCityChange}
                        />
                        {errors.senderCity && (
                          <div className="text-danger">{errors.senderCity}</div>
                        )}
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
                      <hr className="my-4 border-3 border-primary" />
                    </div>
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
                        {errors.recipientsPersonName && (
                          <div className="text-danger">
                            {errors.recipientsPersonName}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={ShipmentData.recipientsCountry?.toLowerCase()}
                          value={ShipmentData.recipientsPhoneNumber}
                          onChange={(value) =>
                            dispatch(
                              setShipmentData({
                                recipientsPhoneNumber: value,
                              })
                            )
                          }
                          inputClass="form-control"
                        />
                        {errors.recipientsPhoneNumber && (
                          <div className="text-danger">
                            {errors.recipientsPhoneNumber}
                          </div>
                        )}
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
                        {errors.recipientsEmail && (
                          <div className="text-danger">
                            {errors.recipientsEmail}
                          </div>
                        )}
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
                        {errors.recipientsCountry && (
                          <div className="text-danger">
                            {errors.recipientsCountry}
                          </div>
                        )}
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
                        {errors.recipientsAddress && (
                          <div className="text-danger">
                            {errors.recipientsAddress}
                          </div>
                        )}
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
                        {errors.recipientsPostalCode && (
                          <div className="text-danger">
                            {errors.recipientsPostalCode}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <Select
                          options={stateOptions}
                          placeholder="Select State"
                          value={stateOptions.find(
                            (option) =>
                              option.value ===
                              ShipmentData.recipientsStateOrProvinceCode
                          )}
                          onChange={handleSelectState}
                        />
                        {errors.recipientsStateOrProvinceCode && (
                          <div className="text-danger">
                            {errors.recipientsStateOrProvinceCode}
                          </div>
                        )}
                      </div>
                      <div className="mb-2">
                        <Select
                          options={cityOptions}
                          placeholder="Select City *"
                          name="recipientsCity"
                          value={cityOptions.find(
                            (option) =>
                              option.value === ShipmentData.recipientsCity
                          )}
                          onChange={handleCityChange}
                        />
                        {errors.recipientsCity && (
                          <div className="text-danger">
                            {errors.recipientsCity}
                          </div>
                        )}
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="residentialAddress"
                          name="recipientsIsResidential"
                          checked={ShipmentData.recipientsIsResidential}
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
                          name="recipientsIsSave"
                          checked={ShipmentData.recipientsIsSave}
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
                    </div>
                  </>
                )}

                {/* Package detail section */}
                {currentSection === 2 && (
                  <div>
                    {ShipmentData.senderCountry !==
                      ShipmentData.recipientsCountry && (
                      <div className="mb-3">
                        <h5 className="mb-3 fw-bold text-primary">
                          <i className="fa fa-check-circle"></i> What are you
                          shipping?
                        </h5>
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
                                value={ShipmentData.unitPriceAmount}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                              />
                              <select
                                name="unitPriceCurrency"
                                className="form-select"
                                value={ShipmentData.unitPriceCurrency || "USD"}
                                onChange={(e) => handleChange(e)}
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
                              Total Amount{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                              <input
                                type="number"
                                name="totalAmount"
                                className="form-control"
                                value={ShipmentData.totalAmount}
                                onChange={handleChange}
                                placeholder="0"
                                step="1"
                                min="0"
                              />
                              <select
                                name="totalCurrency"
                                className="form-select"
                                value={ShipmentData.totalCurrency || "USD"}
                                onChange={(e) => handleChange(e)}
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
                                name="commodityQuantity"
                                className="form-control"
                                value={ShipmentData.commodityQuantity}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                              />
                              <select
                                name="commodityQuantityUnits"
                                className="form-select"
                                value={
                                  ShipmentData.commodityQuantityUnits || ""
                                }
                                onChange={(e) => handleChange(e)}
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
                                  ShipmentData.commodityCountryOfManufacture
                              )}
                              onChange={handleDropdownChange}
                              name="commodityCountryOfManufacture"
                            />
                          </div>
                          <div className="col-md-6">
                            <Select
                              options={paymentTypeOptions}
                              placeholder="Select Duties Payment Type"
                              value={paymentTypeOptions.find(
                                (option) =>
                                  option.value ===
                                  ShipmentData.dutiesPaymentType
                              )}
                              onChange={handleDropdownChange}
                              name="dutiesPaymentType"
                            />
                          </div>
                        </div>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <Select
                              options={shipmentPurposeOptions}
                              placeholder="Select purpose"
                              value={shipmentPurposeOptions.find(
                                (option) =>
                                  option.value === ShipmentData.shipmentPurpose
                              )}
                              onChange={handleDropdownChange}
                              name="shipmentPurpose"
                            />
                          </div>
                          <div className="col-md-6">
                            <Select
                              options={TermOfSaleOptions}
                              placeholder="Select terms"
                              value={TermOfSaleOptions.find(
                                (option) =>
                                  option.value === ShipmentData.termsOfSale
                              )}
                              onChange={handleDropdownChange}
                              name="termsOfSale"
                            />
                          </div>
                        </div>
                        <div className="my-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter item description"
                            name="commodityDescription"
                            value={ShipmentData.commodityDescription}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                    <h5 className="fw-bold text-primary">
                      <i className="fa fa-check-circle"></i> Package details
                    </h5>
                    <p className="fs-5">What type of packaging will be used?</p>
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
                      {errors.packagingType && (
                        <div className="text-danger">
                          {errors.packagingType}
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <label className="form-label fw-bold">Pickup *</label>
                      <select
                        onChange={handleSelectChange}
                        name="pickupType"
                        value={ShipmentData.pickupType}
                        className="form-control"
                      >
                        {PickUpOption.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.pickupType && (
                        <div className="text-danger">{errors.pickupType}</div>
                      )}
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
                            {errors.packagesNo && (
                              <div className="text-danger">
                                {errors.packagesNo}
                              </div>
                            )}
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
                            {errors.weight && (
                              <div className="text-danger">{errors.weight}</div>
                            )}
                            {errors.weightUnit && (
                              <div className="text-danger">
                                {errors.weightUnit}
                              </div>
                            )}
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
                            {errors.length && (
                              <div className="text-danger">{errors.length}</div>
                            )}
                            {errors.width && (
                              <div className="text-danger">{errors.width}</div>
                            )}
                            {errors.height && (
                              <div className="text-danger">{errors.height}</div>
                            )}
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
                            {errors.units && (
                              <div className="text-danger">{errors.units}</div>
                            )}
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
                      <div>
                        {resultData?.map((item, index) => {
                          const deliveryDatestamp =
                            item?.data?.data?.transactionShipments?.[0]
                              ?.pieceResponses?.[0]?.deliveryDatestamp;
                          const totalCharge =
                            item?.data?.data?.transactionShipments?.[0]
                              ?.pieceResponses?.[0]?.netRateAmount;

                          const totalNetFedExCharge =
                            item?.data?.data?.transactionShipments?.[0]
                              ?.completedShipmentDetail?.shipmentRating
                              ?.shipmentRateDetails?.[0].totalNetFedExCharge;

                          const serviceTypeLabels = {
                            INTERNATIONAL_FIRST: "International First",
                            FEDEX_INTERNATIONAL_PRIORITY:
                              "FedEx International Priority",
                            FEDEX_INTERNATIONAL_PRIORITY_EXPRESS:
                              "FedEx International Priority Express",
                            INTERNATIONAL_ECONOMY: "International Economy",
                            FEDEX_INTERNATIONAL_GROUND:
                              "FedEx International Ground",
                            FEDEX_GROUND: "FedEx Ground",
                            FEDEX_2_DAY: "FedEx 2 Day",
                            FEDEX_2_DAY_AM: "FedEx 2 Day AM",
                            FEDEX_EXPRESS_SAVER: "FedEx Express Saver",
                            STANDARD_OVERNIGHT: "Standard Overnight",
                          };

                          const serviceType =
                            serviceTypeLabels[
                              item?.data?.data?.ShipmentInfo?.serviceType
                            ] || "Unknown Service";

                          return (
                            <div>
                              {item?.data?.data && (
                                <div
                                  key={index}
                                  className="my-3 d-flex justify-content-between border p-3"
                                >
                                  <div className="d-flex flex-column">
                                    {deliveryDatestamp &&
                                      format(
                                        new Date(deliveryDatestamp),
                                        "MMMM dd, yyyy hh:mm a"
                                      )}
                                    <span>{serviceType}</span>
                                  </div>
                                  <div>
                                    $
                                    {totalCharge
                                      ? totalCharge
                                      : totalNetFedExCharge}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
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
