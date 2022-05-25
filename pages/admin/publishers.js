import React, {useState} from 'react'
import useAddPublisher from '../../api/query/useAddPublisher'
import {AdminTitle} from '../../components/Admin'
import Button from '../../components/Button'
import InputWithIcon from '../../components/forms/InputWithIcon'
import AdminLayout from '../../components/layouts/AdminLayout'
import {ICONS} from '../../config/icon'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
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

const PublisherPage = () => {
  const [inputPublisher, setInputPublisher] = useState('')
  const {mutate: addPublisher} = useAddPublisher()

  const validate = () => {
    if (inputPublisher.length < 1) {
      return 0
    }
    return 1
  }

  const submitPublisher = () => {
    if (validate) {
      return addPublisher(inputPublisher)
    }
  }

  return (
    <>
      <Head>
        <title>ADMIN - จัดการข้อมูลของสำนักพิมพ์</title>
      </Head>
      <div>
        <AdminTitle>จัดการข้อมูลของสำนักพิมพ์</AdminTitle>
        <InputWrapper>
          <InputWithIcon
            label="ชื่อสำนักพิมพ์"
            placeholder="กรอกชื่อสำนักพิมพ์"
            onChange={setInputPublisher}
            iconName={ICONS.faBook}
          ></InputWithIcon>

          <Button
            btnType="orangeGradient"
            onClick={submitPublisher}
            btnSize="sm"
          >
            เพิ่มสำนักพิมพ์ใหม่
          </Button>
        </InputWrapper>
      </div>
    </>
  )
}

export default PublisherPage
PublisherPage.Layout = AdminLayout
