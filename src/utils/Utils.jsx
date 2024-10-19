import { info } from "autoprefixer";
import React from "react";
const BaseUrl = "https://assignment-4-server-side-code.vercel.app/";
const CourseUrl =
  "https://assignment-4-server-side-code.vercel.app/api/courses";
//const CourseDetailsURL = `https://assignment-4-server-side-code.vercel.app/api/courses/${id}`;

const CourseDetailsURL = ({ course_id }) => {
  return `https://assignment-4-server-side-code.vercel.app/api/courses/${course_id}`;
};

const Utils = () => {
  const info = { CourseUrl, CourseDetailsURL };
  return info;
};

export default Utils;
