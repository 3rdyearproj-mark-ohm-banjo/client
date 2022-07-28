import React, {useState} from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import Button from '../Button'

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: ${SPACING['2X']};
  margin: 0 auto;
  gap: ${SPACING['4X']};
`

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${SPACING.LG};
`

const InputControl = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${SPACING.SM};

  > label {
    flex-shrink: 0;
  }
`

const TextArea = styled.textarea`
  padding: ${SPACING.SM};
  outline: none;
  border: 1px solid ${COLORS.GRAY_DARK};
  border-radius: ${SPACING.SM};
  font-family: ${FONTS.PRIMARY};
  width: 100%;
  resize: none;
`

const Input = styled.input`
  padding: ${SPACING.SM};
  outline: none;
  border: 1px solid ${COLORS.GRAY_DARK};
  border-radius: ${SPACING.SM};
  font-family: ${FONTS.PRIMARY};
  width: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const EditUserInfoForm = ({onSubmit, userInfo}) => {
  const [userData, setUserData] = useState(userInfo)
  const [errors, setErrors] = useState([])

  const onChange = (key, value) => {
    setUserData({...userData, [key]: value})
    setErrors(errors.filter((err) => err !== key))
  }

  return (
    <Form>
      <InputGroup>
        <InputControl>
          <label>ชื่อบัญชี</label>
          <Input
            type="text"
            placeholder="ชื่อบัญชี"
            disabled
            value={userData?.username}
          ></Input>
        </InputControl>
        <InputControl>
          <label>อีเมล</label>
          <Input
            type="text"
            placeholder="อีเมล"
            disabled
            value={userData?.email}
          ></Input>
        </InputControl>
      </InputGroup>

      <InputGroup>
        <InputControl>
          <label>ชื่อจริง</label>
          <Input
            type="text"
            placeholder="ชื่อจริง"
            onChange={(data) => onChange('firstname', data.target.value)}
            value={userData?.firstname}
          ></Input>
        </InputControl>
        <InputControl>
          <label>นามสกุล</label>
          <Input
            type="text"
            placeholder="นามสกุล"
            onChange={(data) => onChange('lastname', data.target.value)}
            value={userData?.lastname}
          ></Input>
        </InputControl>
      </InputGroup>

      <InputControl>
        <label>ที่อยู่สำหรับจัดส่ง</label>
        <TextArea
          type="text"
          placeholder="ที่อยู่สำหรับจัดส่ง"
          onChange={(data) => onChange('address', data.target.value)}
          value={userData?.address}
        ></TextArea>
      </InputControl>

      <InputControl>
        <label>เบอร์ติดต่อ</label>
        <Input
          type="tel"
          placeholder="เบอร์ติดต่อ"
          onChange={(data) => onChange('tel', data.target.value)}
          value={userData?.tel}
        ></Input>
      </InputControl>
      <ButtonWrapper>
        <Button borderRadius="4px">อัปเดตข้อมูล</Button>
      </ButtonWrapper>
    </Form>
  )
}

export default EditUserInfoForm
