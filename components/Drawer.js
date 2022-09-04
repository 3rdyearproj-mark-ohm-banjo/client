import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import Icon from './Icon'
import styled from 'styled-components'
import Link from 'next/link'
import {ICONS} from '../config/icon'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import {useOutsideAlerter} from '../hooks/useOutsideAlerter'
import {useSpring, animated, useTransition} from 'react-spring'

const DrawerContainer = styled(animated.ul)`
  display: none;

  @media (max-width: ${(props) => props.showAt ?? '768px'}) {
    position: fixed;
    min-width: 300px;
    height: 100%;
    right: 0;
    top: 0;
    background-color: ${COLORS.GRAY_DARK_6};
    padding: ${SPACING.LG};
    display: flex;
    flex-direction: column;
    gap: ${SPACING.MD};
    box-shadow: 0 5px 20px ${COLORS.GRAY_DARK};
  }
`

const BarButton = styled.button`
  display: none;

  @media (max-width: ${(props) => props.showAt ?? '768px'}) {
    all: unset;
    cursor: pointer;
  }
`

const CloseButton = styled.li`
  width: 100px;
  align-self: end;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${SPACING.SM};
  background-color: ${COLORS.GRAY_LIGHT_1};
  padding: ${SPACING.XS};
  border-radius: ${SPACING.XS};

  &:hover {
    background-color: ${COLORS.GRAY_LIGHT_3};
  }
`

const ListItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${SPACING.MD};
  cursor: pointer;
  background-color: ${COLORS.GRAY_LIGHT_1};
  padding: ${SPACING.MD};
  border-radius: ${SPACING.SM};

  &:hover {
    background-color: ${COLORS.GRAY_LIGHT_3};
  }
`

const Drawer = ({showAt, head, itemList}) => {
  const [isTrigger, setIsTrigger] = useState(false)
  const drawerRef = useRef()

  const triggerHandler = (trig) => {
    if (isTrigger) {
      setIsTrigger(trig)
    }
  }

  useOutsideAlerter(triggerHandler, drawerRef)

  const slideIn = useTransition(isTrigger, {
    from: {opacity: 0, x: 100},
    enter: {opacity: 1, x: 0},
    leave: {opacity: 0, x: 100},
  })

  return (
    <>
      <BarButton onClick={() => setIsTrigger((prev) => !prev)}>
        <Icon name={ICONS.faBars} size={'lg'}></Icon>
      </BarButton>

      {slideIn(
        (style, item, key) =>
          item && (
            <DrawerContainer ref={drawerRef} style={style}>
              <CloseButton onClick={() => setIsTrigger(false)}>
                <Icon name={ICONS.faXmark} size={'lg'}></Icon>
                <span>ปิด</span>
              </CloseButton>

              {head && (
                <Link href={head.link} passHref>
                  <Icon name={head.icon}>{head.text}</Icon>
                </Link>
              )}

              {itemList.map((item) => (
                <>
                  {!item.function ? (
                    <Link href={item.link} key={item.text} passHref>
                      <ListItem>
                        <Icon name={item.icon}></Icon>
                        <span>{item.text}</span>
                      </ListItem>
                    </Link>
                  ) : (
                    <ListItem onClick={item.function} key={item.text}>
                      <Icon name={item.icon}></Icon>
                      <span>{item.text}</span>
                    </ListItem>
                  )}
                </>
              ))}
            </DrawerContainer>
          )
      )}
    </>
  )
}

Drawer.propTypes = {
  showAt: PropTypes.string,
  head: PropTypes.shape({
    icon: PropTypes.object,
    text: PropTypes.string,
    link: PropTypes.string,
  }),
  itemList: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.object,
      text: PropTypes.string,
      link: PropTypes.string,
      function: PropTypes.func,
    })
  ),
}

export default Drawer
