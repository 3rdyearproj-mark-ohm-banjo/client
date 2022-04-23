import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Button from '../Button'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import {YEAR} from '../../config/currentTime'
import Icon from '../Icon'
import {ICONS, ICON_SIZE} from '../../config/icon'
import {useDropzone} from 'react-dropzone'

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

const UploadButtonSmSize = css`
  width: 120px;
  height: 40px;
  font-size: 14px;
`

const UploadButton = styled.label`
  background: ${COLORS.SECONDARY};
  color: ${COLORS.WHITE};
  height: 50px;
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

  ${(props) => props.size === 'sm' && UploadButtonSmSize}
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

const ImagePreview = styled.img`
  max-height: 400px;
  margin: 0 auto ${SPACING.MD};
  border-radius: ${SPACING.SM};
`

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${SPACING.SM};
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
const ErrorText = styled.span`
  font-size: 12px;
  color: red;
`

const AddBookForm = ({onStepChange}) => {
  const [bookData, setBookData] = useState({
    isbn: '',
    name: '',
    author: '',
    firstYearOfPublication: '',
  })
  const [imageFile, setImageFile] = useState([])
  const [errors, setErrors] = useState([])
  const {getRootProps} = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setImageFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  useEffect(() => {
    if (imageFile.length === 1) {
      setErrors(errors.filter((err) => err !== 'image'))
    }
    return () => {
      setErrors([])
    }
  }, [imageFile])

  const validate = () => {
    let errArr = [...errors]
    Object.keys(bookData).map((key) => {
      if (bookData[key].length < 1 || !bookData[key]) {
        errArr.push(key)
      } else {
        errArr = errArr.filter((err) => err !== key)
      }
    })

    if (imageFile.length < 1) {
      errArr.push('image')
    }

    if (errArr.length > 0) {
      setErrors(errArr)
      return 0
    } else {
      return 1
    }
  }

  const submitForm = () => {
    if (validate()) {
      // post function here
    }
  }

  const onChange = (key, value) => {
    setBookData({...bookData, [key]: value})
    setErrors(errors.filter((err) => err !== key))
  }

  const onChangeIsbn = (e) => {
    if (
      (e.target.value.match(/^([^-.0-9]*)$/) && e.target.value.length > 0) ||
      (/[a-zA-Z]/.test(e.target.value) && e.target.value.length > 0)
    ) {
      return
    }
    if (
      (e.target.value.length === 3 &&
        e.target.value.length > bookData.isbn.length) ||
      (e.target.value.length === 6 &&
        e.target.value.length > bookData.isbn.length) ||
      (e.target.value.length === 12 &&
        e.target.value.length > bookData.isbn.length) ||
      (e.target.value.length === 15 &&
        e.target.value.length > bookData.isbn.length)
    ) {
      return setBookData({...bookData, isbn: e.target.value + '-'})
    }

    if (
      e.target.value.length === 17 &&
      e.target.value.replaceAll('-', '').length !== 13
    ) {
      setErrors([...errors, 'isbn'])
    } else {
      setBookData({...bookData, isbn: e.target.value})
      setErrors(errors.filter((err) => err !== 'isbn'))
    }
  }

  const handleYear = (value) => {
    if (!value.match(/\d/g) && value.length > 0) {
      return
    } else if (value < 0 || (value > YEAR && value.length > 3)) {
      setErrors([...errors, 'firstYearOfPublication'])
    } else {
      setErrors(errors.filter((err) => err !== 'firstYearOfPublication'))
    }
    setBookData({
      ...bookData,
      firstYearOfPublication: value,
    })
  }

  return (
    <>
      <Title>กรอกข้อมูลหนังสือของคุณ</Title>
      {imageFile.length < 1 ? (
        <>
          <UploadContainer>
            <span>ลากและวางไฟล์รูปภาพหนังสือที่นี่</span>

            <UploadButton {...getRootProps()}>
              <Icon name={ICONS.faDownload} size={ICON_SIZE['lg']} />
              <span>อัปโหลดไฟล์</span>
            </UploadButton>
          </UploadContainer>
        </>
      ) : (
        <>
          <label {...getRootProps()}>
            <ImageContainer>
              <ImagePreview src={imageFile[0]?.preview} />
            </ImageContainer>
          </label>
          <UploadButton {...getRootProps()} size="sm">
            <Icon name={ICONS.faDownload} size={ICON_SIZE['lg']} />
            <span>เปลี่ยนภาพ</span>
          </UploadButton>
        </>
      )}
      {errors.indexOf('image') !== -1 && (
        <ErrorText>กรุณาใส่รูปภาพของหนังสือ</ErrorText>
      )}

      <form>
        <InputControl>
          <Label>ISBN</Label>
          <Input
            type="text"
            onChange={onChangeIsbn}
            value={bookData?.isbn}
            maxLength="17"
            placeholder="isbn"
            isError={errors.indexOf('isbn') !== -1}
          ></Input>
          {errors.indexOf('isbn') !== -1 && (
            <ErrorText>
              กรุณากรอก isbn เป็นตัวเลขจำนวน 13 หลัก (XXX-XX-XXXXX-XX-X)
            </ErrorText>
          )}
        </InputControl>
        <InputControl>
          <Label>ชื่อหนังสือ</Label>
          <Input
            type="text"
            onChange={(e) => onChange('name', e.target.value)}
            value={bookData?.name}
            placeholder="กรอกชื่อหนังสือ"
            isError={errors.indexOf('name') !== -1}
          ></Input>
          {errors.indexOf('name') !== -1 && (
            <ErrorText>กรุณากรอกชื่อหนังสือ</ErrorText>
          )}
        </InputControl>

        <InputControl>
          <Label>ชื่อผู้แต่ง</Label>
          <Input
            type="text"
            onChange={(e) => onChange('author', e.target.value)}
            value={bookData?.author}
            placeholder="กรอกชื่อผู้แต่ง"
            isError={errors.indexOf('author') !== -1}
          ></Input>
          {errors.indexOf('author') !== -1 && (
            <ErrorText>กรุณากรอกชื่อผู้แต่ง</ErrorText>
          )}
        </InputControl>
        <InputControl>
          <Label>ปีที่พิมพ์ครั้งแรก</Label>
          <Input
            type="text"
            onChange={(e) => handleYear(e.target.value)}
            value={bookData?.firstYearOfPublication}
            placeholder="ปีที่พิมพ์ครั้งแรก"
            maxLength="4"
            isError={errors.indexOf('firstYearOfPublication') !== -1}
          ></Input>
          {errors.indexOf('firstYearOfPublication') !== -1 && (
            <ErrorText>
              กรุณากรอกปีที่พิมพ์ครั้งแรก และไม่เกินปี {YEAR}
            </ErrorText>
          )}
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
