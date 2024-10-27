import React, { useContext, useEffect, useState } from "react";
import Ratings from "../Componenets/shared/Ratings";
import { useLoaderData, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Utils from "../utils/Utils";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { AuthContext } from "../Providers/AuthProvider";
//import { Slide, ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

function ProductDetailsPage() {
  const { currentUser } = useContext(AuthContext);
  //const [course, setCourse] = useState();
  const { id } = useParams();
  const course = useLoaderData();
  // useEffect(() => {
  //   fetch(Utils.PRODUCT_DETAILS_URL({ id: id })).then((response) =>
  //     response.json().then((data) => setCourse(data))
  //   );
  // }, course);
  console.log(course);
  const { _id, title } = course;

  const notifyWishlist = () => {
    toast.success(`${title} has been successfully added to Add to Wishlist.`, {
      position: "top-right",
    });
  };

  //Buy Product
  const handleBuyProductClick = async () => {
    try {
      console.log("handleBuyProductClick");
      const response = await fetch(Utils.BUY_PRODUCT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          productId: course._id,
          quantity: 1,
        }),
      });
      console.log("BUY_PRODUCT", response);
      if (response.ok) {
        notifyBuy();
      }
    } catch (error) {
      console.error("Error Buy Product:", error);
    }
  };

  const notifyBuy = () => {
    toast.success(`${title} has been Buy successfully`, {
      position: "top-right",
    });
  };

  return (
    <div className="w-10/12 mx-auto py-5">
      <div className="flex flex-col-reverse md:flex-row">
        <div className="w-full md:w-3/5 ">
          <h1 className="text-5xl">{course?.title}</h1>
          <p className="py-5">{course?.details}</p>

          <Ratings ratings={course?.ratings}></Ratings>

          <div className="px-5 py-3 my-2 bg-slate-100 rounded-lg">
            <p className="py-1 text-xl">{course?.category}</p>
          </div>
        </div>
        <div className="w-full md:w-2/5 pl-0  md:pl-5">
          <img className="w-full max-h-60" src={course?.thumbnailUrl} />

          <div className="flex items-center py-5  text-yellow-600">
            <div className="text-2xl font-semibold ">{course?.price} </div>
            <FaBangladeshiTakaSign />
          </div>
        </div>
      </div>
      <div className="card-actions mt-5">
        <div className="m-auto">
          <button
            onClick={() => notifyWishlist()}
            className="btn btn-outline mx-2"
          >
            Add to Wish List
          </button>
          <button
            onClick={() => handleBuyProductClick()}
            className="btn btn-accent mx-2 px-16"
          >
            Buy
          </button>
        </div>

        {/* 
          <ToastContainer /> */}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
