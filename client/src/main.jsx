import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppLayout from "./layout/AppLayout.jsx";
import Payments from "./components/payments/Payments.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Success from "./components/payments/status/Success.jsx";
import Failure from "./components/payments/status/Failure.jsx";
import UserProvider from "./layout/ContextLayout.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/payments/success" element={<Success />} />
            <Route path="/payments/cancel" element={<Failure />} />
          </Routes>
        </AppLayout>
      </UserProvider>
    </Router>
  </React.StrictMode>
);
