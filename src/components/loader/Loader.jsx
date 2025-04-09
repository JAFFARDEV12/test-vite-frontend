import React from "react";

const Loader = ({ size = 24 }) => {
  return (
    <div
      className="animate-spin rounded-full border-4 border-black border-t-transparent"
      style={{ width: size, height: size }}
    ></div>
  );
};

export default Loader;
