import { GET_ALL_USERS, DELETE_USER } from "../Variables";

const inititalState = {};

export default function(state = inititalState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        getallprofiles: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        deleteuser: action.payload
      };
    default:
      return state;
  }
}
