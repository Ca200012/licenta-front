// ProtectedCheckoutRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

function ProtectedCheckoutRoute({ children }) {
  const { checkoutStarted } = useStateContext();
  if (!checkoutStarted) {
    return <Navigate to="/cart" replace />;
  }

  return children;
}

export default ProtectedCheckoutRoute;
