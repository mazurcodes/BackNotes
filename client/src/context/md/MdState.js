import React, { useReducer } from 'react';
import MdContext from './MdContext';
import mdReducer from './mdReducer';
import {
  GET_MD_LIST,
  GET_MD,
  LOADING,
  RENDER_MD,
  SAVE_MD,
  SET_TIMEOUT,
  SET_SAVE_STATUS
} from '../types';

// Markdown-It module
import MarkdownIt from 'markdown-it';
import mdAnchor from 'markdown-it-anchor';
import mdToc from 'markdown-it-table-of-contents';
const mdIt = new MarkdownIt();
mdIt.use(mdAnchor);
mdIt.use(mdToc);
// End of Markdown-It

const MdState = props => {
  const initialState = {
    mdList: [],
    mdRaw: null,
    mdRendered: null,
    loading: false,
    saveStatus: null,
    timeoutIndex: 1
  };

  const [md, dispatch] = useReducer(mdReducer, initialState);

  // @route     GET /markdown
  // @desc      Get list of all user files from DB
  // @access    Private

  const getMdList = async () => {
    setLoading();
    const mdData = await fetch('/markdown', {
      method: 'GET',
      headers: { 'x-auth-token': localStorage.token }
    });
    const mdResult = await mdData.json();
    dispatch({
      type: GET_MD_LIST,
      payload: mdResult
    });
  };

  // @route     GET /markdown
  // @desc      Get singe user file with :id from DB
  // @access    Private

  const getMdDocument = async id => {
    setLoading();
    const mdData = await fetch(`/markdown/${id}`, {
      method: 'GET',
      headers: { 'x-auth-token': localStorage.token }
    });
    const mdResult = await mdData.json();
    dispatch({
      type: GET_MD,
      payload: mdResult
    });
    // renderMarkdown(mdResult.text);
  };

  // @route     POST /markdown
  // @desc      Post user markdwon file to DB and return new file's id
  // @access    Private

  const saveMarkdownServer = async rawMd => {
    const postData = await fetch('/markdown', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mdData: rawMd })
    });
    setSaveStatus(postData.status);
  };

  //TODO Post and delete
  //  ...

  // Client functions to manage markdown files

  const saveMarkdownState = rawMd => {
    setLoading();
    dispatch({
      type: SAVE_MD,
      payload: rawMd
    });
    setTimeoutIndex(rawMd);
    setSaveStatus('saving');
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
        mdList: md.mdList,
        mdRaw: md.mdRaw,
        mdRendered: md.mdRendered,
        loading: md.loading,
        saveStatus: md.saveStatus,
        timeoutIndex: md.timeoutIndex,
        saveMarkdownState,
        getMdList,
        getMdDocument
      }}
    >
      {props.children}
    </MdContext.Provider>
  );
};

export default MdState;
