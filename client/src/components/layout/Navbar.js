import React, { useContext } from "react";
import MdContext from "../../context/md/MdContext";
import AuthContext from "../../context/auth/AuthContext";

const Navbar = () => {
  const mdContext = useContext(MdContext);
  const { saveStatus } = mdContext;

  const {user} = useContext(AuthContext);

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
      <p>
        {user ? user.name : ""}
      </p>
    </div>
  );
};

export default Navbar;
