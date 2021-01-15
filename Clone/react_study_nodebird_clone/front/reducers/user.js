
export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {},
}

// action creator
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}


export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}


export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT',
    }
}
const reducer = (state = initialState, action) =>{
    switch (action.type){
        case 'LOG_IN':
            return{
                ...state.user,
                isLoggedIn: true,
                me: action.data,
                }
        case 'LOG_OUT':
            return{
            
                ...state.user,
                isLoggedIn: false,
                me: null
                }
        default:
            return state;
    }
}


export default reducer;