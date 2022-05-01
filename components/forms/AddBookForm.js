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
import {TYPES} from '../../config/types-mockup'
import SearchDropdown from '../SearchDropdown'
import {PUBLISHERS} from '../../config/publisher-mockup'
import {ISBN_LIST} from '../../config/isbn-mockup'
import {BOOK_SHELF} from '../../config/bookshelf-mockup'
import typeService from '../../api/typeService'
import shelfService from '../../api/shelfService'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

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

const SuggestInputContainer = styled.div`
  position: relative;
`

const SuggestContainer = styled.div`
  position: absolute;
  width: 100%;
  z-index: 100;
  overflow-y: auto;
  max-height: 200px;
  background: ${COLORS.GRAY_LIGHT_1};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  border-radius: 8px;
`

const SuggestItem = styled.div`
  padding: 12px 8px;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid ${COLORS.GRAY_LIGHT_2};
  outline: none;

  &:hover {
    color: ${COLORS.WHITE};
    background-color: ${COLORS.PRIMARY};
  }
`

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${SPACING.SM};
  width: 100%;
  position: relative;

  @media (min-width: 768px) {
    ${(props) => props.width && `width: ${props.width}`}
  }
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
  width: 100%;

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

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`

const TypeItem = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  padding: 4px 12px;
  background-color: ${COLORS.PRIMARY};
  border-radius: 6px;
  color: ${COLORS.WHITE};
  gap: 8px;
  cursor: pointer;
  transition: 200ms;

  &:hover {
    opacity: 0.7;
  }

  ${(props) => props.disabled && 'opacity: 0.6;'}
`

