import axios from 'axios';
import { URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILE_CREATED } from "../Variables";

// Get profile by handle
export const getProfileById = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(URL+`user/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};
export const getProfileCreated = () => dispatch => {
  //dispatch(setProfileLoading());
  axios
    .get(URL+`profilecreated`)
    .then(res => {
      dispatch({
        type: GET_PROFILE_CREATED,
        payload: res.data
      })
    }
    )
    .catch(err => console.log(err));
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(URL+'profile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

export const createProfile = (profileData, history) => dispatch => {
    axios
    .post(URL+'createprofile', profileData)
    .then(res => {
      const profilecreated = JSON.parse(localStorage.getItem('profilecreated'));
      if(!profilecreated){
        localStorage.setItem('profilecreated', !profilecreated);
      }
      
      history.push('/profile')
      })
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

  // Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};