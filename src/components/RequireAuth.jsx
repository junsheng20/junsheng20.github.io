import { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const user = useContext(AuthContext).user;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
