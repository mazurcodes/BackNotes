import {
  LOADING,
  RENDER_MD,
  SAVE_MD,
  SET_TIMEOUT,
  SET_SAVE_STATUS,
  GET_MD_LIST,
  GET_MD,
  MD_ERROR,
  CLEAR_MD
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_MD_LIST:
      return {
        ...state,
        mdList: action.payload,
        loading: false
      };
    case GET_MD:
      return {
        ...state,
        mdFile: action.payload,
        mdRaw: action.payload.text,
        loading: false
      };
    case RENDER_MD:
      return {
        ...state,
        mdRendered: action.payload,
        loading: false
      };
    case SAVE_MD:
      const newMdFile = {
        ...state.mdFile,
        text: action.payload
      };
      return {
        ...state,
        mdFile: newMdFile,
        mdRaw: action.payload,
        loading: false
      };
    case SET_TIMEOUT:
      return {
        ...state,
        timeoutIndex: action.payload
      };
    case SET_SAVE_STATUS:
      return {
        ...state,
        saveStatus: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_MD:
      return {
        ...state,
        mdList: [],
        mdFile: null,
        mdRaw: null,
        mdRendered: null,
        loading: false,
        saveStatus: null,
        timeoutIndex: 1,
        errors: null
      };
    case MD_ERROR:
      return {
        ...state,
        errors: action.payload
      };

    default:
      return state;
  }
};