const AddBookForm = ({onStepChange}) => {
  const defaultBookData = {
    isbn: '',
    name: '',
    author: '',
    firstYearOfPublication: '',
    types: [],
    publisher: '',
  }

  const [bookData, setBookData] = useState(defaultBookData)
  const [imageFile, setImageFile] = useState([])
  const [errors, setErrors] = useState([])
  const [disabledAll, setDisabledAll] = useState(false)
  const {getRootProps} = useDropzone({
    disabled: disabledAll,
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
    if (bookData?.image) {
      setImageFile([{preview: bookData?.image}])
    }
  }, [bookData])

  useEffect(() => {
    if (imageFile.length > 0) {
      setErrors(errors?.filter((err) => err !== 'image'))
    }
    return () => {
      setErrors([])
    }
  }, [imageFile])

  const validate = () => {
    let errArr = [...errors]
    Object.keys(bookData).map((key) => {
      if (
        (typeof bookData[key] !== 'number' && !bookData[key]) ||
        (Array.isArray(bookData[key]) && bookData[key].length < 1)
      ) {
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
      shelfService.addShelf(bookData, imageFile)
    }
  }

  const onChange = (key, value) => {
    setBookData({...bookData, [key]: value})
    setErrors(errors.filter((err) => err !== key))
  }

  const onChangeIsbn = (isbn) => {
    if (
      (isbn.match(/^([^-.0-9]*)$/) && isbn.length > 0) ||
      (/[a-zA-Z]/.test(isbn) && isbn.length > 0)
    ) {
      return
    }
    if (
      (isbn.length === 3 && isbn.length > bookData.isbn.length) ||
      (isbn.length === 6 && isbn.length > bookData.isbn.length) ||
      (isbn.length === 12 && isbn.length > bookData.isbn.length) ||
      (isbn.length === 15 && isbn.length > bookData.isbn.length)
    ) {
      return setBookData({...bookData, isbn: isbn + '-'})
    }

    if (isbn.length === 17 && isbn.replaceAll('-', '').length !== 13) {
      setErrors([...errors, 'isbn'])
    } else {
      setBookData({...bookData, isbn})
      setErrors(errors.filter((err) => err !== 'isbn'))
    }
  }

  const onSuggestClick = (isbn) => {
    shelfService.getShelfByIsbn(isbn)
    setBookData(BOOK_SHELF)
    setDisabledAll(true)
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

  const onClickType = (type) => {
    if (bookData.types.indexOf(type) !== -1) {
      return setBookData({
        ...bookData,
        types: [...bookData.types.filter((item) => item !== type)],
      })
    }
    setErrors(errors.filter((err) => err !== 'types'))
    setBookData({...bookData, types: [...bookData.types, type]})
  }

  const removeType = (type) => {
    setBookData({
      ...bookData,
      types: [...bookData.types.filter((item) => item !== type)],
    })
  }

  const onClickPublisher = (pubId) => {
    setErrors(errors.filter((err) => err !== 'publisher'))
    setBookData({...bookData, publisher: pubId})
  }

  useEffect(() => {
    if (
      (bookData?.isbn.length === 17 && bookData?.isbn !== BOOK_SHELF.isbn) ||
      bookData?.isbn.length < 17
    ) {
      setDisabledAll(false)
    } else if (
      bookData?.isbn.length === 17 &&
      bookData?.isbn === BOOK_SHELF.isbn
    ) {
      setDisabledAll(true)
    }
  }, [bookData])

  return (
    <>
      <Title>กรอกข้อมูลหนังสือของคุณ</Title>
      {!bookData?.image && imageFile.length < 1 ? (
        <>
          <UploadContainer {...getRootProps()}>
            <span>ลากและวางไฟล์รูปภาพหนังสือที่นี่</span>

            <UploadButton>
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
          {!disabledAll && (
            <UploadButton {...getRootProps()} size="sm">
              <Icon name={ICONS.faDownload} size={ICON_SIZE['lg']} />
              <span>เปลี่ยนภาพ</span>
            </UploadButton>
          )}
        </>
      )}
      {errors?.indexOf('image') !== -1 && (
        <ErrorText>กรุณาใส่รูปภาพของหนังสือ</ErrorText>
      )}

      <Form>
        <InputControl>
          <Label>ISBN</Label>
          <SuggestInputContainer>
            <Input
              type="text"
              onChange={(e) => onChangeIsbn(e.target.value)}
              value={bookData?.isbn}
              maxLength="17"
              placeholder="ISBN"
              isError={errors?.indexOf('isbn') !== -1}
            ></Input>
            {bookData?.isbn.length > 0 && bookData?.isbn.length < 17 && (
              <SuggestContainer>
                {ISBN_LIST.map((isbn, i) => {
                  if (isbn.startsWith(bookData?.isbn)) {
                    return (
                      <SuggestItem
                        key={`suggest-isbn-${i}`}
                        onClick={() => {
                          onChangeIsbn(isbn)
                          onSuggestClick(isbn)
                        }}
                      >
                        {isbn}
                      </SuggestItem>
                    )
                  }
                })}
              </SuggestContainer>
            )}
          </SuggestInputContainer>

          {errors?.indexOf('isbn') !== -1 && (
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
            isError={errors?.indexOf('name') !== -1}
            disabled={disabledAll}
          ></Input>
          {errors?.indexOf('name') !== -1 && (
            <ErrorText>กรุณากรอกชื่อหนังสือ</ErrorText>
          )}
        </InputControl>

        <InputControl width="100%">
          <Label>ชื่อผู้แต่ง</Label>
          <Input
            type="text"
            onChange={(e) => onChange('author', e.target.value)}
            value={bookData?.author}
            placeholder="กรอกชื่อผู้แต่ง"
            isError={errors?.indexOf('author') !== -1}
            disabled={disabledAll}
          ></Input>
          {errors?.indexOf('author') !== -1 && (
            <ErrorText>กรุณากรอกชื่อผู้แต่ง</ErrorText>
          )}
        </InputControl>
        <InputControl width="50%">
          <Label>สำนักพิมพ์</Label>
          <SearchDropdown
            dataList={PUBLISHERS}
            onClickDropdown={onClickPublisher}
            isError={errors?.indexOf('publisher') !== -1}
            showCurrentData={true}
            value={bookData?.publisher}
            placeHolder="ค้นหาสำนักพิมพ์..."
            isDisabled={disabledAll}
          />
          {errors?.indexOf('publisher') !== -1 && (
            <ErrorText>กรุณาเลือกสำนักพิมพ์</ErrorText>
          )}
        </InputControl>

        <InputControl width="calc(50% - 8px)">
          <Label>ปีที่พิมพ์ครั้งแรก</Label>
          <Input
            type="text"
            onChange={(e) => handleYear(e.target.value)}
            value={bookData?.firstYearOfPublication}
            placeholder="ปีที่พิมพ์ครั้งแรก"
            maxLength="4"
            isError={errors?.indexOf('firstYearOfPublication') !== -1}
            disabled={disabledAll}
          ></Input>
          {errors?.indexOf('firstYearOfPublication') !== -1 && (
            <ErrorText>
              กรุณากรอกปีที่พิมพ์ครั้งแรก และไม่เกินปี {YEAR}
            </ErrorText>
          )}
        </InputControl>

        <InputControl>
          <Label>ประเภทหนังสือ</Label>

          {bookData?.types.length > 0 && (
            <TypeContainer>
              {bookData?.types.map((type) => (
                <TypeItem
                  key={`type-select-${type}`}
                  onClick={() => {
                    if (!disabledAll) removeType(type)
                  }}
                  disabled={disabledAll}
                >
                  <span>{TYPES.find((item) => item.id == type).name}</span>
                  <Icon name={ICONS.faXmark} />
                </TypeItem>
              ))}
            </TypeContainer>
          )}

          <SearchDropdown
            dataList={TYPES.filter(
              (type) => bookData.types.indexOf(type.id) === -1 && type
            )}
            onClickDropdown={onClickType}
            isError={errors?.indexOf('types') !== -1}
            isDisabled={disabledAll}
          />
          {errors?.indexOf('types') !== -1 && (
            <ErrorText>กรุณาเลือกประเภทหนังสืออย่างน้อย 1 ประเภท</ErrorText>
          )}
        </InputControl>
      </Form>

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
