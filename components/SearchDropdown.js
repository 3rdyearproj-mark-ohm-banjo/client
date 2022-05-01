import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import Icon from './Icon'
import {ICONS} from '../config/icon'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import {FONTS} from '../styles/fonts'

const DisabledStyled = css`
  cursor: default;
  background-color: rgba(239, 239, 239, 0.3);
  color: rgb(84, 84, 84);
`

const SearchDropdownContainer = styled.div`
  position: relative;
`

const SearchInputContainer = styled.div`
  display: flex;
  position: relative;
`

const OptionInput = styled.input`
  padding: 12px 8px;
  transition: 0.3s;
  width: 95%;
  margin: ${SPACING.XS};
  user-select: none;
  font-family: ${FONTS.PRIMARY};
  height: 40px;
  border: 1px solid ${COLORS.GRAY_DARK};
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: ${COLORS.PRIMARY};
  }
`

const OptionActiveStyle = css`
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
  font-weight: 600;
`

const OptionItem = styled.div`
  padding: 12px 8px;
  transition: 0.3s;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid ${COLORS.GRAY_LIGHT_2};
  outline: none;

  &:hover {
    ${OptionActiveStyle}
  }

  ${(props) => props.isActive && OptionActiveStyle}
`

const Dropdown = styled.div`
  min-width: 250px;
  max-height: 175px;
  overflow-y: auto;
  width: 100%;
  position: absolute;
  background-color: ${COLORS.WHITE};
  z-index: 100;
  border-radius: 0 8px 8px;
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
`

const IconContainer = styled.div`
  cursor: pointer;
  transition: 200ms;
  position: absolute;
  right: 4px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const FakeInput = styled.div`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_DARK};
  height: 40px;
  font-family: ${FONTS.PRIMARY};
  padding: ${SPACING.SM} 40px ${SPACING.SM} ${SPACING.SM};
  outline: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: ${COLORS.PRIMARY};
    ${(props) => props.isError && 'border-color: red;'}
  }

  ${(props) => props.isError && 'border-color: red;'}
  ${(props) => props.disabled && DisabledStyled}
`

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid ${COLORS.GRAY_DARK};
  height: 40px;
  font-family: ${FONTS.PRIMARY};
  padding: ${SPACING.SM} 40px ${SPACING.SM} ${SPACING.SM};
  outline: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: ${COLORS.PRIMARY};
    ${(props) => props.isError && 'border-color: red'}
  }

  ${(props) => props.isError && 'border-color: red'}
`

const SearchDropdown = ({
  dataList,
  selectType,
  shouldClear,
  isDisabled,
  isError,
  placeHolder,
  onClickDropdown,
  showCurrentData,
  value,
}) => {
  const [selectedItem, setSelectedItem] = useState()
  const [currentSearch, setCurrentSearch] = useState('')
  const [isToggle, setIsToggle] = useState(false)

  useEffect(() => {
    if (value) {
      setSelectedItem(value)
    }
  }, [value])

  useEffect(() => {
    if (shouldClear) {
      setSelectedItem('')
    }
  }, [shouldClear])

  const onClick = (e) => {
    setSelectedItem(e)
    onClickDropdown(e)
    setIsToggle(false)
    setCurrentSearch('')
  }

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsToggle(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const SearchDropdownRef = useRef(null)
  useOutsideAlerter(SearchDropdownRef)

  return (
    <SearchDropdownContainer ref={SearchDropdownRef}>
      <SearchInputContainer
        type={selectType}
        isDisabled={isDisabled}
        isError={isError}
      >
        {!showCurrentData ? (
          <>
            <Input
              type="search"
              onChange={(e) => {
                setIsToggle(true)
                setCurrentSearch(e.target.value)
              }}
              value={currentSearch}
              placeholder={placeHolder ?? 'ค้นหา...'}
              isError={isError}
              disabled={isDisabled}
            />
            <IconContainer
              onClick={() => !isDisabled && setIsToggle(!isToggle)}
            >
              <Icon name={isToggle ? ICONS.faChevronUp : ICONS.faChevronDown} />
            </IconContainer>
          </>
        ) : (
          <>
            <FakeInput
              onClick={() => !isDisabled && setIsToggle(!isToggle)}
              isError={isError}
              disabled={isDisabled}
            >
              {dataList.find((item) => item.id === selectedItem)?.name ??
                placeHolder}
            </FakeInput>
            <IconContainer
              onClick={() => !isDisabled && setIsToggle(!isToggle)}
            >
              <Icon name={isToggle ? ICONS.faChevronUp : ICONS.faChevronDown} />
            </IconContainer>
          </>
        )}
      </SearchInputContainer>

      {!isDisabled && isToggle && (
        <Dropdown>
          {showCurrentData && (
            <OptionInput
              type="search"
              onChange={(e) => {
                setCurrentSearch(e.target.value)
              }}
              placeholder={placeHolder ?? 'ค้นหา...'}
            ></OptionInput>
          )}
          {dataList
            ?.filter(
              (item) =>
                item.name.includes(currentSearch) && item.id !== selectedItem
            )
            ?.map((item, i) => (
              <OptionItem
                key={`list-item${i}`}
                onClick={() => onClick(item.id)}
                isActive={selectedItem === item.id}
              >
                {item.name}
              </OptionItem>
            ))}
        </Dropdown>
      )}
    </SearchDropdownContainer>
  )
}

SearchDropdown.propTypes = {
  shouldClear: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isError: PropTypes.bool,
  placeHolder: PropTypes.string,
  selectType: PropTypes.oneOf(['primary', 'secondary']),
  dataList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      title: PropTypes.string,
    })
  ),
  onClickDropdown: PropTypes.func,
}

export default SearchDropdown
