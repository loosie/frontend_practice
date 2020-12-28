import React from 'react'
import { Container, FormWrap, Icon, FormContent,
    Form, FormH1, FormLabel, FormInput, FormButton, Text} from './SigninElements'

const SingIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">bluedot</Icon>
                    <FormContent>
                        <Form actiono="#">
                            <FormH1>Sign in to your</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required />
                            <FormButton type='submit'>Continue</FormButton>
                            <Text>Forgot password</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SingIn
