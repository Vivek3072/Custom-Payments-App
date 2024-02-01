import { useState } from "react";
import { BASE_API_URL } from "../../api/BaseURL";

export default function ProductCard({ prod }) {
  const [loading, setLoading] = useState(false);

  const makePayment = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_API_URL}/payments/create-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName: prod.title,
        productPrice: prod.price,
        quantity: 1,
      }),
    });
    const data = await res.json();
    setLoading(false);
    window.location.replace(data.url);
    console.log(data, "data");
  };

  return (
    <div className="bg-white w-60 min-h-40 shadow-md hover:shadow-xl rounded p-2 flex flex-col justify-center items-center">
      <div className="h-14">{prod.title}</div>
      <div className="w-fit h-40">
        <img
          src={prod.image}
          alt={prod.title || "Product"}
          className="w-full h-40 transition-all duration-300 transform hover:scale-105"
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full h-12">
        <div className="text-lg font-medium">₹ {prod.price}</div>
        <div className="flex flex-row items-center space-x-1">
          <span className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="orange"
              className="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
            {prod.rating.rate}
          </span>
          <span className="text-xs"> ({prod.rating.count}) </span>
        </div>
      </div>
      <div
        className={`${
          loading && "bg-opacity-30 hover:bg-opacity-30 bg-primary"
        } bg-primary hover:bg-secondary transition-all duration-300 px-3 py-2 rounded-full text-white text-center cursor-pointer mt-auto mb-2 w-full mx-auto`}
        onClick={makePayment}
      >
        {loading ? "Redirecting" : " Buy now"}
      </div>
    </div>
  );
}
