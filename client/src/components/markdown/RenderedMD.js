import React, { useContext, useEffect } from "react";
import "../pages/css/github-markdown.css";
import MdContext from "../../context/md/MdContext";


const RenderedMD = () => {
  //context
  const { mdRendered, loading } = useContext(MdContext);

  // fetch rendered markdown
  // useEffect(() => {
  //   getMarkdown();
  //   // eslint-disable-next-line
  // }, []);

  if (loading) return <div></div>;
  return <div className="markdown-body" style={{flex: 1, overflowY: "scroll"}} dangerouslySetInnerHTML={{__html: mdRendered}}>
  </div>;
};

export default RenderedMD;