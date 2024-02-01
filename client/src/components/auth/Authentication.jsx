import { useState } from "react";
import LoginPage from "./LoginPage";
import Register from "./Register";

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-fit flex flex-col h-fit bg-white px-5 bg-white shadow-lg rounded-lg mx-auto my-10">
      <div>
        {isLogin ? <LoginPage /> : <Register />}
        <div className="text-center text-gray-400 my-3">
          {isLogin ? "New User?" : "Already an user?"}

          <div
            className="text-primary hover:text-blue-700 hover:underline ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create Account" : "Login Now"}
          </div>
        </div>
      </div>
    </div>
  );
}
