import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Feedback from "./Pages/Feedback";
import LoanCalculator from "./Pages/LoanCalculator";
import VeryfyEmail from "./Pages/VeryfyEmail";
import VerifyyOtp from "./Pages/VerifyOtp";
import Profile from "./Pages/Profile";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsCondition from "./Pages/TermsCondition";
import PNF from "./Pages/PNF";
import ForgetPassword from "./Pages/ForgetPassword";
import Logistic from "./Pages/Logistic";
import PrivateRoute from "./Pages/PrivateRoute";
import FileUpload from "./Pages/FileUpload";
import RefundPolicy from "./Pages/RefundPolicy";
import TrackConsingment from "./Pages/TrackConsingment";
import Shipping from "./Pages/Shipping";
import Request from "./Pages/Request";
import SubuserLogin from "./Pages/SubuserLogin";
import Role from "./Pages/Role";
import AddRole from "./Pages/AddRole";
import ShippingRate from "./SubuserPages/ShippingRate";
import PackageDetails from "./Pages/PackageDetails";
import SchedulePickUp from "./Pages/SchedulePickUp";
import RateAndTransitTime from "./Pages/RateAndTransitTime";
import ServicesAndPackagingOptions from "./Pages/ServicesAndPackagingOptions";
import SpecialServiceOptions from "./Pages/SpecialServiceOptions";
import GlobalTradeDocuments from "./Pages/GlobalTradeDocuments";
import OpenShipment from "./Pages/OpenShipment";
import UploadDocuments from "./Pages/UploadDocuments";
import UploadImage from "./Pages/UploadImage";
import UploadMultipleDocuments from "./Pages/UploadMultipleDocuments";
import ShipmentList from "./Pages/ShipmentList";

function App() {
  const userLogin = Boolean(localStorage.getItem("user"));

  return (
    <>
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <About /> */}
      {/* <Logistic /> */}
      {/* <Footer /> */}
      {/* <Login /> */}
      {/* <SignUp /> */}
      {/* <Feedback/> */}
      {/* <LoanCalculator/> */}
      {/* <VeryfyEmail /> */}
      {/* <VeryfyOtp /> */}
      {/* <ForgetPassword /> */}
      {/* <ChangePassword /> */}
      {/* <Profile /> */}
      {/* <PrivacyPolicy /> */}
      {/* <TermsCondition /> */}
      {/* <FileUpload /> */}
      {/* <RefundPolicy /> */}
      {/* <PNF /> */}
      {/* <TrackConsingment /> */}
      {/* <Shipping /> */}
      {/* <Request/> */}
      {/* <SubuserLogin /> */}
      {/* <SubuserHeader /> */}
      {/* <SubuserSidepanel /> */}
      {/* <Role/> */}
      {/* <AddRole /> */}
      {/* <ShippingRate /> */}
      {/* <PackageDetails/> */}

      {/* <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/logistic" element={<Logistic />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/feedback" element={<Feedback />}></Route>
          <Route path="/loan-calculator" element={<LoanCalculator />}></Route>
          <Route path="/veryfy-email" element={<VeryfyEmail />}></Route>
          <Route path="/verify-otp" element={<VerifyyOtp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/terms-condition" element={<TermsCondition />}></Route>
          <Route path="*" element={<PNF />}></Route>
        </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/subuser-login" element={<SubuserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/veryfy-email" element={<VeryfyEmail />} />
          <Route path="/verify-otp" element={<VerifyyOtp />} />

          {/* Private Routes */}
          <Route element={<PrivateRoute isAuthenticated={userLogin} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/logistic" element={<Logistic />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-condition" element={<TermsCondition />} />
            <Route path="/file-upload" element={<FileUpload />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/track-consingnment" element={<TrackConsingment />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/package-details" element={<PackageDetails />} />
            <Route path="/request" element={<Request />} />
            <Route path="/role" element={<Role />} />
            <Route path="/add-role" element={<AddRole />} />
            <Route path="/shipping-rate" element={<ShippingRate />} />
            <Route path="/schedule-pickup" element={<SchedulePickUp />} />
            <Route path="/rate-transit" element={<RateAndTransitTime />} />
            <Route
              path="/services-and-packaging-options"
              element={<ServicesAndPackagingOptions />}
            />
            <Route
              path="/special-service-options"
              element={<SpecialServiceOptions />}
            />
            <Route
              path="/global-trade-documents"
              element={<GlobalTradeDocuments />}
            />
            <Route path="/open-shipment" element={<OpenShipment />} />
            <Route path="/upload" element={<UploadDocuments />} />
            <Route path="/upload-image" element={<UploadImage />} />
            <Route path="/upload-multiple" element={<UploadMultipleDocuments />} />
            <Route path="/all-shipments" element={<ShipmentList />} />
          </Route>

          <Route path="*" element={<PNF />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
