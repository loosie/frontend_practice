import axios from 'axios';
import { delay, put, takeLatest, all, fork, throttle, call } from 'redux-saga/effects';
import shortid from 'shortid';
import {
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_OF_ME,
    generateDummyPost
} from '../reducers/post';
import { ADD_POST_TO_ME } from '../reducers/user';

function loadPostAPI(data){
    return axios.get('/api/post', data)
}

function* loadPost(action){
    try{
        // const result = yield call(loadPostAPI);
        const id = shortid.generate();
        yield delay(1000);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: generateDummyPost(10),
        });
    }
    catch(err){
        yield put({
            type: LOAD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function addPostAPI(data){
    return axios.post('/post', {content :data });
}

function* addPost(action){
    try{
        const result = yield call(addPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        });
    }
    catch(err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
}

function removePostAPI(data){
    return axios.delete('/api/post', data)
}

function* removePost(action){
    try{
        // const result = yield call(addPostAPI);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    }
    catch(err){
        console.log(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            data: err.response.data,
        })
    }
}


function addCommentAPI(data){
    return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action){
    console.log(action);
    try{
        const result = yield call(addCommentAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.log(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
}

function* watchLoadPost(){
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}


export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}