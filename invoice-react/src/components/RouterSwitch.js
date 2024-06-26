import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PaymentPage from "./paymentPage";
import { useState } from "react";

const RouteSwitch = () => {
  const [contactCount, nextContactCount] = useState(0);
  const [contact, setContact] = useState([]);
  const [switchedPage, setSwitchedPage] = useState(0);
  const [balance, setBalance] = useState(1000000);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invoice-app" element={<App switchedPage={switchedPage} setSwitchedPage={setSwitchedPage} contactCount={contactCount} nextContactCount={nextContactCount} setContact={setContact} contact={contact} />} />
        <Route path="/paymentPage" element={<PaymentPage  setSwitchedPage={setSwitchedPage} contact={contact} setContact={setContact} nextContactCount={nextContactCount} balance={balance} setBalance={setBalance} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;