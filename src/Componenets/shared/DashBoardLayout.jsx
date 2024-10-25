import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "../../Providers/AuthProvider";

const DashBoardLayout = () => {
  const { logOut } = useContext(AuthContext);

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
    <div>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full">
            {/* <div className="flex-none lg:hidden"> */}
            <div className="flex-none ">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">Code Cloud</div>

            {/* <div className="hidden flex-none lg:block"> */}
            <div className=" flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link>
                    <MdDashboard className="size-7" />
                  </Link>
                </li>
                {/* <li>
                  <a>Navbar Item 2</a>
                </li> */}
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link to={"/dashboard"}>Profile</Link>
            </li>
            <li>
              <Link to={"/dashboard/allusers"}>All Users</Link>
            </li>
            <li>
              <Link to={"/dashboard/allcategories"}>All Categories</Link>
            </li>
            <li>
              <Link to={"/dashboard/allproducts"}>All Products</Link>
            </li>
            <li>
              <Link onClick={handleLogOut}>Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
