import { useState } from "react";
import StripeSetup from "./StripeSetup";

export default function PaymentModes({ mode }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-row justify-between items-center my-5 mx-3">
      <div className="flex flex-row space-x-2 items-center">
        <img
          src={mode.logo}
          alt="Logo"
          className="border p-2 w-12 h-12 rounded"
        />
        <div className="text-xl">{mode.title}</div>
      </div>
      <div
        className="rounded-full border border-primary px-3 py-1 h-fit w-fit text-primary cursor-pointer"
        onClick={() => setShowModal(!showModal)}
      >
        Set Up
      </div>
      {showModal && <StripeSetup setShowModal={setShowModal} />}
    </div>
  );
}
