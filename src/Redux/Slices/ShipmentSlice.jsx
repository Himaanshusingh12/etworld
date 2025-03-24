import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userId: user?.userid,
  senderPersonName: "",
  senderPhoneNumber: "",
  senderEmail: "",
  senderCountry: "",
  senderAddress: "",
  senderPostalCode: "",
  senderStateOrProvinceCode: "",
  senderCity: "",
  senderIsResidential: false,
  senderIsSave: false,
  recipientsPersonName: "",
  recipientsPhoneNumber: "",
  recipientsEmail: "",
  recipientsCountry: "",
  recipientsAddress: "",
  recipientsPostalCode: "",
  recipientsStateOrProvinceCode: "",
  recipientsCity: "",
  recipientsIsResidential: false,
  recipientsIsSave: false,
  paymentType: "SENDER",
  serviceType: "FEDEX_GROUND",
  packagingType: "YOUR_PACKAGING",
  pickupType: "DROPOFF_AT_FEDEX_LOCATION",
  totalAmount: "",
  totalCurrency: "USD",
  unitPriceAmount: "",
  unitPriceCurrency: "USD",
  commodityDescription: "",
  commodityQuantity: "1",
  commodityQuantityUnits: "LTR",
  commodityCountryOfManufacture: "",
  shipmentPurpose: "",
  dutiesPaymentType: "",
  termsOfSale: "",
  totalWeight: "",
  totalPackages: "",
  packages: [
    {
      packagesNo: "1",
      weight: "",
      weightUnit: "KG",
      length: "",
      width: "",
      height: "",
      units: "CM",
    },
  ],
  isEdit: false,
  shipmentId: null,
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipmentData: (state, action) => {
      return { ...state, ...action.payload };
    },
    calculateTotals: (state) => {
      const totalWeight = state.packages.reduce((sum, pkg) => {
        const packageCount = parseInt(pkg.packagesNo) || 0;
        const packageWeight = parseFloat(pkg.weight) || 0;
        return sum + packageCount * packageWeight;
      }, 0);
      state.totalWeight = totalWeight.toString();
      const totalPackages = state.packages.reduce((sum, pkg) => {
        return sum + (parseInt(pkg.packagesNo) || 0);
      }, 0);
      state.totalPackages = totalPackages.toString();
    },
    addPackage: (state) => {
      state.packages.push({
        packagesNo: "1",
        weight: "",
        weightUnit: "KG",
        length: "",
        width: "",
        height: "",
        units: "CM",
      });
      const totalWeight = state.packages.reduce((sum, pkg) => {
        const packageCount = parseInt(pkg.packagesNo) || 0;
        const packageWeight = parseFloat(pkg.weight) || 0;
        return sum + packageCount * packageWeight;
      }, 0);
      state.totalWeight = totalWeight.toString();
      const totalPackages = state.packages.reduce((sum, pkg) => {
        return sum + (parseInt(pkg.packagesNo) || 0);
      }, 0);
      state.totalPackages = totalPackages.toString();
    },
    deletePackage: (state, action) => {
      if (state.packages.length > 1) {
        state.packages = state.packages.filter((_, i) => i !== action.payload);
        const totalWeight = state.packages.reduce((sum, pkg) => {
          const packageCount = parseInt(pkg.packagesNo) || 0;
          const packageWeight = parseFloat(pkg.weight) || 0;
          return sum + packageCount * packageWeight;
        }, 0);
        state.totalWeight = totalWeight.toString();
        const totalPackages = state.packages.reduce((sum, pkg) => {
          return sum + (parseInt(pkg.packagesNo) || 0);
        }, 0);
        state.totalPackages = totalPackages.toString();
      }
    },
    handleChange: (state, action) => {
      const { name, value, packageIndex } = action.payload;

      if (packageIndex !== undefined && name.startsWith("packages.")) {
        const field = name.split(".")[1];
        state.packages[packageIndex] = {
          ...state.packages[packageIndex],
          [field]: value,
        };
        const totalWeight = state.packages.reduce((sum, pkg) => {
          const packageCount = parseInt(pkg.packagesNo) || 0;
          const packageWeight = parseFloat(pkg.weight) || 0;
          return sum + packageCount * packageWeight;
        }, 0);
        state.totalWeight = totalWeight.toString();
        const totalPackages = state.packages.reduce((sum, pkg) => {
          return sum + (parseInt(pkg.packagesNo) || 0);
        }, 0);
        state.totalPackages = totalPackages.toString();
        return;
      }

      const validFields = [
        "userId",
        "recipientsPersonName",
        "recipientsPhoneNumber",
        "recipientsEmail",
        "recipientsCountry",
        "recipientsAddress",
        "recipientsPostalCode",
        "recipientsStateOrProvinceCode",
        "recipientsCity",
        "recipientsIsResidential",
        "recipientsIsSave",
        "senderPersonName",
        "senderPhoneNumber",
        "senderEmail",
        "senderCountry",
        "senderAddress",
        "senderPostalCode",
        "senderStateOrProvinceCode",
        "senderCity",
        "senderIsResidential",
        "senderIsSave",
        "paymentType",
        "serviceType",
        "packagingType",
        "pickupType",
        "totalAmount",
        "totalCurrency",
        "unitPriceAmount",
        "unitPriceCurrency",
        "commodityDescription",
        "commodityQuantity",
        "commodityQuantityUnits",
        "commodityCountryOfManufacture",
        "shipmentPurpose",
        "dutiesPaymentType",
        "termsOfSale",
        "totalWeight",
        "totalPackages",
        "currentSection",
      ];

      if (validFields.includes(name)) {
        state[name] = value;
      }
    },
    resetState: () => {
      return {
        ...initialState,
        userId: user?.userid,
      };
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload[0];
      state.shipmentId = action.payload[1];
    },
  },
});

export const {
  setShipmentData,
  calculateTotals,
  addPackage,
  deletePackage,
  handleChange,
  resetState,
  setIsEdit,
} = shippingSlice.actions;

export default shippingSlice.reducer;
