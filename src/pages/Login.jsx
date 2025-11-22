import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-8/9 flex items-center justify-center bg-white/5 shadow-2xl px-4">
      <div
        className="bg-white/10 backdrop-blur-xl border border-white/20 
                      p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md
                         border border-white/20 text-gray-900 placeholder-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md
                         border border-white/20 text-gray-900 placeholder-gray-600
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 
                       text-white py-3 rounded-xl font-medium shadow-lg
                       transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Bottom helper */}
        <p className="text-center text-gray-700 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
