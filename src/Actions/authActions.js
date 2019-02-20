
import { GET_ERRORS, URL,SET_CURRENT_USER } from "../Variables";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import axios from "axios";

// Company

// CompanyEnd

// Student

export const registerUser = (userInfo, history) => dispatch => {
    fetch(URL+"register", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            },
          body: JSON.stringify(userInfo) 
        })     
        .then(res => {  
          if(res.status === 400){
            res.json().then(errors => dispatch({ type: GET_ERRORS, payload: errors }))
          } else if(res.status === 200) {
            res.json().then(res => {
              dispatch({ type: GET_ERRORS, payload: res })
              // history.push("/signin"); 
            })
          }
        });
};

export const loginUser = (userInfo, history) => dispatch => {

  axios.post(URL + "login", userInfo)
    .then(res => {
      const { token } = res.data;
   
      localStorage.setItem('profilecreated', res.data.profilecreated);
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      //Decode token to get user
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}

export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const confirmUser = (userInfo, token) => dispatch => {
    axios.post(URL+`confirmation/${token}`, userInfo)
    .then(res => {
      dispatch({ type: GET_ERRORS, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}

export const changePassword = (password) => dispatch => {
    axios.post(URL+`changepassword`, password)
    .then(res => {
      dispatch({ type: GET_ERRORS, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}

export const resend = (email) => dispatch => {
    axios.post(URL+`resend`, email)
    .then(res => {
      dispatch({ type: GET_ERRORS, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}

export const forgotPasswordEmail = (email) => dispatch => {
    axios.post(URL+`forgotpasswordemail`, email)
    .then(res => {
      dispatch({ type: GET_ERRORS, payload: res.data })
    }).catch(errors => dispatch({ type: GET_ERRORS, payload: errors.response.data }))
}


export const logoutUser = (history) => (dispatch) => {
  //Remove token from the localstorage
  localStorage.removeItem('profilecreated');
  localStorage.removeItem('jwtToken');
  //Remove auther header for future requests
  setAuthToken(false);
  // set current user to emty object
  dispatch(setCurrentUser({}));

  history.push("/signin"); 
};