import axios from "axios";
import { GET_ALL_USERS, URL, GET_ERRORS, DELETE_USER } from "../Variables";

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

export const deleteUser = (id) => dispatch => {
  axios
    .get(`${URL}deleteuser/${id}`)
    .then(res =>{
      dispatch({
        type: DELETE_USER,
        payload: res.data
      })
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
