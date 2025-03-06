import React from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Country } from "country-state-city";
import { useState } from "react";

function Shipping() {
  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const [senderCountry, setSenderCountry] = useState(null);
  const [senderPhone, setSenderPhone] = useState("");

  const [receiverCountry, setReceiverCountry] = useState(null);
  const [receiverPhone, setReceiverPhone] = useState("");

  // Receiver Country Change
  const handleReceiverCountryChange = (selectedOption) => {
    setReceiverCountry(selectedOption);
    setReceiverPhone(`+${selectedOption.code}`);
  };

  // Sender Country Change
  const handleSenderCountryChange = (selectedOption) => {
    setSenderCountry(selectedOption);
    setSenderPhone(`+${selectedOption.code}`);
  };

  const [currentSection, setCurrentSection] = useState(1);

  // Function to go to the next step
  const nextSection = () => {
    setCurrentSection((prev) => prev + 1);
  };

  // for add duplicate row of packanges
  const [packages, setPackages] = useState([
    { id: 1, weight: "", length: "", width: "", height: "" },
  ]);

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        id: packages.length + 1,
        weight: "",
        length: "",
        width: "",
        height: "",
      },
    ]);
  };

  const deletePackage = (index) => {
    if (packages.length > 1) {
      const updatedPackages = packages.filter((_, i) => i !== index);
      setPackages(updatedPackages);
    }
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
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tax ID/EORI Number"
                        />
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={receiverCountry?.value?.toLowerCase()}
                          value={receiverPhone}
                          onChange={(value) => setReceiverPhone(value)}
                          inputClass="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Extension"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <h6>Address</h6>
                      <div className="mb-2">
                        <Select
                          options={countryOptions}
                          placeholder="Select Country/Territory"
                          onChange={handleReceiverCountryChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1 *"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 2"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 3"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal Code"
                        />
                      </div>
                      <div className="mb-2">
                        <select className="form-select">
                          <option selected>City *</option>
                        </select>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="residentialAddress"
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
                      <hr class="my-4 border-3 border-primary" />
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
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Company"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tax ID/EORI Number"
                        />
                      </div>
                      <div className="mb-2">
                        <PhoneInput
                          country={senderCountry?.value?.toLowerCase()}
                          value={senderPhone}
                          onChange={(value) => setSenderPhone(value)}
                          inputClass="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Extension"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <h6>Address</h6>
                      <div className="mb-2">
                        <Select
                          options={countryOptions}
                          placeholder="Select Country/Territory"
                          onChange={handleSenderCountryChange}
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 1 *"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 2"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address Line 3"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Postal Code"
                        />
                      </div>
                      <div className="mb-2">
                        <select className="form-select">
                          <option selected>City *</option>
                        </select>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="residentialAddress"
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
                  // <div>
                  //   <h5 className="fw-bold text-primary">
                  //     <i className="fa fa-check-circle"></i> Package details
                  //   </h5>
                  //   <p className="fs-5">What type of packaging will be used?</p>

                  //   <div className="mb-3">
                  //     <label className="form-label fw-bold">Packaging *</label>
                  //     <select className="form-control">
                  //       <option selected>Your Packaging</option>
                  //     </select>
                  //   </div>

                  //   <div className="form-check mb-3">
                  //     <input
                  //       className="form-check-input"
                  //       type="checkbox"
                  //       id="liabilityCheck"
                  //     />

                  //     <label
                  //       className="form-check-label"
                  //       htmlFor="residentialAddress"
                  //     >
                  //       Purchase a higher limit of liability from Et World
                  //       <i className="fa fa-info-circle"></i>
                  //     </label>
                  //   </div>

                  //   <div className="row align-items-end g-2 mb-3">
                  //     <div className="col-md-2">
                  //       <label className="form-label fw-bold">Packages *</label>
                  //       <input
                  //         type="number"
                  //         className="form-control"
                  //         defaultValue="1"
                  //       />
                  //     </div>

                  //     <div className="col-md-3">
                  //       <label className="form-label fw-bold">Weight *</label>
                  //       <div className="input-group">
                  //         <input
                  //           type="number"
                  //           className="form-control"
                  //           placeholder="0"
                  //         />
                  //         <select className="form-select p-0">
                  //           <option>kg</option>
                  //           <option>lbs</option>
                  //         </select>
                  //       </div>
                  //     </div>

                  //     <div className="col-md-5">
                  //       <label className="form-label fw-bold">
                  //         Dimensions (L × W × H)
                  //       </label>
                  //       <div className="input-group">
                  //         <input
                  //           type="number"
                  //           className="form-control"
                  //           placeholder="L"
                  //         />
                  //         <span className="input-group-text">×</span>
                  //         <input
                  //           type="number"
                  //           className="form-control"
                  //           placeholder="W"
                  //         />
                  //         <span className="input-group-text">×</span>
                  //         <input
                  //           type="number"
                  //           className="form-control"
                  //           placeholder="H"
                  //         />
                  //       </div>
                  //     </div>

                  //     <div className="col-md-2">
                  //       <label className="form-label fw-bold">&nbsp;</label>
                  //       <select className="form-select">
                  //         <option>cm</option>
                  //         <option>in</option>
                  //       </select>
                  //     </div>
                  //   </div>

                  //   <a href="#" className="text-primary d-block mb-3">
                  //     ADD PACKAGE OPTIONS
                  //   </a>

                  //   <p className="fw-bold">Total packages: 1</p>
                  //   <a href="#" className="text-primary d-block mb-4">
                  //     + ADD PACKAGE
                  //   </a>
                  // </div>
                  <div>
                    <h5 className="fw-bold text-primary">
                      <i className="fa fa-check-circle"></i> Package details
                    </h5>
                    <p className="fs-5">What type of packaging will be used?</p>

                    <div className="mb-3">
                      <label className="form-label fw-bold">Packaging *</label>
                      <select className="form-control">
                        <option selected>Your Packaging</option>
                        <option selected>Your Packaging</option>
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
                    {packages.map((pkg, index) => (
                      <div key={index}>
                        <div className="row align-items-end g-2 mb-3">
                          <div className="col-md-2">
                            <label className="form-label fw-bold">
                              {index === 0 ? "Packages *" : ""}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={pkg.id}
                              onChange={(e) => {
                                const updatedPackages = [...packages];
                                updatedPackages[index].id = e.target.value;
                                setPackages(updatedPackages);
                              }}
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
                                className="form-control"
                                placeholder="0"
                              />
                              <select className="form-select p-0">
                                <option>kg</option>
                                <option>lbs</option>
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
                                className="form-control"
                                placeholder="L"
                              />
                              <span className="input-group-text">×</span>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="W"
                              />
                              <span className="input-group-text">×</span>
                              <input
                                type="number"
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
                            <select className="form-select">
                              <option>cm</option>
                              <option>in</option>
                            </select>
                          </div>

                          {index !== 0 && (
                            <div className="col-md-2">
                              <button
                                className="btn btn-danger mt-3"
                                onClick={() => deletePackage(index)}
                              >
                                *
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

                    <p className="fw-bold">Total packages: {packages.length}</p>
                  </div>
                )}

                {/* third section */}
                {currentSection === 3 && (
                  <div>
                    <h3>Third Section Content</h3>
                    {/* Content for the third section goes here */}
                    <p>This is the content for the third section.</p>
                  </div>
                )}

                <button className="btn btn-primary w-100" onClick={nextSection}>
                  NEXT
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
