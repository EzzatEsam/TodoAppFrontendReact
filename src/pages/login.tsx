import { useEffect, useState } from "react";
import "../index.css";
import { TryLogin } from "../lib/ServerCalls";
import { RedirectIfLoggedIn } from "../lib/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    RedirectIfLoggedIn();
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle sign-in logic here
    var loginModel: LoginModel = { email, password };

    let loginErrors = await TryLogin(loginModel);
    if (loginErrors.length == 0) {
      // redirect to home
      window.location.href = "/home";
    }
    setErrors(loginErrors);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-svh">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-3 text-gray-800 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errors.length !== 0 &&
            errors.map((error) => (
              <p className="text-red-500 text-center text-sm">{error}</p>
            ))}
          <button
            type="submit"
            className="m-2 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
