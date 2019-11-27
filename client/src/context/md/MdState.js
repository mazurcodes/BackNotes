import React, {useReducer} from 'react';
import MdContext from "./MdContext";
import mdReducer from "./mdReducer";
import { GET_MD, GET_RAW } from "../types";

const MdState = (props) => {

  const initialState = {
    mdRendered: null,
    mdRaw: null,
    loading: false
  }

  const [md, dispatch] = useReducer(mdReducer, initialState);

  const getMarkdown = async () => {
    const mdData = await fetch("/markdown");
    const mdResult = await mdData.text();
    dispatch({
      type: GET_MD,
      payload: mdResult,
    })
  }

  const getRawMarkdown = async () => {
    const mdRawData = await fetch("/markdown/raw");
    const mdRawResult = await mdRawData.text();
    dispatch({
      type: GET_RAW,
      payload: mdRawResult,
    })
  }

  return (
    <MdContext.Provider value={{
      mdRendered: md.mdRendered,
      mdRaw: md.mdRaw,
      loading: md.loading,
    }}>
      {props.children}
    </MdContext.Provider>
  )
}

export default MdState
