import {
    GET_PROFILE_CREATED
  } from "../Variables";
  
  const initialState = {};
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_PROFILE_CREATED:
        return {
          ...state,
          profilecreated: action.payload
        };
      default:
        return state;
    }
  }
  