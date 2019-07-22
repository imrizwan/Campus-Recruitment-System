import axios from 'axios';
import { UPDATE_VACCANCY, DELETE_VACCANCY, URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILE_CREATED } from "../Variables";

export const updateVaccancy = (data) => dispatch => {
  // dispatch(getProfileLoading());
  axios
    .post(`${URL}updatevaccancy`, data)
    .then(res => {
      window.location.reload();
      dispatch({
        type: UPDATE_VACCANCY,
        payload: res.data
      })
    }
    )
    .catch(err => 
       dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }));
};

export const deleteVaccancy = (vaccancyid) => dispatch => {
  // dispatch(getProfileLoading());
  axios
    .get(URL+`deletevaccancy?vaccancyid=${vaccancyid}`)
    .then(res => {
      dispatch({
        type: DELETE_VACCANCY,
        payload: res.data
      })
    }
    )
    .catch(err => console.log(err));
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
    .then(res => history.push('/companydashboard'))
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
    .then(res => history.push('/companydashboard'))
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