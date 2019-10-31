import { GET_ALL_USERS } from "../Variables";

const inititalState = {};

export default function(state = inititalState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        getallprofiles: action.payload
      };
    default:
      return state;
  }
}
