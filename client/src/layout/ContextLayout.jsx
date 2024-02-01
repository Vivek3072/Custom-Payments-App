import { useState } from "react";
import PaymentContext from "../hooks/PaymentContext";

export default function ContextLayout({ children }) {
  const [stripeData, setStripeData] = useState([]);
  return (
    <div>
      <PaymentContext.Provider value={(stripeData, setStripeData)}>
        {children}
      </PaymentContext.Provider>
    </div>
  );
}
