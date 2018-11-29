const inititalState = {
    isAuthenticated: false,
    user: {}
}


export default function(state = inititalState, action){
    switch(action.type){
        default:
            return state;
    }
}