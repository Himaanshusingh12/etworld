import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  userId: user?.userid,
  recipientsPersonName: "Olivia Brown",
  recipientsPhoneNumber: "7897987899",
  recipientsEmail: "meet@gmail.com",
  recipientsCountry: "US",
  recipientsAddress: "456 Cedar Lane",
  recipientsPostalCode: "77002",
  recipientsStateOrProvinceCode: "TX",
  recipientsCity: "Houston",
  recipientsIsResidential: false,
  recipientsIsSave: false,
  senderPersonName: "Meet",
  senderPhoneNumber: "7897986545",
  senderEmail: "meet@gmail.com",
  senderCountry: "US",
  senderAddress: "123 Maple Road",
  senderPostalCode: "02108",
  senderStateOrProvinceCode: "MA",
  senderCity: "Boston",
  senderIsResidential: false,
  senderIsSave: false,
  paymentType: "SENDER",
  serviceType: "FEDEX_2_DAY",
  packagingType: "FEDEX_BOX",
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
  totalWeight: "80",
  totalPackages: "8",
  packages: [
    {
      packagesNo: "8",
      weight: "10",
      weightUnit: "LB",
      length: "10",
      width: "8",
      height: "6",
      units: "IN",
    },
  ],
};

const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShipmentData: (state, action) => {
      state.ShipmentData = { ...state.ShipmentData, ...action.payload };
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
  },
});

export const {
  setShipmentData,
  calculateTotals,
  addPackage,
  deletePackage,
  handleChange,
} = shippingSlice.actions;

export default shippingSlice.reducer;
