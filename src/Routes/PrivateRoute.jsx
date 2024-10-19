import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Loader from "../Pages/Loader";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);

  const location = useLocation();
  console.log("Loading=", loading);

  if (loading) {
    return <Loader />;
  }

  if (currentUser) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
