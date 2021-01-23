// import React from 'react' > next는 생략가능

import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard';
import PostForm from '../components/form/PostForm';
import { useEffect } from 'react';
import { LOAD_POST_REQUEST } from '../reducers/post';


const Home = () => {
    const { me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost, loadPostLoading } = useSelector(state => state.post);

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch({
            type: LOAD_POST_REQUEST,
        })
    },[]);

    useEffect(() => {
        function onScroll(){
            // console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight); 
            //  마지막 scrollY + clientHeight = scrollHeight
            
            //  스크롤 다 내리면 새로운 게시글 로딩
            if (window.scrollY + document.documentElement.clientHeight  > document.documentElement.scrollHeight -300){
                if(hasMorePost && !loadPostLoading){
                    dispatch({
                        type: LOAD_POST_REQUEST,
                    })
                }
            }
        }
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    } , [hasMorePost, loadPostLoading]);

  

    return (
        <AppLayout>
            {me && <PostForm />}
            {/* 반복문이 있고 상태가 바뀌지 않을 때는 key=index해도 됨, 그러나 바뀔 때는 key = index하면 안됨 */}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    )
}

export default Home
