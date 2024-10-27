import React, { useEffect, useState } from "react";
import Utils from "../../utils/Utils";
import { useNavigate } from "react-router-dom";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await fetch(Utils.ALL_CATEGORIES_URL);
      const data = await response.json();
      setCategories(data);
      console.log("Loaded Categories: ", data);
    } catch (error) {
      console.error("Error fetching Categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryCLick = (category) => {
    console.log("category: ", category);
    navigate(`/catproducts/${category.title}`);
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-12 mb-5">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category, index) => (
          // <div key={index} className="  rounded-lg border-2  text-center ">
          //   <img className="h-40 p-5 m-auto " src={category.thumbnailUrl}></img>
          //   <p className="bg-slate-50 py-4 rounded-lg">{category.title}</p>

          //   <div className="btn" onClick={() => handleCategoryCLick(category)}>
          //     View Products
          //   </div>
          // </div>
          <div key={index} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={category.thumbnailUrl}
                alt={category.title}
                className="rounded-xl h-40 max-w-fit"
              />
            </figure>
            <div className="card-body ">
              <h1 className="card-title">{category.title}</h1>

              <div className="card-actions  ">
                <button
                  onClick={() => handleCategoryCLick(category)}
                  className="btn bg-orange-200 mx-auto mt-10"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
