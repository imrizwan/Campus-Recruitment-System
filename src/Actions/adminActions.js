import axios from "axios";
import { GET_ALL_USERS, URL, GET_ERRORS } from "../Variables";

// Get current profile
export const getAllProfiles = () => dispatch => {
  axios
    .get(URL + "all")
    .then(res =>
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
