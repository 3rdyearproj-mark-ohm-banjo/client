import React, {useState} from 'react'
import styled from 'styled-components'
import {AGREEMENT_CONFIG} from '../config/agreement'
import {COLORS} from '../styles/colors'
import Button from '../components/Button'
import AddBookForm from '../components/forms/AddBookForm'
import Agreement from '../public/static/images/agreement.png'
import {SPACING} from '../styles/spacing'

const Body = styled.section`
  background: url('https://img.freepik.com/free-vector/purple-fluid-background-frame_53876-99020.jpg?t=st=1650688192~exp=1650688792~hmac=f7b991d1bb1a15d56e076a4b1c5c4afaa8653d0985dc0b7a4c5043eab4f2a263&w=1380')
    no-repeat;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  margin: 0 auto;
`

const Container = styled.section`
  max-width: 768px;
  width: 100%;
  border-radius: 8px;
  padding: 20px;
  background-color: ${COLORS.WHITE};
  box-shadow: 0px 5px 20px ${COLORS.GRAY_DARK_1};
  margin: 20px 0;
`

const TitleList = styled.h2`
  font-size: 24px;
  line-height: 1.5em;
  font-weight: 600;
  color: ${COLORS.PRIMARY};

  &:not(:first-of-type) {
    margin-top: ${SPACING['2X']};
  }
`

const ListBox = styled.ul`
  color: ${COLORS.PRIMARY};
  border-radius: 8px;
  background-color: ${COLORS.GRAY_LIGHT_2};
  padding: ${SPACING.MD};
  box-shadow: 0px 5px 20px ${COLORS.GRAY_LIGHT_2};
`

const List = styled.li`
  display: flex;
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${SPACING['4X']};
`

const CreateBookPage = () => {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <Body>
      <Container>
        {currentStep === 0 && (
          <>
            <Image src={Agreement.src} alt="agreement" />
            {AGREEMENT_CONFIG.map((agreement, i) => (
              <React.Fragment key={`agreement${i}`}>
                <TitleList>{agreement.title}</TitleList>
                <ListBox>
                  {agreement.list.map((item, j) => (
                    <List key={`item${j}`}>
                      <span> {j + 1 + '.'}</span>
                      <span>{item}</span>
                    </List>
                  ))}
                </ListBox>
              </React.Fragment>
            ))}

            <ButtonWrapper>
              <Button onClick={() => setCurrentStep(1)}>ยืนยันข้อตกลง</Button>
            </ButtonWrapper>
          </>
        )}

        {currentStep === 1 && <AddBookForm onStepChange={setCurrentStep} />}
      </Container>
    </Body>
  )
}

export default CreateBookPage
