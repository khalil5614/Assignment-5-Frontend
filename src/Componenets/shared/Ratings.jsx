import React from "react";

function Ratings({ ratings }) {
  const rating = ratings?.split("/")[0];

  return (
    <div className="flex items-center">
      <span className="font-bold">{ratings} </span>

      <div>
        {[1, 2, 3, 4, 5].map((star) => {
          return (
            <span
              key={star}
              style={{
                color: rating >= star ? "gold" : "gray",
                fontSize: `25px`,
              }}
            >
              {" "}
              ★{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Ratings;
