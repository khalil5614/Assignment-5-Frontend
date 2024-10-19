import React from "react";

function Ratings({ ratings }) {
  const rating = ratings?.split("/")[0];

  return (
    <div className="flex items-center">
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
      <span>({ratings})</span>
    </div>
  );
}

export default Ratings;
