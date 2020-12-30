import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){

    // null => 아무나 출입이 가능
    // ture => 로그인한 유저만 출입이 가능
    // false => 로그인한 유저는 출입 불가능

    //adminRoute : admin만 접근 가능하게하려면 true

    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
            
            dispatch(auth()).then(res => {
                console.log(res);

                // 로그인 하지 않은 상태
                if(!res.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }
                // 로그인 상태
                else{
                    if(adminRoute && !res.payload.isAdmin){
                        props.history.push('/')
                    }
                    else {
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                        
                }

                
            })


        }, [])

        // HOC에서 Route가 제공한 props를 그대로 리턴해주면 withRouter()를 각 페이지 컴포넌트에 적용할 필요 없음
        // <SpecificComponent {...props} /> 
        return(
            <SpecificComponent {...props} />
        )
    }

    return AuthenticationCheck;
}