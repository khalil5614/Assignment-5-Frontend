import React from "react";
import Banner from "../Componenets/Home/Banner";
import HowWorks from "../Componenets/Home/HowWorks";
import PopularProucts from "../Componenets/Home/PopularProucts";
import ContactUs from "../Componenets/Home/ContactUs";
import AboutUs from "../Componenets/Home/AboutUs";

function HomePage() {
  return (
    <div>
      <Banner />
      <div className="w-11/12 lg:w-10/12 mx-auto">
        <HowWorks />
        <PopularProucts />
        <ContactUs />
        <AboutUs />
      </div>
    </div>
  );
}

export default HomePage;
