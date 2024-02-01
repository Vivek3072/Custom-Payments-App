import { useState } from "react";
import { MdPayments } from "react-icons/md";
import { AiOutlineShopping } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const items = [
    { icon: <AiOutlineShopping />, title: "Products", linkTo: "/" },
    { icon: <MdPayments />, title: "Payments", linkTo: "/payments" },
  ];

  const handleItemClick = (link) => {
    setActiveItem(link);
  };

  return (
    <div className="bg-secondary h-fit md:h-screen lg:h-screen px-1 py-2 gap-[24px]">
      <div className="flex flex-row justify-between items-center px-[12px] py-1 mb-[24px]">
        <div className="flex flex-row items-center md:gap-[12px]">
          <div className="text-xl text-white font-semibold">Payments App</div>
        </div>
      </div>
      {/* ________ */}
      <ul className="flex flex-row md:flex-col">
        {items?.map((item, idx) => (
          <Link
            to={item.linkTo}
            key={idx}
            onClick={() => handleItemClick(item.linkTo)}
            className={`${
              activeItem === item.linkTo
                ? "bg-white bg-opacity-30 text-white"
                : "text-[#D2D4D9]"
            } flex flex-row items-center my-1 px-[16px] py-[8px] hover:bg-white hover:bg-opacity-20 rounded`}
          >
            <div className="mr-1 text-[20px]">{item.icon}</div>
            <div className="text-[14px]">{item.title}</div>
          </Link>
        ))}
      </ul>

      <div className="bg-[#353C53] mx-2 rounded p-2 flex flex-row items-center hidden md:flex md:absolute bottom-2 left-1">
        <div className="h-full rounded bg-white bg-opacity-10 p-1 mr-1">
          <CiWallet className="text-[30px] font-medium" color="white" />
        </div>
        <div>
          <div className="text-sm text-gray-100">Available Credits</div>
          <div className="text-white font-medium">222.10</div>
        </div>
      </div>
    </div>
  );
}
