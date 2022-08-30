import React from 'react'
import styled from 'styled-components'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import Icon from '../Icon'

const InputControl = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${SPACING.SM};
  width: 100%;
  color: ${COLORS.WHITE};

  &:not(:first-of-type) {
    margin-top: 20px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  height: 36px;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;

  ${(props) => props.isTextArea && 'min-height: 36px;height: auto;'}
`

const InputIcon = styled.div`
  width: 36px;
  background-color: ${COLORS.PURPLE_3};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const Input = styled.input`
  flex-grow: 1;
  background-color: ${COLORS.PURPLE_3};
  color: ${COLORS.WHITE};
  border: none;
  padding: 6px 12px;
  font-family: ${FONTS.PRIMARY};
  outline: none;

  ::placeholder {
    color: ${COLORS.GRAY_DARK};
  }
`

const TextArea = styled.textarea`
  flex-grow: 1;
  background-color: ${COLORS.PURPLE_3};
  color: ${COLORS.WHITE};
  border: none;
  padding: 6px 12px;
  font-family: ${FONTS.PRIMARY};
  outline: none;
  resize: none;

  ::placeholder {
    color: ${COLORS.GRAY_DARK};
  }
`

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 ${SPACING.MD};
`

const ErrMessage = styled.span`
  background-color: ${COLORS.RED_2};
  color: ${COLORS.WHITE};
  padding: 2px ${SPACING.MD};
  border-radius: ${SPACING.MD};
  margin: ${SPACING.SM} 0;
  font-size: 14px;
  font-weight: 600;
`

const InputWithIcon = ({
  label,
  iconName,
  inputType,
  onChange,
  placeholder,
  maxLength,
  error,
  errorMessage,
  value,
}) => {
  return (
    <InputControl>
      <LabelWrapper>
        <label>{label}</label>
      </LabelWrapper>
      <InputWrapper isTextArea={inputType === 'textarea'}>
        <InputIcon>
          <Icon name={iconName} />
        </InputIcon>

        {inputType === 'textarea' ? (
          <TextArea
            rows="3"
            cols="25"
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        ) : (
          <Input
            type={inputType}
            onChange={(e) => {
              if (inputType === 'number' && /[a-zA-Z]/.test(e.target.value)) {
                return
              } else {
                onChange(e.target.value)
              }
            }}
            placeholder={placeholder}
            maxLength={maxLength}
            value={value}
          />
        )}
      </InputWrapper>
      {error && <ErrMessage>{errorMessage}</ErrMessage>}
    </InputControl>
  )
}

export default InputWithIcon
