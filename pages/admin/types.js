import React, {useState} from 'react'
import {AdminTitle} from '../../components/Admin'
import InputWithIcon from '../../components/forms/InputWithIcon'
import AdminLayout from '../../components/layouts/AdminLayout'
import {COLORS} from '../../styles/colors'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'
import Button from '../../components/Button'
import useAddType from '../../api/query/useAddType'
import {ICONS} from '../../config/icon'
import Head from 'next/head'

const InputWrapper = styled.div`
  max-width: 500px;
  background-color: ${COLORS.PURPLE_2};
  padding: ${SPACING.LG};
  border-radius: ${SPACING.MD};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};
  align-items: start;
`

const TypePage = () => {
  const [inputType, setInputType] = useState('')
  const {mutate: addType} = useAddType()

  const validate = () => {
    if (inputType.length < 1) {
      return 0
    }
    return 1
  }

  const submitType = () => {
    if (validate) {
      return addType(inputType)
    }
  }

  return (
    <>
      <Head>
        <title>ADMIN - จัดการข้อมูลประเภทของหนังสือ</title>
      </Head>
      <div>
        <AdminTitle>จัดการข้อมูลประเภทของหนังสือ</AdminTitle>
        <InputWrapper>
          <InputWithIcon
            label="ประเภทหนังสือ"
            placeholder="กรอกชื่อประเภทหนังสือ"
            onChange={setInputType}
            iconName={ICONS.faBook}
          ></InputWithIcon>

          <Button btnType="orangeGradient" onClick={submitType} btnSize="sm">
            เพิ่มประเภทใหม่
          </Button>
        </InputWrapper>
      </div>
    </>
  )
}

export default TypePage
TypePage.Layout = AdminLayout
