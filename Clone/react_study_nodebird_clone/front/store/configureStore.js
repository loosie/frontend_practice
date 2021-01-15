import { createWrapper } from 'next-redux-wrapper';
import { compose, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer from '../reducers'

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) =>{
    console.log(action);

    return next(action);
}

const configureStore = () => {
    const middlewares = [thunkMiddleware, loggerMiddleware];

    // production: 배포용
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(reducer, enhancer);

    // store.dispatch({
    //     type: 'CHANGE_NICKNAME',
    //     data: 'boogicho',å
    // })
    return store;

};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development'
});

export default wrapper;