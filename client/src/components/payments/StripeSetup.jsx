import { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";

export default function StripeSetup({ setShowModal }) {
  const [liveKey, setLiveKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [currency, setCurrency] = useState("");
  const [isSavedData, setIsSavedData] = useState(false);

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidml2ZWtAZ21haWwuY29tIiwiaWQiOiI2NWJhMTc4ODZlMDA2YzUzYjg2N2M2ZDUifSwiaWF0IjoxNzA2Njk1MDA0fQ.lYdP5pZ3N5YU2j-bKi2qU5F6i-1yGBW2nHk2fbylpB0";
  const fetchStripeData = async () => {
    const res = await fetch("http://localhost:5000/api/payments/stripe", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data) setIsSavedData(true);
    setLiveKey(data.stripe_live_key);
    setPrivateKey(data.stripe_private_key);
    setCurrency(data.currency);
    setPaymentMethodType(data.payment_method_types);
    console.log(data, "data");
  };
  useEffect(() => {
    fetchStripeData();
  }, []);
  const ref = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-30 flex items-center justify-center z-5">
      <div
        ref={ref}
        className="bg-white w-full md:w-[50vw] min-h-[60vh] rounded p-5"
      >
        <div className="flex flex-row justify-between items-center w-full">
          <div className="text-xl font-medium">Stripe Setup</div>
          <div
            className="bg-primary bg-opacity-20 text-primary font-medium rounded-full px-3 py-1 cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            Close x
          </div>
        </div>
        <div className="my-5">
          <form>
            <TextInput
              type="text"
              placeholder="Enter your live key"
              label="Stripe Live Key"
              inputValue={liveKey}
              setInputValue={setLiveKey}
            />
            <TextInput
              type="text"
              placeholder="Enter your private key"
              label="Stripe Private Key"
              inputValue={privateKey}
              setInputValue={setPrivateKey}
            />
            <SelectInput
              type="text"
              label="Select your payment method"
              inputVal={paymentMethodType}
              inputValues={["card", "upi", "other"]}
              setValue={setPaymentMethodType}
            />
            <SelectInput
              type="text"
              inputVal={currency}
              label="Select currency"
              inputValues={["INR", "USD", "EURO"]}
              setValue={setCurrency}
            />
            <div className="flex flex-row-reverse">
              <div className="bg-primary rounded px-3 py-2 text-center text-white my-5 cursor-pointer">
                {isSavedData ? "Update Credentials" : "Save Credentials"}
              </div>
              <div
                className="bg-white border-gray-400 border-2 rounded px-3 py-2 text-center text-gray-600 my-5 cursor-pointer mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
