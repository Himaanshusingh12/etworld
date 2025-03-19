import React, { useState } from "react";
import LogisticHeader from "../Components/LogisticHeader";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import Select from "react-select";
import { Country } from "country-state-city";
import axios from "axios";

const GlobalTradeDocuments = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const countryOptions = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
    code: c.phonecode,
  }));

  const [globalDocuments, setGlobalDocuments] = useState({
    countryCode: "CA",
    recipientsCountry: "SG",
    carrierCode: "FDXE",
  });

  const serviceOptions = [
    {
      label: "FedEx Express",
      value: "FDXE",
    },
    {
      label: "FedEx Ground",
      value: "FDXG",
    },
  ];

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/fedex/global-trade`,
        globalDocuments
      );
      setResult(response.data.data);
    } catch (error) {
      console.error("Error fetching rate:", error);
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
              <h5 className="fw-bold text-primary">
                <i className="fa fa-user-circle"></i> Global Trade Documents
              </h5>
              <h6>Sender Country *</h6>
              <div className="mb-2">
                <Select
                  options={countryOptions}
                  placeholder="Select Country/Territory"
                  value={countryOptions.find(
                    (option) => option.value === globalDocuments.countryCode
                  )}
                  onChange={(option) =>
                    setGlobalDocuments({
                      ...globalDocuments,
                      countryCode: option.value,
                    })
                  }
                />
              </div>
              <h6>Recipient Country *</h6>
              <div className="mb-2">
                <Select
                  options={countryOptions}
                  placeholder="Select Country/Territory"
                  value={countryOptions.find(
                    (option) =>
                      option.value === globalDocuments.recipientsCountry
                  )}
                  onChange={(option) =>
                    setGlobalDocuments({
                      ...globalDocuments,
                      recipientsCountry: option.value,
                    })
                  }
                />
              </div>
              <h6>Service Type *</h6>
              <div className="mb-2">
                <Select
                  options={serviceOptions}
                  placeholder="Select Service Type"
                  value={serviceOptions.find(
                    (option) => option.value === globalDocuments.carrierCode
                  )}
                  onChange={(option) =>
                    setGlobalDocuments({
                      ...globalDocuments,
                      carrierCode: option.value,
                    })
                  }
                />
              </div>

              <div className="d-flex gap-3 my-2">
                <button
                  type="button"
                  onClick={handleClick}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Show Documents"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalTradeDocuments;
