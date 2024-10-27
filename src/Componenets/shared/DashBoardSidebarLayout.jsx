import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaUser, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory, MdProductionQuantityLimits } from "react-icons/md";

const DashBoardSidebarLayout = () => {
  const { currentUser, logOut } = useContext(AuthContext);
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
    <div className="p-4">
      {/* User Profile Info */}
      <div className="flex flex-row lg:flex-col items-start gap-2">
        <img
          src={currentUser?.photoUrl}
          alt="User Profile"
          className="w-16 rounded-full"
        />
        <span>{currentUser?.displayName}</span>
        <span className="text-xs">{currentUser?.email}</span>
      </div>
      <hr className="my-4" />

      {/* Sidebar Links */}
      <nav className="flex flex-col gap-4">
        {/* Profile Link */}
        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-500"
          }
        >
          <FaUser className="inline mr-2" />
          Profile
        </NavLink>

        {!currentUser?.isBlocked && (
          <>
            {" "}
            {/* Admin Links */}
            {currentUser?.isAdmin && (
              <>
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <FaUsers className="inline mr-2" />
                  All Users
                </NavLink>
                <NavLink
                  to={"/dashboard/allcategories"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <MdCategory className="inline mr-2" />
                  All Categories
                </NavLink>
                <NavLink
                  to={"/dashboard/allproducts"}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }
                >
                  <AiFillProduct className="inline mr-2" />
                  All Products
                </NavLink>
              </>
            )}
            <hr className="my-4" />
            {/* User Links */}
            {/* {!currentUser?.isAdmin && ( */}
            {
              <NavLink
                to={"/dashboard/myproducts"}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }
              >
                <MdProductionQuantityLimits className="inline mr-2" />
                My Products
              </NavLink>
            }
          </>
        )}
        <hr className="my-4" />

        {/* Logout */}
        <button
          onClick={handleLogOut}
          className="text-red-600 text-sm hover:underline flex items-center"
        >
          <FaSignOutAlt className="inline mr-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default DashBoardSidebarLayout;
