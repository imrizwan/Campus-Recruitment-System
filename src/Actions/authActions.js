
import { GET_ERRORS, URL,SET_CURRENT_USER } from "../Variables";
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from "jwt-decode";
import axios from "axios";

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
            res.json().then(user => {
              history.push("/signin"); 
            })
          }
        });
};

export const loginUser = (userInfo, history) => dispatch => {

  axios.post(URL + "login", userInfo)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      console.log(token);
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

export const logoutUser = () => (dispatch) => {
  //Remove token from the localstorage
  localStorage.removeItem('jwtToken');
  //Remove auther header for future requests
  setAuthToken(false);
  // set current user to emty object
  dispatch(setCurrentUser({}));
};