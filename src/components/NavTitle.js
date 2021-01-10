import React from "react";

const NavTitle = ({ title }) => {
  return (
    <div
      style={{
        fontSize: "30px",
        marginBottom: "20px",
        fontWeight: "600",
      }}
    >
      {title}
    </div>
  );
};

export default NavTitle;
