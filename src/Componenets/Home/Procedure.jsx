import React from "react";

const Procedure = ({ work }) => {
  const { title, details } = work;
  return (
    <div className="p-3 rounded-lg border-2 m-2 bg-gray-50">
      <h1 className="text-xl">
        <b>{title}</b>
      </h1>
      <p>{details}</p>
    </div>
  );
};

export default Procedure;
