import { useContext, useState } from "react";
import useToken from "../../hooks/useToken";
import { BASE_API_URL, LOCAL_API_URL } from "../../api/BaseURL";
import UserContext from "../../hooks/UserContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { setUserData } = useContext(UserContext);
  const { setToken } = useToken();

  const handleRegister = async () => {
    // e.preventDefault();
    setLoading(true);
    const res = await fetch(`${LOCAL_API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (data.accessToken) {
      setToken(data.accessToken);
      setUserData(data);
    } else {
      setError(data.message);
    }
    console.log(data, "data");
  };

  return (
    <div className="w-full p-3">
      <h1 className="text-2xl text-black font-semibold mb-4">
        Register yourself
      </h1>
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-400 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-400 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-400 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-400 font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="text-black mt-1 p-2 w-full border rounded focus:outline-none focus:ring"
            value={confirm_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="text-m text-red-500 text-center mb-3">{error}</div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring"
        >
          {!loading ? "Register" : "Wait..."}
        </button>
      </form>
    </div>
  );
};

export default Register;
