import React from "react";

const Procedure = ({ work }) => {
  const { title, details } = work;
  return (
    // <div className="p-3 rounded-lg border-2 m-2 bg-gray-50">
    //   <h1 className="text-xl">
    //     <b>{title}</b>
    //   </h1>
    //   <p>{details}</p>
    // </div>
    <div className="collapse bg-base-200 mt-1">
      <input type="radio" name="my-accordion-1" defaultChecked />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">
        <p>{details}</p>
      </div>
    </div>
  );
};

export default Procedure;
