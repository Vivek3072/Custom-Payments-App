import { FiSearch } from "react-icons/fi";
import Menu2 from "../../assets/menu/Menu2.svg";
import { useContext } from "react";
import UserContext from "../../hooks/UserContext";
import useToken from "../../hooks/useToken";

export default function Header() {
  const { userData } = useContext(UserContext);
  const { token, removeToken } = useToken();

  const handleLogout = async () => {
    removeToken();
    window.location.replace("/");
  };

  return (
    <div className="bg-white grid grid-cols-3 items-center px-[32px] py-[12px]">
      <div className="col-span-1 flex flex-row items-center">
        <div className="text-[15px]">Payments</div>
      </div>
      <div className="hidden md:flex col-span-1 flex-row items-center p-2 bg-black/95 rounded-lg text-black/50">
        <FiSearch />
        <input
          type="text"
          placeholder="Search here..."
          className="w-full bg-black/95 focus:outline-none ml-2"
        />
      </div>
      <div className="col-span-1 flex flex-row items-center space-x-2 ml-auto">
        <img
          src={userData?.profilePic && Menu2}
          alt=""
          className="w-[40px] h-[40px]"
        />
        {token && (
          <div
            className="w-fit text-white rounded-full bg-primary px-3 py-2 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </div>
        )}
      </div>
    </div>
  );
}
