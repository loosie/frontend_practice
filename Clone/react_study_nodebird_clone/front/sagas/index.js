import { all, call, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(){
    return axios.post('/api/post')
}

function* logIn(){
    try{
        const result = yield call(logInAPI);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        });
    }
    catch(err){
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        })
    }
}

function logOutAPI(){
    return axios.post('/api/post')
}

function* logOut(){
    try{
        const result = yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        });
    }
    catch(err){
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }
}

function addPostAPI(){
    return axios.post('/api/post')
}

function* addPost(){
    try{
        const result = yield call(addPostAPI);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data
        });
    }
    catch(err){
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        })
    }
}

function* watchLogin(){
    yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut(){
    yield take('LOG_OUT_REQUEST', logOut);
}

function* watchAddPost(){
    yield take('ADD_POST_REQUEST', addPost);
}


export default function* rootSaga(){
    yiled all([
        fork(watchLogin),
        fork(watchLogOut),
        fork(watchAddPost),
    ])
}