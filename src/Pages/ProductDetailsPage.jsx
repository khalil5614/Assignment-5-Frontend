import React, { useEffect, useState } from "react";
import Ratings from "../Componenets/shared/Ratings";
import { useLoaderData, useParams } from "react-router-dom";
import toast from "react-hot-toast";
//import { Slide, ToastContainer, toast } from "react-toastify";
//import "react-toastify/dist/ReactToastify.css";

function ProductDetailsPage() {
  //const [course, setCourse] = useState();
  const { id } = useParams();
  const course = useLoaderData();
  useEffect(() => {
    fetch(
      `https://assignment-4-server-side-code.vercel.app/api/courses/${id}`
    ).then((response) => response.json().then((data) => setCourse(data)));
  }, course);
  console.log(course);
  const { course_id, title } = course;

  const notifyWishlist = () => {
    toast.success(`${title} has been successfully added to Add to Wishlist.`, {
      position: "top-right",
    });
  };

  const notifyAddCart = () => {
    toast.success(`${title} has been successfully added to Add to Cart.`, {
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
          <p className="py-2">
            <b>{course?.student}</b> Student Enrolled
          </p>
          <div className="bg-slate-100 p-5 grid grid-cols-2  lg:flex justify-between rounded-lg">
            <p className="m-1">{course?.lession} Lectures.</p>
            <p className="m-1"> {course?.duration}.</p>
            <p className="m-1"> {course?.level} Level</p>
            <p className="m-1"> {course?.assessments} Assessment</p>
          </div>
          <div className="px-5 py-3 my-2 bg-slate-100 rounded-lg">
            <p>
              <b>Instructor</b>
            </p>
            <div className="flex items-center ">
              <img
                className="rounded-full w-16 p-2"
                src={course?.author_img_url}
              ></img>{" "}
              <span>{course?.author}</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/5 pl-0  md:pl-5">
          <img className="w-full max-h-60" src={course?.img_url} />
          <p className="text-3xl font-semibold text-yellow-600 py-5">
            {course?.price}৳
          </p>
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
            onClick={() => notifyAddCart()}
            className="btn btn-accent mx-2"
          >
            Add to Cart
          </button>
        </div>

        {/* 
          <ToastContainer /> */}
      </div>
    </div>
  );
}

export default ProductDetailsPage;
