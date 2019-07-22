import {
  GET_PROFILE_CREATED,
  GET_PROFILE_LOADING,
  APPLY_FOR_VACCANCY,
  UPDATE_VACCANCY,
  DELETE_VACCANCY
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
    case APPLY_FOR_VACCANCY:
      return {
        ...state
      };
    case UPDATE_VACCANCY:
      return {
        ...state,
        success: action.payload,
        loading: false
      };
    case DELETE_VACCANCY:
      return {
        ...state
      };
    default:
      return state;
  }
}
