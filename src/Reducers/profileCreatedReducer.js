import {
  GET_PROFILE_CREATED,
  GET_PROFILE_LOADING
} from "../Variables";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE_CREATED:
      return {
        ...state,
        profilecreated: action.payload,
        loading: false
      };
    case GET_PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
