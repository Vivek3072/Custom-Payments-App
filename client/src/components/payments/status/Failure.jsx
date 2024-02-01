export default function Failure() {
  return (
    <div className="h-screen grid place-items-center ">
      <div className="bg-white h-[300px] rounded shadow">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            className="text-green-600 w-16 h-16 mx-auto my-6 bi bi-x-circle-fill"
            viewBox="0 0 24 24"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment incomplete!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <a
                href="/"
                className="px-12 bg-red-500 rounded shadow text-white font-semibold py-3"
              >
                Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
