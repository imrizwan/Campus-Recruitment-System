import { GET_ALL_USERS, DELETE_USER, RECOMMEND, GET_ALL_PROFILECREATED } from "../Variables";

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
    case RECOMMEND:
      return {
        ...state,
        recommenduser: action.payload
      };
    case GET_ALL_PROFILECREATED:
      return {
        ...state,
        getallprofilecreated: action.payload
      };
    default:
      return state;
  }
}
