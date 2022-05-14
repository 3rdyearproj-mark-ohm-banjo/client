import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import {useOutsideAlerter} from '../hooks/useOutsideAlerter'
import LoginForm from './forms/LoginForm'
import RegisterForm from './forms/RegisterForm'
import {ModalBackground, ModalContainer} from './Modal'
import RegisterBanner from '../public/static/images/register-banner.png'
import LoginBanner from '../public/static/images/people-group-reading.jpg'
import Image from 'next/image'

const PageBanner = styled.div`
  height: 100%;
  width: 100%;
  max-width: 600px;
  max-height: 600px;
  padding: 20px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const BannerImage = styled.div`
  max-width: 500px;
  max-height: 400px;
  width: 100%;
  height: 100%;
`

const BannerHeader = styled.div`
  text-align: center;
  > div {
    font-size: 20px;
    font-weight: 600;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;

  > * {
    flex: 1;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const AuthModal = ({show, setShow}) => {
  const [showRegister, setShowRegister] = useState(false)
  const modalRef = useRef()

  const setCloseModal = () => {
    setShow(false)
    setShowRegister(false)
  }

  useOutsideAlerter(setCloseModal, modalRef)

  useEffect(() => {
    if (show) {
      document.body.style.position = 'fixed'
      document.body.style.width = '100vw'
    } else {
      document.body.style.position = ''
      document.body.style.width = ''
    }
  }, [show])

  return (
    <>
      {show && (
        <ModalBackground>
          <ModalContainer
            maxWidth="975px"
            maxHeight="max-content"
            ref={modalRef}
          >
            <ContentWrapper>
              {showRegister ? (
                <>
                  <PageBanner>
                    <BannerHeader>
                      <div>ร่วมเป็นส่วนหนึ่งกับเราได้ง่ายๆ</div>
                      <span>เพียงกรอกข้อมูลเพื่อสมัครสมาชิก~</span>
                    </BannerHeader>

                    <BannerImage>
                      <Image
                        alt="login-banner"
                        src={RegisterBanner}
                        layout="responsive"
                        width={500}
                        height={350}
                      />
                    </BannerImage>

                    <BannerHeader>
                      <div>บริการยืมหนังสือ</div>
                      <span>
                        และบริจาคหนังสือเพื่อร่วมกันสร้างสังคมแห่งการแบ่งปัน
                      </span>
                    </BannerHeader>
                  </PageBanner>
                  <RegisterForm
                    onShowRegister={setShowRegister}
                    onShow={setShow}
                  />
                </>
              ) : (
                <>
                  <PageBanner>
                    <BannerHeader>
                      <div>บริการยืมหนังสือ</div>
                      <span>
                        และบริจาคหนังสือเพื่อร่วมกันสร้างสังคมแห่งการแบ่งปัน
                      </span>
                    </BannerHeader>
                    <BannerImage>
                      <Image
                        alt="login-banner"
                        src={LoginBanner}
                        layout="responsive"
                        width={500}
                        height={400}
                      />
                    </BannerImage>
                  </PageBanner>
                  <LoginForm
                    onShowRegister={setShowRegister}
                    onSuccess={() => setShow(false)}
                    onShow={setShow}
                  />
                </>
              )}
            </ContentWrapper>
          </ModalContainer>
        </ModalBackground>
      )}
    </>
  )
}

export default AuthModal
