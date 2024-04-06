import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PaymentPage from "./paymentPage";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/paymentPage" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;