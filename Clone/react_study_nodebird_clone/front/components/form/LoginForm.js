import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useinput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../../reducers/user';

const BtnWrapper = styled.div`
    margin-top: 10px;
`;

const FormWrapper = styled(Form)`
    padding: 10px;
`;

const LoginForm = () => {

    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    useEffect(() => {
        if(logInError){
            alert(logInError);
        }
    }, [logInError]);

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    } ,[email, password]);
    

    // useMemo (useCallback은 함수를 캐싱하고 useMemo는 값을 캐싱)
    // const style = useMemo(()  => ({marginTop: 100}), []);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">이메일</label>
                <br />
                <Input name="user-id" type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input 
                    name="user-password"
                    type="password"
                    value={password} 
                    onChange={onChangePassword} 
                    required 
                />
            </div>
            <BtnWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </BtnWrapper>
            <div>
                
            </div>

        </FormWrapper>
    )
}


export default LoginForm
