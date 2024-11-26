import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
// import Services from "./Pages/Logistic";
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

function App() {
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
      {/* <PNF /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/logistic" element={<Logistic />}></Route>
          <Route path="/login" element={<Login />}></Route>
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
      </BrowserRouter>
    </>
  );
}

export default App;
