import React, { useEffect, useCallback, useState } from 'react'
import AppLayout from '../components/AppLayout'
import Router from 'next/router';
import Head from 'next/head'
import FollowList from '../components/FollowList'
import NicknameEditForm from '../components/form/NicknameEditForm'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr';

import axios from 'axios';
import { END } from 'redux-saga';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';


const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
    // const dispatch = useDispatch();

    const { me } = useSelector((state) => state.user);
    const [followersLimit, setFollowersLimit] = useState(3);
    const [followingsLimit, setFollowingsLimit] = useState(3);

    const { data: followersData, error: followerError } = useSWR(`http://localhost:3065/user/followers?limit=${followersLimit}`, fetcher);
    const { data: followingsData, error: followingError } = useSWR(`http://localhost:3065/user/followings?limit=${followingsLimit}`, fetcher);


    

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_FOLLOWERS_REQUEST,
    //     });
    //     dispatch({
    //         type: LOAD_FOLLOWINGS_REQUEST,
    //     });
    // }, []);
    
    useEffect(() => {
        if(!(me && me.id)){
            Router.push('/');
        }
       
    }, [me && me.id]);

    const loadMoreFollowers = useCallback(() => {
        setFollowersLimit((prev) => prev+3);
    }, []);

    const loadMoreFollowings = useCallback(() => {
        setFollowingsLimit((prev) => prev+3);
    }, []);


    if(!me){
        return null;
    }


    if( followerError || followingError ){
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생합니다.';
    }

    return (

        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError} />
                <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError} />
            </AppLayout>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) =>{
    console.log('getServerSideProps Start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';

    // 조심! nextSSR할때 쿠키 공유문제
    axios.defaults.headers.Cookie = ''; 

    if(context.req && cookie ){ // 서버일 때 && 쿠키가 있을 때만 전송
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
    });

    context.store.dispatch(END);
    console.log('getServerSideProps End');
    await context.store.sagaTask.toPromise();
});


export default Profile
