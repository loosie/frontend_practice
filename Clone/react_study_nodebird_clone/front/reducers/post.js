export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'loosie',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://i.pinimg.com/originals/05/8d/5e/058d5e4b595686316522dee2cb987292.jpg'
        },
        {
            src: 'https://i.pinimg.com/564x/0c/8a/b3/0c8ab3a08066fde463d3b618bc3d9837.jpg'
        },
        {
            src: 'https://i.pinimg.com/564x/37/b1/26/37b126cd0d37cfa4365511d150826c1c.jpg'
        },
        
       ],
        
        Comments: [{
            User: {
                nickname: 'nero'
            },
            content: '우아 대박이네요~'
        },{
            User: {
                nickname: 'kozy'
            },
            content: '오 굳굳이에요'
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost ={
    id: 2,
    content: '더미데이터입니다',
    User: {
        id: 1,
        nickname: 'loosie'
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) =>{
    switch (action.type){
        case ADD_POST_REQUEST:
            return{
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
        }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }

        case ADD_COMMENT_REQUEST:
            return{
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addCommentLoading: false,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        default:
            return state;
    }
}


export default reducer;