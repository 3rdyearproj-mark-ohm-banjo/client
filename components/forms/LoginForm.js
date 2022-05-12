import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'
import {ICONS} from '../../config/icon'
import IconButton from '../IconButton'
import InputWithIcon from './InputWithIcon'
import {AuthFormWrapper} from '../Layout'
import {login} from '../../api/request/userService'
import UserContext from '../../context/userContext'

const Header = styled.div`
  text-align: center;

  > h4 {
    font-size: 20px;
    font-weight: 600;
  }
`

const HelperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${SPACING.SM};
  margin: ${SPACING.SM} 0 50px;
  font-size: 14px;

  > span:hover {
    cursor: pointer;
  }
`

const OtherLoginChoice = styled.div`
  margin: 20px 0;
`

const ChoiceHeader = styled.h5`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: ${SPACING.MD};
`

const ChoiceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.MD};
`

const LoginForm = ({onShowRegister}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {updateUser, user} = useContext(UserContext)
  const forgotPassword = () => {}

  const loginHandler = async (e) => {
    e.preventDefault()
    return await login(email, password).then((res) => {
      updateUser(res.data?.user)
    })
  }

  return (
    <AuthFormWrapper>
      <Header>
        <h4>ยินดีต้อนรับกลับ~</h4>
        <span>กรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ</span>
      </Header>
      <form onSubmit={loginHandler}>
        <InputWithIcon
          label="อีเมล"
          iconName={ICONS.faUser}
          inputType="email"
          onChange={setEmail}
          placeholder="กรอกอีเมล"
          maxLength={60}
        />
        <InputWithIcon
          label="รหัสผ่าน"
          iconName={ICONS.faLock}
          inputType="password"
          onChange={setPassword}
          placeholder="กรอกรหัสผ่าน"
          maxLength={30}
        />

        <HelperWrapper>
          <span onClick={() => onShowRegister(true)}>สร้างบัญชี</span>
          <span>ลืมรหัสผ่าน?</span>
        </HelperWrapper>

        <Button fullWidth btnSize="sm" bgColor={COLORS.RED_2} type="submit">
          เข้าสู่ระบบ
        </Button>
      </form>
      <OtherLoginChoice>
        <ChoiceHeader>หรือเข้าสู่ระบบด้วยบัญชี</ChoiceHeader>
        <ChoiceWrapper>
          <IconButton
            name={ICONS.faFacebook}
            iconSize="2x"
            onClick={() => {}}
          ></IconButton>
          <IconButton
            name={ICONS.faGoogle}
            iconSize="2x"
            onClick={() => {}}
          ></IconButton>
        </ChoiceWrapper>
      </OtherLoginChoice>
    </AuthFormWrapper>
  )
}

export default LoginForm
