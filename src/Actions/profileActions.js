import axios from 'axios';
import { APPLY_FOR_VACCANCY, URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILE_CREATED, GET_COMPANY_PROFILES } from "../Variables";

// Apply for vaccancy
export const applyForVaccancy = vaccancy => dispatch => {
  axios
    .post(URL+`applyforvaccancy`, {
      vaccancyid: vaccancy._id,
      companyid: vaccancy.user
    })
    .then(res =>
      dispatch({
        type: APPLY_FOR_VACCANCY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: null
      })
    );
}


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

// Get company profile to show vaccacies and other stuff
export const getCompanies = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(URL+`getcompanies`)
    .then(res =>{
      dispatch({
        type: GET_COMPANY_PROFILES,
        payload: res.data
      })
    }
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

export const getProfileCreated = () => dispatch => {
  // dispatch(getProfileLoading());
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
      history.push('/profile')
      })
    .catch(err =>{
        console.log(err)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    );
}

// Add education
export const addEducation = (eduData, history) => dispatch => {
    axios
      .post(URL+'createprofile/education', eduData)
      .then(res => history.push('/studentdashboard'))
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
      .then(res => history.push('/studentdashboard'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  // GET PROFILE loading
export const getProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
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