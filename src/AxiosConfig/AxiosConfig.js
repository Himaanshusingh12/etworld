import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("fedex_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getToken = async (data) => {
  return axiosInstance.post("/api/fedex/token", data);
};

export const PickUp = async (data) => {
  return axiosInstance.post("/api/fedex/pickUp/", data);
};

export const SavaShipmentData = async (data) => {
  return axiosInstance.post("/api/fedex/shipmentList/", data);
};

export const CreateShipment = async (data) => {
  return axiosInstance.post("/api/fedex/shipment/", data);
};

export const DeleteShipment = async (data) => {
  return axiosInstance.delete("/api/fedex/shipmentList/delete/", { data });
};
export const EditShipment = async (data) => {
  return axiosInstance.put("/api/fedex/shipmentList/edit/", data);
};
export const getAllUserShipment = async (data) => {
  return axiosInstance.post("/api/fedex/shipmentList/list/", data);
};

export const getRateAndTransitTime = async (data) => {
  return axiosInstance.post("/api/fedex/rate-transit", data);
};

export const getServicesAndPackagingOptions = async (data) => {
  return axiosInstance.post(
    "/api/fedex/service-availability/PackagingOptions",
    data
  );
};

export const getServicesAndSpecialServiceOptions = async (data) => {
  return axiosInstance.post(
    "/api/fedex/service-availability/SpecialService",
    data
  );
};

export const getGlobalTradeOptions = async (data) => {
  return axiosInstance.post(
    "/api/fedex/service-availability/GlobalTrade",
    data
  );
};

export const CreateOpenShipment = async (data) => {
  return axiosInstance.post("/api/fedex/openShipment", data);
};
