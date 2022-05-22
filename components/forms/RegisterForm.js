import React, {useState} from 'react'
import {register} from '../../api/request/userService'
import {ICONS} from '../../config/icon'
import {COLORS} from '../../styles/colors'
import Button from '../Button'
import {AuthFormWrapper} from '../Layout'
import InputWithIcon from './InputWithIcon'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'
import Icon from '../Icon'
import {validateEmail, validateTel} from '../../utils/validate'

const ButtonWrapper = styled.div`
  margin-top: ${SPACING.LG};
`

const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
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

const RegisterForm = ({onShowRegister, onShow}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    username: '',
    address: '',
    firstname: '',
    lastname: '',
    tel: '',
  })
  const [errors, setErrors] = useState([])

  const validate = () => {
    let errorArr = []

    Object.keys(userData).map((key) => {
      if (
        userData[key].length < 1 ||
        (key === 'email' && !validateEmail(userData.email)) ||
        (key === 'tel' && !validateTel(userData.tel))
      ) {
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
    if (validate()) {
      return await register(userData).then(() => onShowRegister(false))
    }
  }

  const onChange = (key, value) => {
    setUserData({...userData, [key]: value})
    setErrors(errors.filter((err) => err !== key))
  }

  return (
    <AuthFormWrapper>
      <NavWrap>
        <div onClick={() => onShowRegister(false)}>
          <Icon name={ICONS.faChevronLeft}></Icon>
          <span>เข้าสู่ระบบ</span>
        </div>
        <div onClick={() => onShow(false)}>
          <span>ปิด</span>
          <Icon name={ICONS.faXmark}></Icon>
        </div>
      </NavWrap>
      <form onSubmit={registerHandle}>
        <InputWithIcon
          label="อีเมล"
          type="text"
          iconName={ICONS.faEnvelope}
          onChange={(data) => onChange('email', data)}
          maxLength={60}
          placeholder="กรอกอีเมล"
        />

        {errors.indexOf('email') !== -1 && (
          <ErrMessage>กรุณากรอกอีเมลให้ถูกต้อง</ErrMessage>
        )}

        <InputWithIcon
          label="ชื่อผู้ใช้"
          type="text"
          iconName={ICONS.faUser}
          onChange={(data) => onChange('username', data)}
          maxLength={20}
          placeholder="กรอกชื่อผู้ใช้"
        />
        {errors.indexOf('username') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกชื่อผู้ใช้</ErrMessage>
        )}

        <InputWithIcon
          label="ชื่อจริง"
          type="text"
          iconName={ICONS.faUser}
          onChange={(data) => onChange('firstname', data)}
          maxLength={50}
          placeholder="กรอกชื่อ"
        />
        {errors.indexOf('firstname') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกชื่อของคุณ</ErrMessage>
        )}

        <InputWithIcon
          label="นามสกุล"
          type="text"
          iconName={ICONS.faUser}
          onChange={(data) => onChange('lastname', data)}
          maxLength={50}
          placeholder="กรอกนามสกุล"
        />
        {errors.indexOf('lastname') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกนามสกุล</ErrMessage>
        )}

        <InputWithIcon
          label="รหัสผ่าน"
          iconName={ICONS.faLock}
          inputType="password"
          maxLength={30}
          onChange={(data) => onChange('password', data)}
          placeholder="กรอกรหัสผ่าน"
        />

        {errors.indexOf('password') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกรหัสผ่าน</ErrMessage>
        )}

        <InputWithIcon
          label="ที่อยู่สำหรับจัดส่ง"
          iconName={ICONS.faLocationDot}
          inputType="textarea"
          onChange={(data) => onChange('address', data)}
          placeholder="ที่อยู่สำหรับจัดส่ง"
          maxLength={200}
        />

        {errors.indexOf('address') !== -1 && (
          <ErrMessage>คุณยังไม่ได้กรอกที่อยู่</ErrMessage>
        )}

        <InputWithIcon
          label="เบอร์โทร"
          iconName={ICONS.faPhone}
          inputType="tel"
          onChange={(data) => onChange('tel', data)}
          placeholder="กรอกเบอร์โทร"
          maxLength={10}
        />

        {errors.indexOf('tel') !== -1 && (
          <ErrMessage>กรุณากรอกเบอร์โทรให้ครบ 10 ตัวเลข</ErrMessage>
        )}

        <ButtonWrapper>
          <Button fullWidth btnSize="sm" bgColor={COLORS.RED_2} type="submit">
            สมัครสมาชิก
          </Button>
        </ButtonWrapper>
      </form>
    </AuthFormWrapper>
  )
}

export default RegisterForm
