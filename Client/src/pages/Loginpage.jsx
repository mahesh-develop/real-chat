import React, { useState, useContext } from "react";
import assets from "../assets/assets";
import { AuthContext } from "../context/AuthContext";

const Loginpage = () => {
  const [currState, setCurrState] = useState("Sign Up");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isDataSubmitted, setDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign Up" && !isDataSubmitted) {
      setDataSubmitted(true);
      return;
    }

    login(currState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center
      justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl"
    >
      {/* Left Side */}
      <img
        src={assets.logo_big}
        alt="Logo"
        className="w-[min(30vw,250px)]"
      />

      {/* Right Side */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6
        flex flex-col gap-6 rounded-lg shadow-lg min-w-[340px]"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}

          <img
            src={assets.arrow_icon}
            alt=""
            className="w-5 cursor-pointer"
            onClick={() => {
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up");
              setDataSubmitted(false);
            }}
          />
        </h2>

        {/* Full Name */}
        {currState === "Sign Up" && !isDataSubmitted && (
          <input
            type="text"
            placeholder="Full Name"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-2 border border-gray-500 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Email & Password */}
        {!isDataSubmitted && (
          <>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-500 rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-500 rounded-md
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* Bio */}
        {currState === "Sign Up" && isDataSubmitted && (
          <textarea
            rows={4}
            placeholder="Provide a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 border border-gray-500 rounded-md
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600
          text-white rounded-md cursor-pointer"
        >
          {currState === "Sign Up"
            ? isDataSubmitted
              ? "Create Account"
              : "Next"
            : "Login Now"}
        </button>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>

        {/* Switch Login / Signup */}
        <p className="text-sm text-center">
          {currState === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            className="text-violet-400 cursor-pointer ml-1"
            onClick={() => {
              setCurrState(currState === "Sign Up" ? "Login" : "Sign Up");
              setDataSubmitted(false);
            }}
          >
            {currState === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Loginpage;