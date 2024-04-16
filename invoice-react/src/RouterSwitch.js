import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PaymentPage from "./paymentPage";
import CreatedContacts from "./createdContacts";
import { useState } from "react";

const RouteSwitch = () => {
  const [contactName, setContactName] = useState([]);
  const [contactNumber, setContactNumber] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<CreatedContacts />} /> */}
        <Route path="/invoice-app" element={<App setContactName={setContactName} setContactNumber={setContactNumber} name={contactName} number={contactNumber}/>} />
        <Route path="/paymentPage" element={<PaymentPage name={contactName} number={contactNumber} setContactName={setContactName} setContactNumber={setContactNumber} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;