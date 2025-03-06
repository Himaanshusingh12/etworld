import React, { useState } from "react";
import SubuserHeader from "../Components/SubuserHeader";
import SubuserSidepanel from "../Components/SubuserSidepanel";

function ShippingRate() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    packaging: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [packages, setPackages] = useState([
    { id: 1, weight: 0, packageCount: 1 },
  ]);

  const addPackage = () => {
    setPackages([
      ...packages,
      { id: packages.length + 1, weight: 0, packageCount: 1 },
    ]);
  };

  const handlePackageChange = (index, field, value) => {
    const newPackages = [...packages];
    if (field === "weight") {
      newPackages[index].weight = value;
    } else if (field === "packageCount") {
      newPackages[index].packageCount = value;
    }
    setPackages(newPackages);
  };

  const removePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const totalWeight = packages.reduce(
    (total, pkg) => total + Number(pkg.weight),
    0
  );
  // const totalPackages = packages.length;
  const totalPackages = packages.reduce(
    (total, pkg) => total + Number(pkg.packageCount),
    0
  );

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format dates to "Monday, February 24, 2025"
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get values in YYYY-MM-DD format for storing in the database
  const todayValue = today.toISOString().split("T")[0];
  const tomorrowValue = tomorrow.toISOString().split("T")[0];

  return (
    <>
      <SubuserHeader />
      <div className="d-flex">
        <SubuserSidepanel />
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
          <h1 className="h4 mb-4">Calculate Et World shipping rates</h1>
          <form className="w-100" style={{ maxWidth: 600 }}>
            <div className="mb-3">
              <label htmlFor="from" className="form-label">
                From*
              </label>
              <input
                type="text"
                className="form-control"
                name="from"
                id="from"
                value={formData.from}
                onChange={handleChange}
                placeholder
              />
            </div>
            <div className="mb-4">
              <label htmlFor="to" className="form-label">
                To*
              </label>
              <input
                type="text"
                className="form-control"
                name="to"
                id="to"
                value={formData.to}
                onChange={handleChange}
                placeholder
              />
            </div>
            {/* second section */}
            {formData.from && formData.to && (
              <>
                <div className="mb-4">
                  <h2 className="h5 mb-3">Tell us more about your shipment</h2>
                  <div className="mb-4">
                    <label htmlFor="packaging" className="form-label">
                      Packaging*
                    </label>
                    <select
                      className="form-select"
                      id="packaging"
                      name="packaging"
                      value={formData.packaging}
                      onChange={handleChange}
                    >
                      <option value="">Your Packaging</option>
                      <option value="box">Et World 10kg Box</option>
                      <option value="envelope">Et World 20kg Box</option>
                      <option value="pallet">Et World</option>
                      <option value="tube">Et World Envelope</option>
                      <option value="tube">Et World Pak</option>
                      <option value="tube">Et World Tube</option>
                    </select>
                    <div className="mt-2 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="higherLiability"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="higherLiability"
                      >
                        Purchase a higher limit of liability from Et World
                      </label>
                    </div>
                  </div>
                </div>

                {/* third section */}
                <div className="mb-4">
                  <h2 className="h5 mb-3">Package Details</h2>

                  {/* Labels (Appear Once) */}
                  <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                      <label className="form-label">Packages*</label>
                    </div>
                    <div className="flex-grow-1">
                      <label className="form-label">Package Weight*</label>
                    </div>
                    <div className="flex-grow-1">
                      <label className="form-label">
                        Dimensions (L × W × H)*
                      </label>
                    </div>
                  </div>

                  {/* Repeating Input Fields */}
                  {packages.map((pkg, index) => (
                    <div className="d-flex gap-3 mb-3" key={pkg}>
                      {/* Packages Input */}
                      <div className="flex-grow-1">
                        <input
                          type="number"
                          className="form-control"
                          value={pkg.packageCount}
                          onChange={(e) =>
                            handlePackageChange(
                              index,
                              "packageCount",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      {/* Package Weight with Dropdown */}
                      <div className="flex-grow-1">
                        <div className="input-group">
                          <input
                            type="number"
                            className="form-control"
                            value={pkg.weight}
                            onChange={(e) =>
                              handlePackageChange(
                                index,
                                "weight",
                                e.target.value
                              )
                            }
                          />
                          <select className="form-select">
                            <option value="kg">kg</option>
                            <option value="lb">lb</option>
                          </select>
                        </div>
                      </div>

                      {/* Dimensions with Dropdown */}
                      <div className="flex-grow-1">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                          />
                          <select className="form-select">
                            <option value="cm">cm</option>
                            <option value="in">in</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        {index > 0 && (
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => removePackage(index)}
                          >
                            <i className="fas fa-times text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Another Package Button */}
                  <button
                    type="button"
                    className="btn btn-outline-primary mt-3"
                    onClick={addPackage}
                  >
                    + Add another package
                  </button>
                </div>
                <hr />
                <div className="mb-4 d-flex">
                  <h6 className="mb-0">
                    Total Packages:{" "}
                    <span className="text-primary">{totalPackages}</span>
                  </h6>
                  <h6 className="mb-0 ms-5">
                    Total Weight:{" "}
                    <span className="text-primary">{totalWeight} kg</span>
                  </h6>
                </div>

                {/* <div className="mt-4">
                  <h2 className="h5 mt-5">When do you want to ship?</h2>
                  <label htmlFor="shipDate" className="form-label">
                    Ship Date*
                  </label>
                  <select
                    className="form-select"
                    id="shipDate"
                    name="shipDate"
                    value={formData.shipDate}
                    onChange={(e) => setShipDate(e.target.value)}
                  >
                    <option value={today}>{today}</option>
                    <option value={tomorrowDate}>{tomorrowDate}</option>
                  </select>
                </div> */}

                {/* new one */}
                <div className="mt-4">
                  <h2 className="h5 mt-5">When do you want to ship?</h2>
                  <label htmlFor="shipDate" className="form-label">
                    Ship Date*
                  </label>
                  <select
                    className="form-select"
                    id="shipDate"
                    name="shipDate"
                    value={formData.shipDate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        shipDate: e.target.value,
                      }))
                    }
                  >
                    <option value={todayValue}>{formatDate(today)}</option>
                    <option value={tomorrowValue}>
                      {formatDate(tomorrow)}
                    </option>
                  </select>
                </div>

                <div className="mt-4 d-flex justify-content-center">
                  <button type="button" className="btn btn-primary">
                    Show Rate
                  </button>
                </div>
              </>
            )}
          </form>
          <h2 className="h5 mt-4">Why ship with Et World ?</h2>
          <div
            className="bg-light p-4 rounded shadow-sm w-100"
            style={{ maxWidth: 600 }}
          >
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="fas fa-globe-americas text-primary fs-4 me-3" />
                <div>
                  <h3 className="h6 fw-bold">WORLDWIDE COVERAGE</h3>
                  <p className="mb-0">
                    You can send small, big, expedited and less urgent shipments
                    to over 220 countries and territories.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="fas fa-box-open text-primary fs-4 me-3" />
                <div>
                  <h3 className="h6 fw-bold">COMPLIMENTARY PACKAGING</h3>
                  <p className="mb-0">
                    Need envelopes or boxes? Get complimentary packaging* by
                    just signing up and opening an account.
                  </p>
                  <p className="small text-muted">
                    *Complimentary FedEx packaging available for shipments using
                    FedEx expedited, FedEx Express Saver or FedEx International
                    Economy services.
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-start">
                <i className="fas fa-tools text-primary fs-4 me-3" />
                <div>
                  <h3 className="h6 fw-bold">SMART TOOLS</h3>
                  <p className="mb-0">
                    Our tools put you in control – from real-time tracking
                    updates to flexible delivery options, you decide exactly how
                    you want to ship.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex align-items-start">
                <i className="fas fa-shipping-fast text-primary fs-4 me-3" />
                <div>
                  <h3 className="h6 fw-bold">SPEEDY CUSTOMS CLEARANCE</h3>
                  <p className="mb-0">
                    Your shipment will be ready to get through customs swiftly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShippingRate;
