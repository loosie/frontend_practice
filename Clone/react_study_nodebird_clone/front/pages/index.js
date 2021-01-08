// import React from 'react' > next는 생략가능

import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout'
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';


const Home = () => {
    const { isLoggedIn } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    return (
        <AppLayout>
            {isLoggedIn && <PostForm />}
            {/* 반복문이 있고 상태가 바뀌지 않을 때는 key=index해도 됨, 그러나 바뀔 때는 key = index하면 안됨 */}
            {mainPosts.map((post) => <PostCard key={post.id} post={post}/> )}
        </AppLayout>
    )
}

export default Home
