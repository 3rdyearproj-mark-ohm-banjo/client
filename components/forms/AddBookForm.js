import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '../Button'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import {YEAR} from '../../config/currentTime'
import Icon from '../Icon'
import {ICONS, ICON_SIZE} from '../../config/icon'

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: ${SPACING.SM};
`

const UploadContainer = styled.section`
  width: 100%;
  background-color: ${COLORS.GRAY_LIGHT_3};
  min-height: 200px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%23A199a1aa' stroke-width='6' stroke-dasharray='10' stroke-dashoffset='82' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: ${SPACING.SM};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${COLORS.GRAY_DARK_1};

  > span {
    margin-bottom: ${SPACING.SM};
  }
`

const UploadButton = styled.label`
  background: ${COLORS.SECONDARY};
  color: ${COLORS.WHITE};
  height: 60px;
  width: 150px;
  border-radius: ${SPACING.SM};
  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    margin-right: ${SPACING.SM};
  }

  &:hover {
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms;
  }
`

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  color: ${COLORS.PRIMARY};
  margin-top: ${SPACING.SM};
  font-weight: 600;
`

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_DARK};
  height: 40px;
  font-family: ${FONTS.PRIMARY};
  padding: ${SPACING.SM};
  outline: none;
  font-size: 16px;

  &:focus {
    border-color: ${COLORS.PRIMARY};
    ${(props) => props.isError && 'border-color: red'}
  }

  ${(props) => props.isError && 'border-color: red'}
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${SPACING['4X']};

  > button:first-child {
    margin-right: ${SPACING.SM};
  }
`

const AddBookForm = ({onStepChange}) => {
  const [bookData, setBookData] = useState({
    image: '',
    name: '',
    author: '',
    firstYearOfPublication: '',
  })

  const [ISBN, setISBN] = useState('')
  const [errors, setErrors] = useState({})

  const submitForm = () => {}

  const onChangeISBN = (e) => {
    if (
      ISBN.length === 3 ||
      ISBN.length === 6 ||
      ISBN.length === 12 ||
      ISBN.length === 15
    ) {
      e.target.value = e.target.value + '-'
    }
    setISBN(e.target.value)
  }

  const handleYear = (value) => {
    if (!value.match(/\d/g) && value.length > 0) {
      return
    } else if (value < 0 || (value > YEAR && value.length > 3)) {
      setErrors({...errors, year: true})
    } else {
      setErrors({...errors, year: false})
    }
    setBookData({
      ...bookData,
      firstYearOfPublication: value,
    })
  }

  return (
    <>
      <Title>กรอกข้อมูลหนังสือของคุณ</Title>
      <UploadContainer>
        <span>ลากและวางไฟล์รูปภาพหนังสือที่นี่</span>
        <UploadButton htmlFor="file-upload">
          <Icon name={ICONS.faDownload} size={ICON_SIZE['lg']} />
          <span>อัปโหลดไฟล์</span>
          <input
            id="file-upload"
            type="file"
            onChange={(e) => setBookData({...bookData, image: e})}
            hidden
          />
        </UploadButton>
      </UploadContainer>
      <form>
        <InputControl>
          <Label>ISBN</Label>
          <Input
            type="text"
            onChange={onChangeISBN}
            value={bookData?.isbn}
            maxLength="18"
            pattern="\d*"
            placeholder="ISBN"
          ></Input>
        </InputControl>
        <InputControl>
          <Label>ชื่อหนังสือ</Label>
          <Input
            type="text"
            onChange={(e) => setBookData({...bookData, name: e.target.value})}
            value={bookData?.name}
            placeholder="กรอกชื่อหนังสือ"
          ></Input>
        </InputControl>

        <InputControl>
          <Label>ชื่อผู้แต่ง</Label>
          <Input
            type="text"
            onChange={(e) => setBookData({...bookData, author: e.target.value})}
            value={bookData?.author}
            placeholder="กรอกชื่อผู้แต่ง"
          ></Input>
        </InputControl>
        <InputControl>
          <Label>ปีที่พิมพ์ครั้งแรก</Label>
          <Input
            type="text"
            onChange={(e) => handleYear(e.target.value)}
            value={bookData?.firstYearOfPublication}
            placeholder="ปีที่พิมพ์ครั้งแรก"
            maxLength="4"
            isError={errors?.year}
          ></Input>
        </InputControl>
      </form>

      <ButtonWrapper>
        <Button
          onClick={() => onStepChange(0)}
          btnType="whiteBorder"
          btnSize="sm"
        >
          ย้อนกลับ
        </Button>
        <Button btnSize="sm" onClick={() => submitForm()}>
          ยืนยัน
        </Button>
      </ButtonWrapper>
    </>
  )
}

AddBookForm.propTypes = {
  onStepChange: PropTypes.func,
}

export default AddBookForm
