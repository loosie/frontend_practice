import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    user:{
        isLoggedIn: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
};
// action creator
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}
// action creator
export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}


// async action create (saga)


// action creator
// const changeNickname= (data) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data,
//     }
// };

// changeNickname('boogicho');


// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case HYDRATE:
            console.log('HYDRATE: ', action);
            return { ...state, ...action.patload};
        case 'LOG_IN':
            return{
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    user: action.data,
                }
            };

        case 'LOG_OUT':
            return{
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user: null
                }
            };
        default:
            return state;
    }
}

export default rootReducer;