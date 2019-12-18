import React, { useContext, useEffect } from "react";
import MdContext from "../../context/md/MdContext";

const Navbar = () => {
  const mdContext = useContext(MdContext);
  const { saveStatus } = mdContext;

  const linkStyle = {
    display: "flex",
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px"
  };
  return (
    <div style={linkStyle}>
      <h1>BackApp</h1>
      <p>
        {saveStatus === "saving"
          ? `Saving...`
          : "Saved successfully"}
      </p>
    </div>
  );
};

export default Navbar;
