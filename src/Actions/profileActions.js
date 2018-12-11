import axios from 'axios';
import { URL,GET_ERRORS } from "../Variables";

export const createProfile = (profileData, history) => dispatch => {
    console.log("profileData", profileData);
    axios
    .post(URL+'createprofile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios
      .post(URL+'createprofile/education', eduData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

export const addExperience = (expData, history) => dispatch => {
    axios
      .post(URL+'createprofile/experience', expData)
      .then(res => history.push('/dashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };