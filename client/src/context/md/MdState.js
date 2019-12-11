import React, { useReducer } from "react";
import MdContext from "./MdContext";
import mdReducer from "./mdReducer";
import {
  GET_RAW,
  LOADING,
  RENDER_MD,
  SAVE_MD,
  SET_TIMEOUT,
  SET_SAVE_STATUS
} from "../types";

// Markdown-It module
import MarkdownIt from "markdown-it";
import mdAnchor from "markdown-it-anchor";
import mdToc from "markdown-it-table-of-contents";
const mdIt = new MarkdownIt();
mdIt.use(mdAnchor);
mdIt.use(mdToc);
// End of Markdown-It

const MdState = props => {
  const initialState = {
    mdRendered: null,
    mdRaw: null,
    loading: false,
    saveStatus: null,
    timeoutIndex: 1
  };

  const [md, dispatch] = useReducer(mdReducer, initialState);

  // const getMarkdown = async () => {
  //   setLoading();
  //   const mdData = await fetch("/markdown");
  //   const mdResult = await mdData.text();
  //   dispatch({
  //     type: GET_MD,
  //     payload: mdResult
  //   });
  // };

  const getRawMarkdown = async () => {
    setLoading();
    const mdRawData = await fetch("/markdown/raw");
    const mdRawResult = await mdRawData.text();
    dispatch({
      type: GET_RAW,
      payload: mdRawResult
    });
    renderMarkdown(mdRawResult);
  };

  const saveMarkdownServer = async rawMd => {
    const postData = await fetch("/markdown", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mdData: rawMd })
    });
    setSaveStatus(postData.status);
  };

  const saveMarkdownState = rawMd => {
    setLoading();
    dispatch({
      type: SAVE_MD,
      payload: rawMd
    });
    setTimeoutIndex(rawMd);
    setSaveStatus("saving");
    renderMarkdown(rawMd);
  };

  const renderMarkdown = rawMd => {
    setLoading();
    const renderedMd = mdIt.render(rawMd);
    dispatch({
      type: RENDER_MD,
      payload: renderedMd
    });
  };

  const setTimeoutIndex = rawMd => {
    clearTimeout(md.timeoutIndex);
    const timeoutIndex = setTimeout(() => {
      saveMarkdownServer(rawMd);
    }, 3000);
    dispatch({
      type: SET_TIMEOUT,
      payload: timeoutIndex
    });
  };

  const setSaveStatus = status => {
    dispatch({
      type: SET_SAVE_STATUS,
      payload: status
    });
  };

  const setLoading = () => dispatch({ type: LOADING });

  return (
    <MdContext.Provider
      value={{
        mdRendered: md.mdRendered,
        mdRaw: md.mdRaw,
        loading: md.loading,
        getRawMarkdown,
        saveMarkdownState,
        saveStatus: md.saveStatus,
        timeoutIndex: md.timeoutIndex
      }}
    >
      {props.children}
    </MdContext.Provider>
  );
};

export default MdState;
