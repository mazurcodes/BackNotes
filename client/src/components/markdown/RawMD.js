import React, { useContext, useEffect } from "react";
import MdContext from "../../context/md/MdContext";

const RawMD = () => {
  //context
  const { mdRaw, getRawMarkdown, saveMarkdownState, loading } = useContext(MdContext);

  // fetch raw markdown
  useEffect(() => {
    getRawMarkdown();
    // eslint-disable-next-line
  }, []);

  const saveMd = e => {
    saveMarkdownState(e.target.value);
  }

  if (loading) return <div></div>;
  return (
    <textarea
      name="raw-md"
      id="raw-md"
      style={{flex: 1}}
      defaultValue={mdRaw}
      onChange={saveMd}
    ></textarea>
  );
};

export default RawMD;
