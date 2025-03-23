import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users
  }

  return children;
};

export default ProtectedRoute;
