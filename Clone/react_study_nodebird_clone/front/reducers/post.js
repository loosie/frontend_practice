import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initialState = {
    mainPosts: [
    //     {
    //     id: 1,
    //     User: {
    //         id: 1,
    //         nickname: 'loosie',
    //     },
    //     content: '첫 번째 게시글 #해시태그 #익스프레스',
    //     Images: [{
    //         id: shortId.generate(),
    //         src: 'https://i.pinimg.com/originals/05/8d/5e/058d5e4b595686316522dee2cb987292.jpg'
    //     },
    //     {
    //         id: shortId.generate(),
    //         src: 'https://i.pinimg.com/564x/0c/8a/b3/0c8ab3a08066fde463d3b618bc3d9837.jpg'
    //     },
    //     {
    //         id: shortId.generate(),
    //         src: 'https://i.pinimg.com/564x/37/b1/26/37b126cd0d37cfa4365511d150826c1c.jpg'
    //     },
        
    //    ],
        
    //     Comments: [{
    //         id: shortId.generate(),
    //         User: {
    //             id: shortId.generate(),
    //             nickname: 'nero'
    //         },
    //         content: '우아 대박이네요~'
    //     },{
    //         id: shortId.generate(),
    //         User: {
    //             id: shortId.generate(),
    //             nickname: 'kozy'
    //         },
    //         content: '오 굳굳이에요'
    //     }]
    // }
    ],
    imagePaths: [],
    hasMorePost: true, // 게시글 더 불러오기
    likePostLoading: false,
    likePostDone: false,
    likePostError: null,
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: null,
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

// 서버에서 20개씩 데이터를 불러오는 경우 시뮬레이션 
export const generateDummyPost = (number) => Array(number).fill().map(() => ({
    id: shortId.generate(),
    User: {
        id: shortId.generate(),
        nickname: faker.name.findName()
    },
    content: faker.lorem.paragraph(),
    Images: [{
        src: faker.image.image(),
    }],
    Comments: [{
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName()
        },
        content: faker.lorem.sentence(),
    }],
}));

// 설정안하여도 saga에서 디폴트로 10개씩 불러옴
// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

// export const addPost = (data) => ({
//     type: ADD_POST_REQUEST,
//     data,
// });

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

// const dummyPost =(data) => ({
//     id: data.id,
//     content: data.content,
//     User: {
//         id: 1,
//         nickname: 'loosie'
//     },
//     Images: [],
//     Comments: [],
// });

// const dummyComment = (data) => ({
//     id: shortId.generate(),
//     content: data,
//     User: {
//         id: 1,
//         nickname: 'loosie'
//     },
// })

const reducer = (state = initialState, action) =>{
    return produce(state, (draft) => {
        switch (action.type){
            case LIKE_POST_REQUEST:
                draft.likePostLoading = true;
                draft.likePostDone = false;
                draft.likePostError = null;
                break;
            case LIKE_POST_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers.push({ id: action.data.UserId });
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case LIKE_POST_FAILURE:
                draft.likePostLoading = false;
                draft.likePostError = action.error;
                break;
                
            case UNLIKE_POST_REQUEST:
                draft.unlikePostLoading = true;
                draft.unlikePostDone = false;
                draft.unlikePostError = null;
                break;
            case UNLIKE_POST_SUCCESS:{
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
                draft.likePostLoading = false;
                draft.likePostDone = true;
                break;
            }
            case UNLIKE_POST_FAILURE:
                draft.unlikePostLoading = false;
                draft.unlikePostError = action.error;
                break;  

            case LOAD_POST_REQUEST:
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break;
            case LOAD_POST_SUCCESS:
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.mainPosts = action.data.concat(draft.mainPosts);
                draft.hasMorePost = draft.mainPosts.length < 50; //  게시글이 50개 이상이면 false (50개씩만 불러오기)
                break;
            case LOAD_POST_FAILURE:
                draft.loadPostLoading = false;
                draft.loadPostError = action.error;
                break;

            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(action.data);
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;

        
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
                post.Comments.unshift(action.data);
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
    
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;

            default:
                break;
            }
    });
    
    
}


export default reducer;