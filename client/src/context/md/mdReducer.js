import {
  GET_RAW,
  LOADING,
  RENDER_MD,
  SAVE_MD,
  SET_TIMEOUT,
  SET_SAVE_STATUS
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case RENDER_MD:
      return {
        ...state,
        mdRendered: action.payload,
        loading: false
      };
    case GET_RAW:
      return {
        ...state,
        mdRaw: action.payload,
        loading: false
      };
    case SAVE_MD:
      return {
        ...state,
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

    default:
      return state;
  }
};
