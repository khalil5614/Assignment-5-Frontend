import React, { useContext } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { MdDashboard } from "react-icons/md";

function DashboardNavbar() {
  const { currentUser, logOut } = useContext(AuthContext);
  console.log("Current User= ", currentUser);
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-gray-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <Link to={"/"}>
          <div className="btn btn-ghost justify-start">
            <img className="w-14 justify-start" src={logo} alt="Logo" />
            <p className="text-xl max-sm:hidden">Code Cloud</p>
          </div>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="flex  items-center gap-1">
          <Link
            onClick={handleLogOut}
            className="btn btn-secondary px-5 lg:px-10 h-10"
          >
            Log Out
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
