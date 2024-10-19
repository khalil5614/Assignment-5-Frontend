import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Componenets/shared/Navbar";
import FooterComponent from "../Componenets/shared/FooterComponent";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <FooterComponent />
    </div>
  );
};

export default MainLayout;
