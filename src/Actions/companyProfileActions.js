import axios from 'axios';
import { GET_SHORTLISTED, SHORTLIST_CANDIDATE ,SELECTION_EMAIL, GET_CANDIDATES ,DELETE_PROJECT_COMPANY, UPDATE_VACCANCY, DELETE_VACCANCY, URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILE_CREATED } from "../Variables";
import isEmpty from '../validation/is-empty';

// Delete education
export const deleteProject = (id, getCurrentCompanyProfile) => dispatch => {
  axios
    .get(URL + `deleteproject?id=${id}`)
    .then(res => {
      getCurrentCompanyProfile()
      dispatch({
        type: DELETE_PROJECT_COMPANY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const deleteVaccancy2 = (id, getCurrentCompanyProfile) => dispatch => {
  axios
    .get(URL + `deletevaccancy?vaccancyid=${id}`)
    .then(res => {
      getCurrentCompanyProfile()
      dispatch({
        type: DELETE_VACCANCY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

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

  // get candidates

  export const getCandidates = (data) => dispatch => {
    let newData = []
    if(!isEmpty(data)){
        data.forEach(item => {
          newData.push(item.key.slice(0,24))
        });
    }

    if(!isEmpty(newData)){
      axios
      .post(URL+'getcandidates', newData)
      .then(res => dispatch({ type: GET_CANDIDATES, payload: res.data }))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    }
  };


  export const selectionEmail = (newData, history) => dispatch => {
    if(!isEmpty(newData)){
      axios
      .post(URL+'selectionemail', newData)
      .then(res => {
        alert("Email Sent!")
        history.push("/companydashboard")
        dispatch({ type: SELECTION_EMAIL, payload: res.status })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    }
  };

  export const getShortlisted = (vaccancyid) => dispatch => {
    if(!isEmpty(vaccancyid)){
      axios
      .get(URL+`getshortlisted/${vaccancyid}`)
      .then(res => {
        dispatch({ type: GET_SHORTLISTED, payload: res.data })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    }
  }

  export const shortlistCandidate = (newData, currentTarget) => dispatch => {
    if(!isEmpty(newData)){
      axios
      .post(URL+'shortlistcandidate', newData)
      .then(res => {
        if(res.data.msg === "deleted"){
          currentTarget.style.backgroundColor = "#007bff";
          currentTarget.style.borderColor = "#007bff";
          currentTarget.style.color = "white";
          currentTarget.innerHTML = "Shortlist this candidate";
        } else if(res.data.msg === "added"){
          currentTarget.style.backgroundColor = "#DC3545";
          currentTarget.style.borderColor = "#DC3545";
          currentTarget.style.color = "white";
          currentTarget.innerHTML = "Remove from shortlist";
        }
        dispatch({ type: SHORTLIST_CANDIDATE, payload: res.data })
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    }
  };
