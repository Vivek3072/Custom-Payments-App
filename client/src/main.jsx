import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppLayout from "./layout/AppLayout.jsx";
import Payments from "./components/payments/Payments.jsx";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>404 not found!</h1>,
  },
  {
    path: "/payments",
    element: <Payments />,
    errorElement: <h1>404 not found!</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppLayout>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </AppLayout>
  </React.StrictMode>
);
