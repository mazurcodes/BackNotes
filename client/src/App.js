import React from "react";
import MdState from "./context/md/MdState";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";

const mainAppStyle = {
  display: "flex",
  flexDirection: "column",
  maxHeight: "100vh",
  maxWidth: "100vw"

}

const App = () => {
  return (
    <MdState>
      <div className="App" style={mainAppStyle}>
        <Navbar />
        <Home />
      </div>
    </MdState>
  );
};

export default App;
