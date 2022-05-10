import styled from 'styled-components'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'

export const ContentWrapper = styled.section`
  max-width: 1050px;
  width: 100%;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.alignItems ?? 'center'};
  justify-content: ${(props) => props.justifyContent ?? 'center'};
  padding: ${(props) => props.padding ?? SPACING.MD};
  background-color: ${COLORS.GRAY_LIGHT_3};
  border-radius: ${SPACING.MD};
  box-shadow: 0 5px 20px ${COLORS.GRAY_LIGHT};
  ${(props) => props.gap && `gap: ${props.gap};`}
`

export const AddBookLayout = styled.section`
  max-width: 768px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 5px 20px ${COLORS.GRAY_DARK_1};
  margin: 20px 0 80px;
`
