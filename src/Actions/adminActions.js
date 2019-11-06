import axios from "axios";
import {
  GET_ALL_USERS,
  URL,
  GET_ERRORS,
  DELETE_USER,
  RECOMMEND,
  GET_ALL_PROFILECREATED,
  GET_ALL_STUDENTS
} from "../Variables";

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
export const getAllStudents = () => dispatch => {
  axios
    .get(URL + "getallstudent")
    .then(res =>
      dispatch({
        type: GET_ALL_STUDENTS,
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

export const recommend = (data, currentTarget) => dispatch => {
  axios
    .post(`${URL}recommend/${data.id}`, {
      isChecked: data.isChecked
    })
    .then(res => {
      dispatch({
        type: RECOMMEND,
        payload: res.data
      });
      window.location.reload();
    })
    .catch(err => {
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // });
      console.log(err)
    });
};

export const getAllProfileCreated = id => dispatch => {
  axios
    .get(`${URL}getallprofilecreated`)
    .then(res => {
      dispatch({
        type: GET_ALL_PROFILECREATED,
        payload: res.data
      });
      // window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteUser = id => dispatch => {
  axios
    .get(`${URL}deleteuser/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_USER,
        payload: res.data
      });
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const verifyUser = id => dispatch => {
  axios
    .get(`${URL}verifyuser/${id}`)
    .then(res => {
      // dispatch({
      //   type: VERIFY_USER,
      //   payload: res.data
      // })
      window.location.reload();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
