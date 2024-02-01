import { useState } from "react";
import UserContext from "../hooks/UserContext";

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState({});
  return (
    <div>
      <UserContext.Provider value={(userData, setUserData)}>
        {children}
      </UserContext.Provider>
    </div>
  );
}
