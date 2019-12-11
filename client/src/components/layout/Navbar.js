import React, { useContext, useEffect } from "react";
import MdContext from "../../context/md/MdContext";

const Navbar = () => {
  const mdContext = useContext(MdContext);
  const { saveStatus, timeoutIndex } = mdContext;

  let counter = 3;

  // const setCounting = () => {
  //   clearInterval(intervalIndex);
  //   intervalIndex = setInterval(() => {
  //     if (saveStatus === "saving") {
  //       counter--;
  //       console.log(counter);
  //       console.log(saveStatus);
  //     } else {
  //       clearInterval(intervalIndex);
  //     }
  //   }, 1000);
  // };

  const linkStyle = {
    display: "flex",
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "space-between"
  };
  return (
    <div style={linkStyle}>
      <h1>BackApp</h1>
      <p>
        {saveStatus === "saving" && counter !== 0
          ? `Saving...`
          : "Saved successfully"}
      </p>
    </div>
  );
};

export default Navbar;
