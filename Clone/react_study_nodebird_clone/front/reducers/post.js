export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'loosie',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: '../../../images/image1.jpg'
        }],
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
    postAdded: false,
}

const ADD_POST = 'ADD_POST';

export const addPost ={
    type: ADD_POST,
}

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
        case ADD_POST:
            return {
            ...state,
            mainPosts: [dummyPost, ...state.mainPosts],
            postAdded: true
        }
        default:
            return state;
    }
}


export default reducer;