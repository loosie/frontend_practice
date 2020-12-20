import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    useEffect(() => {
        
        let variable = { userTo: props.userTo}

        Axios.post('/api/subscribe/subscribeNumber', variable) // 작성자의 Id를 넣어서 그 사람의 구독자 정보를 받아옴
            .then( res => {
                if(res.data.success){
                    console.log(res.data.subscribeNumber);
                    setSubscribeNumber(res.data.subscribeNumber);
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })
            
            //* userFrom : userId는 로그인할 때 localStorage에 넣어놔서 어디서든 사용할 수 있게 해놨음
            let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')}
        
            //* 내가 해당 비디오 업로드한 유저를 구독하고 있는지 정보 가져오기
            Axios.post('/api/subscribe/subscribed', subscribedVariable)
                    .then(res=>{
                        if(res.data.success){
                            console.log(res.data.subscribed);
                            setSubscribed(res.data.subscribed);
                        }else{
                            alert('정보를 받아오지 못했습니다.');
                        }
                    })
            
    }, [])


    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribe ? '#CC0000' : '#AAAAAA'}`,
                        borderRadius: '4px', color: 'white', padding: '10px 16px',
                        fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
                onClick
            >
                {SubscribeNumber} {Subscribed? 'Subscribed': 'Subscribe' }
            </button>
        </div>
    )
}

export default Subscribe
