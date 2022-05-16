import React, {useState} from 'react'
import styled from 'styled-components'
import {AGREEMENT_CONFIG} from '../../config/agreement'
import {COLORS} from '../../styles/colors'
import Button from '../../components/Button'
import AddBookForm from '../../components/forms/AddBookForm'
import Agreement from '../../public/static/images/agreement.png'
import {SPACING} from '../../styles/spacing'
import Background from '../../public/static/images/background-default.png'
import {BackgroundContainer} from '../../components'
import Head from 'next/head'
import {AddBookLayout} from '../../components/Layout'
import {useRouter} from 'next/router'
import BookDonateModal from '../../components/BookDonateModal'
import shelfService from '../../api/request/shelfService'

const Image = styled.img`
  margin: 0 auto;
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

const DonateBookPage = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isbn, setIsbn] = useState({})
  const [showResModal, setShowResModal] = useState(false)
  const router = useRouter()

  const submitBookShelf = (bookData, imageFile) => {
    shelfService.addShelf(bookData, imageFile).then((res) => {
      setShowResModal(true)
      setIsbn(res?.data?.ISBN)
    })
  }

  return (
    <>
      <Head>
        <title>Share my Book - บริจาคหนังสือ</title>
      </Head>

      {showResModal && (
        <BookDonateModal
          onSubmit={() => router.push(`/shelf/${isbn}`)}
          onClose={setShowResModal}
        />
      )}
      <BackgroundContainer link={Background.src}>
        <AddBookLayout>
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

          {currentStep === 1 && (
            <AddBookForm
              onStepChange={setCurrentStep}
              onPrevious={() => setCurrentStep(0)}
              onSubmit={submitBookShelf}
            />
          )}
        </AddBookLayout>
      </BackgroundContainer>
    </>
  )
}

export default DonateBookPage
