import axios from 'axios';
import { URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "../Variables";

export const createCompanyProfile = (profileData, history) => dispatch => {
    axios
    .post(URL+'createcompanyprofile', profileData)
    .then(res => {
      const profilecreated = JSON.parse(localStorage.getItem('profilecreated'));
      if(!profilecreated){
        localStorage.setItem('profilecreated', !profilecreated);
      }
      
      history.push('/companyprofile')
      })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}

// Get current profile
export const getCurrentCompanyProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(URL+'companyprofile')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};


// addProject
export const addProject = (proData, history) => dispatch => {
  axios
    .post(URL+'createcompanyprofile/project', proData)
    .then(res => history.push('/dashboard-company'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// addVaccancy
export const addVaccancy = (vaccancyData, history) => dispatch => {
  axios
    .post(URL+'createcompanyprofile/vaccancy', vaccancyData)
    .then(res => history.push('/dashboard-company'))
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