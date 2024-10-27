import React from "react";
import Banner from "../Componenets/Home/Banner";
import HowWorks from "../Componenets/Home/HowWorks";
import PopularCategories from "../Componenets/Home/PopularCategories";
import ContactUs from "../Componenets/Home/ContactUs";
import AboutUs from "../Componenets/Home/AboutUs";
import PopularProucts from "../Componenets/Home/PopularProucts";

function HomePage() {
  return (
    <div>
      <Banner />
      <div className="w-11/12 lg:w-10/12 mx-auto">
        <PopularCategories />
        <PopularProucts />
        <HowWorks />
        {/* 
        <ContactUs />
        <AboutUs /> */}
      </div>
    </div>
  );
}

export default HomePage;
