import { GET_MD } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MD:
    return {
      ...state,
      mdRendered: action.payload,
    }  
    case GET_RAW:
    return {
      ...state,
      mdRaw: action.payload,
    }  
  
    default:
      return state;
  }
}