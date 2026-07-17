import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Homepages from "./pages/Homepages";
import Loginpage from "./pages/Loginpage";
import Profilepage from "./pages/Profilepage.jsx";
import { AuthContext } from "./context/AuthContext";

import { Toaster } from "react-hot-toast";
import bgImage from "./assets/bgImage.svg";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="min-h-screen bg-contain"
    >
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepages /> : <Navigate to="/login" />}
        />

        <Route
          path="/login"
          element={!authUser ? <Loginpage /> : <Navigate to="/" />}
        />

        <Route
          path="/profile"
          element={<Profilepage />}
        />
      </Routes>
    </div>
  );
};

export default App;