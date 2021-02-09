// post/[id].js
import React from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import axios from 'axios';

import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import { END } from 'redux-saga';


const Post = () =>  {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    // if(router.isFallback){
    //     return <div> 로딩중... </div>
    // }
    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'http://localhost:3060/favicon.ico'} />
                <meta property="og:url" content={`http://localhost:3060/post/${id}`} />
            </Head>
                <PostCard post={singlePost} />
        </AppLayout>
    );
};

// export async function getStaticPaths(){
//     return{
//         paths:[
//             { params: { id : '1' }},
//             { params: { id : '2' }},
//             { params: { id : '25' }},

//         ],
//         fallback: true,
//     };
// }

export const getServerSideProps = wrapper.getServerSideProps(async (context) =>{
    const cookie = context.req ? context.req.headers.cookie : '';

    // 조심! nextSSR할때 쿠키 공유문제
    axios.defaults.headers.Cookie = ''; 

    if(context.req && cookie ){ // 서버일 때 && 쿠키가 있을 때만 전송
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });
    
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});


export default Post;