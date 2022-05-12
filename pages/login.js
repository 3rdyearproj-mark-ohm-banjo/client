import React, {useState} from 'react'
import styled from 'styled-components'
import {ModalBackground, ModalContainer} from '../components/Modal'
import LoginForm from '../components/forms/LoginForm'
import RegisterForm from '../components/forms/RegisterForm'

const PageBanner = styled.div`
  height: 100%;
  width: 100%;
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false)

  return (
    <ModalBackground>
      <ModalContainer maxWidth="975px" maxHeight="600px">
        <ContentWrapper>
          <PageBanner></PageBanner>
          {showRegister ? (
            <RegisterForm></RegisterForm>
          ) : (
            <LoginForm onShowRegister={setShowRegister}></LoginForm>
          )}
        </ContentWrapper>
      </ModalContainer>
    </ModalBackground>
  )
}

export default LoginPage
