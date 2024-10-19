import React from "react";

import { Link, useNavigate } from "react-router-dom";
import Ratings from "./shared/Ratings";

function Course({ course }) {
  const {
    _id,
    course_id,
    title,
    details,
    lession,
    student,
    duration,
    price,
    assessments,
    author,
    level,
    ratings,
    author_img_url,
    img_url,
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
        <img src={img_url} alt={title} className="rounded-xl h-40 max-w-fit" />
      </figure>
      <div className="card-body ">
        <h1 className="card-title">{title}</h1>
        <div>
          <p className="line-clamp-2">{details}</p>
        </div>

        <p className="text-gray-500">
          <span>Facilitated By: {author}</span>
        </p>

        <Ratings ratings={ratings}></Ratings>
        <div className="text-gray-500">
          <span>{lession} Lectures.</span>
          <span> {duration}.</span>
          <span> {level} Level</span>
        </div>
        <div className="card-actions  ">
          <button
            onClick={() => courseDetails(course_id)}
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
