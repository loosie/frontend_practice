import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';





// async action create (saga)



const rootReducer = (state, action) => {
    switch(action.type) {
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default: {
            const combineReducer = combineReducers({
                user,
                post,
            });
            return combineReducer(state, action);
        }
    }
};


// (이전상태, 액션) => 다음상태
// const rootReducer = combineReducers({
//     // SSR을 위해서 HYDRATE
//     index : (state = {}, action) => {
//         switch(action.type){
//             case HYDRATE:
//                 console.log('HYDRATE: ', action);
//                 return { ...state, ...action.payload};

//             default:
//                 return state;
//             }
//         },
//     user,
//     post,
// });

export default rootReducer;