import { useCallback, useEffect, useRef, useState } from "react";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import { BASE_API_URL } from "../../api/BaseURL";
import useToken from "../../hooks/useToken";

export default function StripeSetup({ setShowModal }) {
  const [liveKey, setLiveKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [currency, setCurrency] = useState("");
  const [isSavedData, setIsSavedData] = useState(false);

  const { token } = useToken();

  const fetchStripeData = async () => {
    const res = await fetch(`${BASE_API_URL}/payments/stripe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.log("Failed to fetch");
      return;
    }
    const data = await res.json();

    console.log(res, "res");
    console.log(data, "data");
    if (data) setIsSavedData(true);
    setLiveKey(data.stripe_live_key);
    setPrivateKey(data.stripe_private_key);
    setCurrency(data.currency);
    setPaymentMethodType(data.payment_method_types);
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

  const handleStripeData = async () => {
    console.log(paymentMethodType, currency, liveKey, privateKey);
    const res = await fetch(`${BASE_API_URL}/payments/stripe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stripe_live_key: liveKey,
        stripe_private_key: privateKey,
        currency: currency,
        payment_method_types: paymentMethodType,
      }),
    });
    const data = await res.json();
    if (data) {
      alert(data.message);
    }
  };
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
              <div
                className={`${
                  isSavedData && "bg-opacity-20"
                } bg-primary rounded px-3 py-2 text-center text-white my-5 cursor-pointer`}
                onClick={handleStripeData}
              >
                {!isSavedData && "Save Credentials"}
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
