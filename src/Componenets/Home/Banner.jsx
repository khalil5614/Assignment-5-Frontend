import React from "react";
import banner from "../../assets/banner2.jpg";
const Banner = () => {
  return (
    <>
      <div className="carousel w-full">
        <div className="carousel-item relative w-full">
          <div
            className="hero "
            style={{
              backgroundImage: `url(${banner})`,
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">
                  Unlock Your IT Potential
                </h1>
                <p className="mb-5">
                  Whether you're a beginner or looking to specialize, our
                  tailored IT courses provide the tools and knowledge you need
                  to succeed. Stay ahead of industry trends and build a
                  future-proof career with our cutting-edge training.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
