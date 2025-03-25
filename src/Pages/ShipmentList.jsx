import React, { useEffect, useState } from "react";
import LogisticSidepanel from "../Components/LogisticSidepanel";
import LogisticHeader from "../Components/LogisticHeader";
import { format } from "date-fns";
import { setIsEdit, setShipmentData } from "../Redux/Slices/ShipmentSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteShipment, getAllUserShipment } from "../AxiosConfig/AxiosConfig";

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
      const res = await getAllUserShipment({
        userId: user.userid,
        search: debouncedSearch,
      });
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
    setSelectAll(isChecked);
    setSelected(isChecked ? list.map((item) => item._id) : []);
  };

  const handleCheckboxChange = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id];
      setSelectAll(newSelected.length === list.length);
      return newSelected;
    });
  };

  const handleClearSelection = () => {
    setSelected([]);
    setSelectAll(false);
  };

  const handleEdit = () => {
    if (selected.length > 0) {
      const shipment = list.find((item) => item._id === selected[0]);
      if (shipment) {
        const mappedData = {
          senderPersonName: shipment.ShipmentInfo.senderPersonName || "",
          senderPhoneNumber: shipment.ShipmentInfo.senderPhoneNumber || "",
          senderEmail: shipment.ShipmentInfo.senderEmail || "",
          senderCountry: shipment.ShipmentInfo.senderCountryCode || "",
          senderAddress: shipment.ShipmentInfo.senderAddress || "",
          senderPostalCode: shipment.ShipmentInfo.senderPostalCode || "",
          senderStateOrProvinceCode:
            shipment.ShipmentInfo.senderStateOrProvinceCode || "",
          senderCity: shipment.ShipmentInfo.senderCity || "",
          senderIsResidential:
            shipment.ShipmentInfo.senderIsResidential || false,
          senderIsSave: shipment.ShipmentInfo.senderIsSave || false,
          recipientsPersonName: shipment.ShipmentInfo.recipientPersonName || "",
          recipientsPhoneNumber:
            shipment.ShipmentInfo.recipientPhoneNumber || "",
          recipientsEmail: shipment.ShipmentInfo.recipientEmail || "",
          recipientsCountry: shipment.ShipmentInfo.recipientCountryCode || "",
          recipientsAddress: shipment.ShipmentInfo.recipientAddress || "",
          recipientsPostalCode: shipment.ShipmentInfo.recipientPostalCode || "",
          recipientsStateOrProvinceCode:
            shipment.ShipmentInfo.recipientStateOrProvinceCode || "",
          recipientsCity: shipment.ShipmentInfo.recipientCity || "",
          recipientsIsResidential:
            shipment.ShipmentInfo.recipientIsResidential || false,
          recipientsIsSave: shipment.ShipmentInfo.recipientIsSave || false,
          paymentType: shipment.ShipmentInfo.paymentType || "SENDER",
          serviceType: shipment.ShipmentInfo.serviceType || "FEDEX_GROUND",
          packagingType:
            shipment.ShipmentInfo.packagingType || "YOUR_PACKAGING",
          pickupType:
            shipment.ShipmentInfo.pickupType || "DROPOFF_AT_FEDEX_LOCATION",
          totalAmount: shipment.ShipmentInfo.totalAmount || "",
          totalCurrency: shipment.ShipmentInfo.totalCurrency || "USD",
          unitPriceAmount: shipment.ShipmentInfo.unitPriceAmount || "",
          unitPriceCurrency: shipment.ShipmentInfo.unitPriceCurrency || "USD",
          commodityDescription:
            shipment.ShipmentInfo.commodityDescription || "",
          commodityQuantity: shipment.ShipmentInfo.commodityQuantity || "1",
          commodityQuantityUnits:
            shipment.ShipmentInfo.commodityQuantityUnits || "LTR",
          commodityCountryOfManufacture:
            shipment.ShipmentInfo.commodityCountryOfManufacture || "",
          shipmentPurpose: shipment.ShipmentInfo.shipmentPurpose || "",
          dutiesPaymentType: shipment.ShipmentInfo.dutiesPaymentType || "",
          termsOfSale: shipment.ShipmentInfo.termsOfSale || "",
          totalWeight: shipment.ShipmentInfo.totalWeight || "",
          totalPackages: shipment.ShipmentInfo.totalPackages || "",
          packages: shipment.ShipmentInfo.packages.map((item) => ({
            packagesNo: item.packagesNo || 1,
            weight: item.weight || "0",
            weightUnit: item.weightUnit || "KG",
            length: item.dimensions?.length || "0",
            width: item.dimensions?.width || "0",
            height: item.dimensions?.height || "0",
            units: item.dimensions?.units || "CM",
          })),
        };
        dispatch(setIsEdit([true, shipment._id]));
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
      const res = await DeleteShipment({ id: shipmentIdsString });
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
                {selected.length === 1 && (
                  <button onClick={handleEdit} className="btn">
                    EDIT
                  </button>
                )}
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
