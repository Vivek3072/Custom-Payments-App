import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import Menu1 from "../../assets/menu/Menu1.svg";
import Menu2 from "../../assets/menu/Menu2.svg";

export default function Header() {
  return (
    <div className="bg-white grid grid-cols-3 items-center px-[32px] py-[12px]">
      <div className="col-span-1 flex flex-row items-center">
        <div className="text-[15px]">Payments</div>
        <div className="ml-3 text-[12px] text-black/30 flex flex-row items-center">
          <AiOutlineQuestionCircle />{" "}
          <span className="ml-1">How it works!</span>
        </div>
      </div>
      <div className="col-span-1 flex flex-row items-center p-2 bg-black/95 rounded-lg text-black/50">
        <FiSearch />
        <input
          type="text"
          placeholder="Search features, tutorials, etc."
          className="w-full bg-black/95 focus:outline-none ml-2"
        />
      </div>
      <div className="col-span-1 flex flex-row items-center space-x-2 ml-auto">
        <img src={Menu1} alt="" className="w-[40px] h-[40px]" />
        <img src={Menu2} alt="" className="w-[40px] h-[40px]" />
      </div>
    </div>
  );
}
