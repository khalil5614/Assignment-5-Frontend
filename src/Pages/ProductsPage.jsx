import React from "react";
import Course from "../Componenets/Course";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Utils from "../utils/Utils";

const ProductsPage = () => {
  // const [courses, setCourse] = useState([]);

  // useEffect(() => {
  //   fetch(Utils.ALL_PRODUCTS_URL).then(
  //     (response) => response.json().then((data) => setCourse(data))
  //   );
  // }, [courses]);

  const courses = useLoaderData();
  console.log(courses);
  return (
    <>
      <div className="mt-5 p-2 w-11/12 mx-auto">
        <h1 className="text-2xl p-2 mb-1 font-semibold">Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses?.map((course) => (
            <Course key={course._id} course={course}></Course>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
