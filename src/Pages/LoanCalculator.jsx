import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import jsPDF from "jspdf";
import "jspdf-autotable";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [term, setTerm] = useState("");
  const [termType, setTermType] = useState("months");
  const [paymentFrequency, setPaymentFrequency] = useState("Monthly");
  const [startDate, setStartDate] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [installments, setInstallments] = useState([]);

  const calculateLoan = () => {
    const principal = loanAmount - (downPayment || 0);
    let numberOfPayments;
    let adjustedInterestRate;

    // Calculate number of payments and adjusted interest rate based on selected frequency
    switch (paymentFrequency) {
      case "Monthly":
        numberOfPayments = termType === "months" ? term : term * 12;
        adjustedInterestRate = interestRate / 100 / 12; // Monthly interest
        break;
      case "Bi-weekly":
        numberOfPayments = termType === "months" ? term * 2 : term * 26; // 26 bi-weekly payments in a year
        adjustedInterestRate = interestRate / 100 / 26; // Bi-weekly interest
        break;
      case "Weekly":
        numberOfPayments = termType === "months" ? term * 4 : term * 52; // 52 weekly payments in a year
        adjustedInterestRate = interestRate / 100 / 52; // Weekly interest
        break;
      case "Semi-Annually":
        numberOfPayments = termType === "months" ? term / 6 : term * 2; // 2 semi-annual payments in a year
        adjustedInterestRate = interestRate / 100 / 2; // Semi-annual interest
        break;
      case "Quarterly":
        numberOfPayments = termType === "months" ? term / 3 : term * 4; // 4 quarterly payments in a year
        adjustedInterestRate = interestRate / 100 / 4; // Quarterly interest
        break;
      case "Semi-monthly":
        numberOfPayments = termType === "months" ? term * 2 : term * 24; // 24 semi-monthly payments in a year
        adjustedInterestRate = interestRate / 100 / 24; // Semi-monthly interest
        break;
      case "Daily":
        numberOfPayments = termType === "months" ? term * 30 : term * 365; // Assuming 30 days in a month
        adjustedInterestRate = interestRate / 100 / 365; // Daily interest
        break;
      default:
        numberOfPayments = termType === "months" ? term : term * 12;
        adjustedInterestRate = interestRate / 100 / 12; // Default to monthly interest
        break;
    }

    // Loan calculation formula
    const monthly =
      (principal * adjustedInterestRate) /
      (1 - Math.pow(1 + adjustedInterestRate, -numberOfPayments));

    if (isFinite(monthly)) {
      const total = monthly * numberOfPayments;
      const interest = total - principal;

      setMonthlyPayment(monthly.toFixed(2));
      setTotalPayment(total.toFixed(2));
      setTotalInterest(interest.toFixed(2));

      // Generate installments data
      const generatedInstallments = [];
      let currentDate = new Date(startDate);
      let remainingBalance = principal;

      for (let i = 0; i < numberOfPayments; i++) {
        const interestForInstallment = remainingBalance * adjustedInterestRate; // Interest based on remaining balance
        const principalForInstallment = monthly - interestForInstallment; // Principal is the remaining part of monthly payment
        remainingBalance -= principalForInstallment; // Reduce the balance by the principal paid

        // Prevent floating-point issues by ensuring the balance never goes negative
        if (remainingBalance < 0) remainingBalance = 0;

        const installmentDate = new Date(currentDate);

        // Adjust date based on payment frequency
        switch (paymentFrequency) {
          case "Monthly":
            installmentDate.setMonth(installmentDate.getMonth() + 1);
            break;
          case "Bi-weekly":
            installmentDate.setDate(installmentDate.getDate() + 14);
            break;
          case "Weekly":
            installmentDate.setDate(installmentDate.getDate() + 7);
            break;
          case "Semi-Annually":
            installmentDate.setMonth(installmentDate.getMonth() + 6);
            break;
          case "Quarterly":
            installmentDate.setMonth(installmentDate.getMonth() + 3);
            break;
          case "Semi-monthly":
            installmentDate.setDate(installmentDate.getDate() + 15);
            break;
          case "Daily":
            installmentDate.setDate(installmentDate.getDate() + 1);
            break;
          default:
            installmentDate.setMonth(installmentDate.getMonth() + 1);
            break;
        }

        generatedInstallments.push({
          installmentDate: installmentDate.toLocaleDateString(),
          installmentAmount: monthly.toFixed(2),
          // principalAmount: principalForInstallment.toFixed(2),
          principalAmount: Math.max(principalForInstallment, 0).toFixed(2), // Changed line
          interest: interestForInstallment.toFixed(2),
          // balance: remainingBalance.toFixed(2),
          balance: Math.max(remainingBalance, 0).toFixed(2), // Changed line
        });

        currentDate = installmentDate; // Update current date for the next installment
      }

      setInstallments(generatedInstallments); // Set the generated installments data
    } else {
      // Handle case where monthly payment is not finite
      setMonthlyPayment(null);
      setTotalPayment(null);
      setTotalInterest(null);
    }
  };

  //for download pdf
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Loan Statement", 14, 16);
    doc.autoTable({
      head: [
        [
          "Installment Date",
          "Installment Amount",
          "Principal Amount",
          "Interest",
          "Balance",
        ],
      ],
      body: installments.map((installment) => [
        installment.installmentDate,
        installment.installmentAmount,
        installment.principalAmount,
        installment.interest,
        installment.balance,
      ]),
      startY: 20,
    });
    doc.save("loan_statement.pdf");
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow">
              <div className="card-body p-4">
                <h4 className="card-title text-center mb-4">Loan Calculator</h4>
                <form
                  novalidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    calculateLoan();
                  }}
                >
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Loan Amount"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Interest Rate(%)"
                    />
                  </div>
                  <div className="mb-3">
                    <h6>Loan Terms In (Months/Year)</h6>
                    <label>
                      <input
                        type="radio"
                        value="months"
                        checked={termType === "months"}
                        onChange={() => setTermType("months")}
                      />
                      Months
                    </label>
                    <label className="ms-2">
                      <input
                        type="radio"
                        value="years"
                        checked={termType === "years"}
                        onChange={() => setTermType("years")}
                      />
                      Years
                    </label>
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      placeholder="Enter term"
                    />
                  </div>
                  <div className="mb-3">
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Payment Frequency:
                    </label>
                    <select
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                        background: "transparent",
                        appearance: "none",
                      }}
                      className="form-select"
                      value={paymentFrequency}
                      onChange={(e) => setPaymentFrequency(e.target.value)}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Semi-Annually">Semi-Annually</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-monthly">Semi-monthly</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      placeholder="Start Date"
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="Down Payment (optional)"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{ borderRadius: "15px" }}
                    >
                      Calculate
                    </button>
                  </div>
                </form>
                {monthlyPayment && (
                  <div>
                    <h3>Results:</h3>
                    <p>
                      Payment Every {paymentFrequency}: {monthlyPayment}
                    </p>

                    <p>Total Payment: {totalPayment}</p>
                    <p>Total Interest: {totalInterest}</p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5>Loan Statement</h5>

                      <button
                        className="btn btn-primary"
                        style={{ borderRadius: "15px" }}
                        onClick={downloadPDF}
                      >
                        Download Statement
                      </button>
                    </div>
                  </div>
                )}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Installment Date</th>
                        <th scope="col">Installment Amount</th>
                        <th scope="col">Principal Amount</th>
                        <th scope="col">Interest</th>
                        <th scope="col">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments.map((installment, index) => (
                        <tr key={index}>
                          <td>{installment.installmentDate}</td>
                          <td>{installment.installmentAmount}</td>
                          <td>{installment.principalAmount}</td>
                          <td>{installment.interest}</td>
                          <td>{installment.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* from here */}
      {/* <div className="container">
        <div
          style={{
            display: "flex",
            height: "120vh",
          }}
          className="mt-5 d-flex align-items-stretch"
        >
          <div className="col-lg-6 col-md-8 p-0">
            <div
              style={{
                flex: 1,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="img/calculator.jpg"
                alt="Decorative"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-8 d-flex align-items-center">
            <div
              className="card shadow w-100"
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                padding: "40px 80px",
              }}
            >
              <div className="card-body p-0">
                <h4 className="card-title text-center mb-4">Loan Calculator</h4>
                <form
                  novalidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    calculateLoan();
                  }}
                >
                  <div className="mb-3 mt-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Loan Amount ($)"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="Interest Rate(%)"
                    />
                  </div>
                  <div className="mb-3">
                    <h6>Loan Terms In (Months/Year)</h6>
                    <label>
                      <input
                        type="radio"
                        value="months"
                        checked={termType === "months"}
                        onChange={() => setTermType("months")}
                      />
                      Months
                    </label>
                    <label className="ms-2">
                      <input
                        type="radio"
                        value="years"
                        checked={termType === "years"}
                        onChange={() => setTermType("years")}
                      />
                      Years
                    </label>
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      placeholder="Enter term"
                    />
                  </div>
                  <div className="mb-3">
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      Payment Frequency:
                    </label>
                    <select
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                        background: "transparent",
                        appearance: "none",
                      }}
                      className="form-select"
                      value={paymentFrequency}
                      onChange={(e) => setPaymentFrequency(e.target.value)}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Semi-Annually">Semi-Annually</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-monthly">Semi-monthly</option>
                      <option value="Daily">Daily</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      placeholder="Start Date"
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      style={{
                        border: "none",
                        borderBottom: "1px solid black",
                        textDecoration: "none",
                        padding: "10px 0",
                        width: "100%",
                      }}
                      type="number"
                      className="form-control"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="Down Payment (optional)"
                    />
                  </div>
                  <div className="mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      style={{ borderRadius: "15px" }}
                    >
                      Calculate
                    </button>
                  </div>
                </form>
                {monthlyPayment && (
                  <div>
                    <h3>Results:</h3>
                    <p>
                      Payment Every {paymentFrequency}: ${monthlyPayment}
                    </p>

                    <p>Total Payment: ${totalPayment}</p>
                    <p>Total Interest: ${totalInterest}</p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5>Loan Statement</h5>

                      <button
                        className="btn btn-primary"
                        style={{ borderRadius: "15px" }}
                        onClick={downloadPDF}
                      >
                        Download Statement
                      </button>
                    </div>
                  </div>
                )}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Installment Date</th>
                        <th scope="col">Installment Amount</th>
                        <th scope="col">Principal Amount</th>
                        <th scope="col">Interest</th>
                        <th scope="col">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments.map((installment, index) => (
                        <tr key={index}>
                          <td>{installment.installmentDate}</td>
                          <td>${installment.installmentAmount}</td>
                          <td>${installment.principalAmount}</td>
                          <td>${installment.interest}</td>
                          <td>${installment.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}

export default LoanCalculator;
