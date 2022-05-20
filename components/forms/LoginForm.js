import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'
import {ICONS} from '../../config/icon'
import InputWithIcon from './InputWithIcon'
import {AuthFormWrapper} from '../Layout'
import {login} from '../../api/request/userService'
import UserContext from '../../context/userContext'
import Icon from '../Icon'
import {validateEmail} from '../../utils/validate'
import {GoogleLogin} from 'react-google-login'

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

const NavWrap = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: ${SPACING.MD};

  > div {
    display: flex;
    align-items: center;
    gap: ${SPACING.MD};
    cursor: pointer;
  }
`

const ErrMessage = styled.div`
  background-color: ${COLORS.RED_2};
  color: ${COLORS.WHITE};
  padding: 2px ${SPACING.MD};
  border-radius: ${SPACING.MD};
  width: max-content;
  margin: ${SPACING.LG} 0;
  font-size: 14px;
  font-weight: 600;
`

const LoginForm = ({onShowRegister, onSuccess, onShow}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser, setIsAuth, setTotalBookDonation} = useContext(UserContext)
  const forgotPassword = () => {}
  const [resErrStatus, setResErrStatus] = useState()
  const [error, setError] = useState([])

  const validate = () => {
    let errArr = []
    if (email.length < 1 || !validateEmail(email)) {
      errArr.push('email')
    }
    if (password.length < 1) {
      errArr.push('password')
    }

    if (errArr.length > 0) {
      setError(errArr)
      return 0
    }
    return 1
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    if (validate()) {
      return await login(email, password)
        .then((res) => {
          setUser(res.data?.user)
          setIsAuth(true)
          setTotalBookDonation(res.data?.user?.donationHistory?.length)
          console.log(res.data?.user)
          onSuccess()
        })
        .catch((err) => {
          console.log(err)
          setResErrStatus(err.response.status)
        })
    }
  }

  useEffect(() => {
    if (email.length > 0) {
      setError((errs) => errs.filter((err) => err !== 'email'))
    }
  }, [email])

  useEffect(() => {
    if (password.length > 0) {
      setError((errs) => errs.filter((err) => err !== 'password'))
    }
  }, [password])

  const googleLogin = (data) => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, data)
  }

  const googleLoginFailed = (data) => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, data)
  }

  return (
    <AuthFormWrapper>
      <NavWrap>
        <div onClick={() => onShow(false)}>
          <span>ปิด</span>
          <Icon name={ICONS.faXmark}></Icon>
        </div>
      </NavWrap>
      <Header>
        <h4>ยินดีต้อนรับกลับ~</h4>
        <span>กรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ</span>
      </Header>
      {resErrStatus === 422 && (
        <ErrMessage>โปรดลองอีกครั้ง, อีเมลหรือรหัสผ่านไม่ถูกต้อง</ErrMessage>
      )}
      <form onSubmit={loginHandler}>
        <InputWithIcon
          label="อีเมล"
          iconName={ICONS.faUser}
          inputType="email"
          onChange={setEmail}
          placeholder="กรอกอีเมล"
          maxLength={60}
        />
        {error.indexOf('email') !== -1 && (
          <ErrMessage>กรุณากรอกอีเมลให้ถูกต้อง</ErrMessage>
        )}
        <InputWithIcon
          label="รหัสผ่าน"
          iconName={ICONS.faLock}
          inputType="password"
          onChange={setPassword}
          placeholder="กรอกรหัสผ่าน"
          maxLength={30}
        />
        {error.indexOf('password') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกรหัสผ่าน</ErrMessage>
        )}

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
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
            buttonText="เข้าสู่ระบบด้วย Google"
            onSuccess={googleLogin}
            onFailure={googleLoginFailed}
            cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
        </ChoiceWrapper>
      </OtherLoginChoice>
    </AuthFormWrapper>
  )
}

export default LoginForm
