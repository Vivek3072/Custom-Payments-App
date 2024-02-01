import Header from "../header/Header";
import PaymentModes from "./PaymentModes";

const modes = [
  {
    title: "Stripe",
    logo: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
  },
  {
    title: "Razorpay",
    logo: "https://avatars.githubusercontent.com/u/7713209?s=280&v=4",
  },
  {
    title: "Paytm",
    logo: "https://download.logo.wine/logo/Paytm/Paytm-Logo.wine.png",
  },
];

export default function Payments() {
  return (
    <>
      <Header />
      <div className="bg-white w-[90vw] md:w-[70%] shadow rounded p-2 my-[2rem] mx-auto">
        <div className="px-3 my-2 font-medium text-2xl">
          Set up your Payment Method
        </div>
        {modes &&
          modes.map((mode, idx) => {
            return <PaymentModes mode={mode} key={idx} />;
          })}
      </div>
    </>
  );
}
