import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

const Routeguard = ({ children }) => {
  const user = Cookies.get("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Routeguard;
