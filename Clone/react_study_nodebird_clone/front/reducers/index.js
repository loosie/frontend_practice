
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

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}


// async action create (saga)


// action creator
const changeNickname= (data) => {
    return {
        type: 'CHANGE_NICKNAME',
        data,
    }
};

changeNickname('boogicho');


// (이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
    switch(action.type){
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
    }
}

export default rootReducer;