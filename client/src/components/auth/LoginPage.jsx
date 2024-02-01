import { useContext, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { BASE_API_URL } from "../../api/BaseURL";
import useToken from "../../hooks/useToken";
import UserContext from "../../hooks/UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setToken } = useToken();
  const { setUserData } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data, "login data");
    if (data.accessToken) {
      setToken(data.accessToken);
      window.location.replace("/");
      setUserData({
        _id: data._id,
        email: data.email,
        username: data.username,
        profilePic: data.profilePic,
      });
    } else {
      setError(data.message);
    }
  };

  return (
    <>
      <div className="w-full p-3">
        <h1 className="text-2xl text-black font-semibold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-400 font-medium">
              Email
            </label>
            <input
              type="text"
              id="username"
              className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-400 font-medium"
            >
              Password
            </label>
            <div className="flex flex-row items-center text-black mt-1 w-full border rounded focus:outline-none focus:ring">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-transparent p-2 w-full rounded focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="cursor-pointer p-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
          </div>
          {error && (
            <div className="text-m text-red-500 text-center mb-3">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Wait..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
