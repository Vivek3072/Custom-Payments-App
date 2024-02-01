import { BASE_API_URL } from "../../../api/BaseURL";

export default function RenderRazorpay({ razorpayDetails }) {
  const options = {
    key: razorpayDetails.keyId,
    amount: razorpayDetails.amount,
    currency: razorpayDetails.currency,
    name: razorpayDetails.product_name,
    description: razorpayDetails.description,
    image: "https://www.appleute.de/wp-content/uploads/2021/08/Frame-46.svg",
    order_id: razorpayDetails.order_id,
    handler: async function (response) {
      console.log(response, "response");
      await fetch(`${BASE_API_URL}/payments/save-payment`, {
        method: "POST",
        body: JSON.stringify({
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          amount: razorpayDetails.amount,
          payment_status: "Paid",
          datetime: "",
          payment_provider: "razorpay",
        }).then((msg) => console.log(msg)),
      });
      window.location.replace("/#/payments/success");
    },
    prefill: {
      contact: razorpayDetails.contact,
      name: razorpayDetails.name,
      email: razorpayDetails.email,
    },
    notes: {
      description: razorpayDetails.description,
    },
    theme: {
      color: "#4395f5",
    },
  };
  const razorpay = new window.Razorpay(options);
  razorpay.open();
  razorpay.on("payment.failed", function (response) {
    window.location.replace("/#/payments/cancel");
  });
  return null;
}
