import React, { useState, useEffect } from 'react'
import Axios from 'axios'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)

    
    
     //* 구독하기
    const onSubscribe = () => {    
       
        //* userFrom : userId는 로그인할 때 localStorage에 넣어놔서 어디서든 사용할 수 있게 해놨음
        let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom} 

        //이미 구독중이라면
        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
                .then( res =>{
                    if(res.data.success){
                        setSubscribeNumber(SubscribeNumber - 1);
                        setSubscribed(!Subscribed);
                    }else{
                        alert('구독 취소하는데 실패했습니다.')
                    }
                })
        }
        //아직 구독중이 아니라면
        else{
            Axios.post('/api/subscribe/subscribe', subscribedVariable)
            .then( res =>{
                if(res.data.success){
                    setSubscribeNumber(SubscribeNumber + 1);
                    setSubscribed(!Subscribed);
                }else{
                    alert('구독하는데 실패했습니다.')
                }
            })

        }
    }

    useEffect(() => {
        let subscribedVariable = { userTo: props.userTo, userFrom: props.userFrom}
        Axios.post('/api/subscribe/subscribeNumber', subscribedVariable) // 작성자의 Id를 넣어서 그 사람의 구독자 정보를 받아옴
            .then( res => {
                if(res.data.success){
                    console.log(res.data.subscribeNumber);
                    setSubscribeNumber(res.data.subscribeNumber);
                }else{
                    alert('구독자 수 정보를 받아오지 못했습니다.')
                }
            })
            
        
        
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
                style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000' }`,
                        borderRadius: '4px', color: 'white', padding: '10px 16px',
                        fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed? 'Subscribed': 'Subscribe' }
            </button>
        </div>
    )
}

export default Subscribe
