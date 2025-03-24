import React, { useEffect, useState } from "react";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import LogisticHeader from "../Components/LogisticHeader";
import axios from "axios";
import { format } from "date-fns";
import { setShipmentData } from "../Redux/Slices/ShipmentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ShipmentList = () => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchShipmentList = async () => {
    try { 
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipmentList/list`,
        { userId: user.userid, search: debouncedSearch }
      );
      console.log("Fetched Shipment List:", res?.data?.data);
      setList(res?.data?.data || []);
    } catch (error) {
      console.log("Error fetching shipment list:", error);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    fetchShipmentList();
  }, [debouncedSearch]);

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    console.log("Select All Clicked:", isChecked);
    setSelectAll(isChecked);
    setSelected(isChecked ? list.map((item) => item._id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      console.log("New Selected Items:", newSelected);
      setSelectAll(newSelected.length === list.length);
      return newSelected;
    });
  };

  const handleClearSelection = () => {
    setSelected([]);
    setSelectAll(false);
    console.log("Selection Cleared");
  };

  const handleEdit = () => {
    if (selected.length > 0) {
      const shipment = list.find((item) => item._id === selected[0]);
      if (shipment && shipment.ShipmentInfo) {
        const mappedData = {
          recipientsPersonName: shipment.ShipmentInfo.recipientPersonName,
          recipientsPhoneNumber: shipment.ShipmentInfo.recipientPhoneNumber,
          packages: shipment.ShipmentInfo.packages,
        };
        dispatch(setShipmentData(mappedData));
        navigate("/shipping");
      } else {
        console.error("No ShipmentInfo found for selected shipment");
      }
    }
  };

  const handleDelete = async () => {
    if (selected.length === 0) return;

    try {
      const shipmentIdsString = selected.join(", ");
      console.log("Deleting IDs:", shipmentIdsString);
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/fedex/shipmentList/delete`,
        { data: { id: shipmentIdsString } }
      );
      if (res.data) {
        await fetchShipmentList();
        setSelected([]);
        setSelectAll(false);
      } else {
        console.error("Delete operation failed:", res.data);
      }
    } catch (error) {
      console.error("Error deleting shipments:", error);
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
          {selected.length > 0 ? (
            <div className="d-flex justify-content-between align-items-center mb-3 p-2">
              <div className="d-flex gap-2">
                <button className="btn">
                  {selected.length} SHIPMENT SELECTED
                </button>
                <button onClick={handleEdit} className="btn">
                  EDIT
                </button>
                <button className="btn">REPEAT</button>
                <button className="btn">APPLY SHIPMENT PROFILE</button>
                <button onClick={handleDelete} className="btn">
                  CANCEL
                </button>
                <button className="btn" onClick={handleClearSelection}>
                  CLEAR SELECTION
                </button>
                <button className="btn">DOWNLOAD</button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between align-items-center mb-3 p-2">
              <div className="d-flex flex-column">
                <span>Viewing </span>
                <strong>
                  {list?.length}/{list?.length} Shipments
                </strong>
              </div>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search *"
                  name="senderPersonName"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                <th>SHIP DATE</th>
                <th>RECIPIENT</th>
                <th>STATUS</th>
                <th>TRACKING ID</th>
                <th>SHIPMENT TYPE</th>
                <th>REFERENCE</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selected.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td>{format(new Date(item.createdAt), "MMMM dd, yyyy")}</td>
                  <td>{item.ShipmentInfo?.recipientPersonName}</td>
                  <td>{item.status}</td>
                  <td>{item.transactionShipments?.masterTrackingNumber}</td>
                  <td>FedEx Express</td>
                  <td>{item.ShipmentInfo?.reference}</td>
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
