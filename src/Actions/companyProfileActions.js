import axios from 'axios';
import { URL,GET_ERRORS, GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_PROFILE_CREATED } from "../Variables";

export const createCompanyProfile = (profileData, history) => dispatch => {
    axios
    .post(URL+'createcompanyprofile', profileData)
    .then(res => {
      const profilecreated = JSON.parse(localStorage.getItem('profilecreated'));
      if(!profilecreated){
        localStorage.setItem('profilecreated', !profilecreated);
      }
      
    //   history.push('/companyprofile')
      })
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
}