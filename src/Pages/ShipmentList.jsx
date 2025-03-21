import React, { useState } from "react";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import LogisticHeader from "../Components/LogisticHeader";
import { useSelector } from "react-redux";

const ShipmentList = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);

  const ShipmentList = useSelector((state) => state.ShipmentList);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelected(isChecked ? ShipmentList.shipmentList.map((s) => s.id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <>
      <LogisticHeader />
      <div className="d-flex">
        <div className="flex-shrink-0">
          <LogisticSidepanel />
        </div>

        <div className="container mt-4">
          {selected.length > 0 ? (
            <div className="d-flex justify-content-between align-items-center mb-3 p-2">
              <div className="d-flex gap-2">
                <button className="btn">Selected Shipment</button>
                <button className="btn">Edit</button>
                <button className="btn">Repeat</button>
                <button className="btn">Apply</button>
                <button className="btn">Shipment</button>
                <button className="btn">Profile</button>
                <button className="btn">Cancel</button>
                <button className="btn">Clear</button>
                <button className="btn">Selection</button>
                <button className="btn">Download</button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center mb-3 p-2">
              <div className="d-flex flex-column">
                <span>Viewing </span>
                <strong>
                  {ShipmentList?.shipmentList?.length}/
                  {ShipmentList?.shipmentList?.length} Shipments
                </strong>
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search *"
                  name="senderPersonName"
                />
                <button className="btn">
                  <i className="fa fa-search"></i>
                </button>
                <button className="btn d-flex align-items-center gap-2">
                  <i className="fa fa-filter"></i> Filter
                </button>
                <button className="btn d-flex align-items-center gap-2">
                  <i className="fa fa-download"></i> Download
                </button>
                <button className="btn">Manage</button>
              </div>
            </div>
          )}

          <table className="table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Ship Date</th>
                <th>Recipient</th>
                <th>Status</th>
                <th>Shipment Type</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {ShipmentList?.shipmentList?.map((shipment, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selected.includes(shipment.id)}
                      onChange={() => handleCheckboxChange(shipment.id)}
                    />
                  </td>
                  <td>akjsldnf</td>
                  <td>akjsldnf</td>
                  <td>akjsldnf</td>
                  <td>FedEx Express</td>
                  <td>#123456</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShipmentList;
