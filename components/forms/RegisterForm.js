import React, {useState} from 'react'
import {register} from '../../api/request/userService'
import {ICONS} from '../../config/icon'
import {COLORS} from '../../styles/colors'
import Button from '../Button'
import {AuthFormWrapper} from '../Layout'
import InputWithIcon from './InputWithIcon'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'

const ButtonWrapper = styled.div`
  margin-top: ${SPACING.LG};
`

const RegisterForm = ({showLoginForm}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
    address: '',
    tel: '',
  })
  const [errors, setErrors] = useState([])

  const validate = () => {
    let errorArr = []

    Object.keys(userData).map((key) => {
      if (userData[key].length < 1) {
        errorArr.push(key)
      }
    })

    if (errorArr.length > 0) {
      setErrors(errorArr)
      return 0
    } else {
      return 1
    }
  }

  const registerHandle = async (e) => {
    e.preventDefault()
    if (validate) {
      return await register(userData).then(() => showLoginForm(true))
    }
  }

  const onChange = (key, value) => {
    setUserData({...userData, [key]: value})
    setErrors(errors.filter((err) => err !== key))
  }

  return (
    <AuthFormWrapper>
      <form onSubmit={registerHandle}>
        <InputWithIcon
          label="อีเมล"
          type="text"
          iconName={ICONS.faEnvelope}
          onChange={(data) => onChange('email', data)}
          maxLength={60}
          placeholder="กรอกอีเมล"
        />
        <InputWithIcon
          label="ชื่อผู้ใช้"
          type="text"
          iconName={ICONS.faUser}
          onChange={(data) => onChange('username', data)}
          maxLength={20}
          placeholder="กรอกชื่อผู้ใช้"
        />
        <InputWithIcon
          label="รหัสผ่าน"
          iconName={ICONS.faLock}
          inputType="password"
          maxLength={30}
          onChange={(data) => onChange('password', data)}
          placeholder="กรอกรหัสผ่าน"
        />

        <InputWithIcon
          label="ที่อยู่สำหรับจัดส่ง"
          iconName={ICONS.faLocationDot}
          inputType="textarea"
          onChange={(data) => onChange('address', data)}
          placeholder="ที่อยู่สำหรับจัดส่ง"
          maxLength={200}
        />

        <InputWithIcon
          label="เบอร์โทร"
          iconName={ICONS.faPhone}
          inputType="tel"
          onChange={(data) => onChange('tel', data)}
          placeholder="กรอกเบอร์โทร"
          maxLength={10}
        />

        <ButtonWrapper>
          <Button
            fullWidth
            btnSize="sm"
            bgColor={COLORS.RED_2}
            onClick={registerHandle}
          >
            สมัครสมาชิก
          </Button>
        </ButtonWrapper>
      </form>
    </AuthFormWrapper>
  )
}

export default RegisterForm
