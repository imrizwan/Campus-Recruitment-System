import { SET_CURRENT_USER } from "../Variables";
import isEmpty from "../validation/is-empty";

const inititalState = {
    isAuthenticated: false,
    user: {}
}


export default function(state = inititalState, action){
    switch(action.type){
        case SET_CURRENT_USER: 
        return {
            ...state,
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }
        default:
            return state;
    }
}