import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Ratings from "./shared/Ratings";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

function Course({ course }) {
  const {
    _id,
    //  course_id,
    title,
    details,
    // lession,
    // student,
    // duration,
    price,
    // assessments,
    // author,
    category,
    ratings,
    thumbnailUrl,
    // author_img_url,
    // img_url,
  } = course;

  const navigate = useNavigate();
  const courseDetails = (id) => {
    navigate(`/products/${id}`, {
      state: course,
    });
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={thumbnailUrl}
          alt={title}
          className="rounded-xl h-40 max-w-fit"
        />
      </figure>
      <div className="card-body ">
        <h1 className="card-title">{title}</h1>

        <Ratings ratings={ratings}></Ratings>

        <div className="flex items-center">
          <div className="font-bold">{price} </div>
          <FaBangladeshiTakaSign />
        </div>

        <div className="card-actions  ">
          <button
            onClick={() => courseDetails(_id)}
            className="btn bg-orange-200 mx-auto mt-10"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Course;
