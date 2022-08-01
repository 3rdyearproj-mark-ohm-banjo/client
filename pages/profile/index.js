import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {SwiperSlide, Swiper} from 'swiper/react'
import {Button, Icon} from '../../components'
import BookBorrowingCard from '../../components/cards/BookBorrowingCard'
import {ICONS} from '../../config/icon'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import 'swiper/css'
import 'swiper/css/scrollbar'
import {Scrollbar} from 'swiper'
import BookOwnerCard from '../../components/cards/BookOwnerCard'
import {useRouter} from 'next/router'
import {formatDate} from '../../utils/format'
import ConfirmModal from '../../components/ConfirmModal'
import userService from '../../api/request/userService'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCurrentUser, updateUser} from '../../redux/feature/UserSlice'
import Head from 'next/head'
import ProfileLayout from '../../components/layouts/ProfileLayout'
import toast from 'react-hot-toast'

const TopicHead = styled.section`
  width: 100%;
  display: flex;
  gap: ${SPACING.SM};
  align-items: center;
  color: ${COLORS.PRIMARY};
  margin: 16px 0 8px;

  > h3 {
    flex-grow: 1;
    font-size: 20px;
    font-weight: 600;
  }
`

const SwiperContainer = styled.div`
  width: 100%;
  > div div.swiper-slide > div {
    margin: 0;
    max-width: 90%;
  }

  .swiper-wrapper {
    max-width: 0;
  }

  .swiper-pointer-events {
    padding: ${SPACING.MD};
  }
`

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
`

const StatContainer = styled.div`
  display: flex;
  gap: ${SPACING.MD};
  flex-direction: column;
  width: 100%;
  justify-content: center;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`

const StatItem = styled.span`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.bgColor ?? COLORS.PRIMARY};
  padding: ${SPACING.MD};
  border-radius: ${SPACING.MD};
  color: ${COLORS.GRAY_LIGHT};
  width: 100%;
  height: 100px;
  align-items: start;
  box-shadow: 0 5px 20px ${COLORS.GRAY_DARK};

  > *:first-child {
    margin-bottom: auto;
    font-size: 20px;
  }

  > span {
    font-weight: 600;
  }

  > p {
    font-size: 12px;
  }

  @media (min-width: 600px) {
    max-width: 150px;
  }
`

const Title = styled.h2`
  margin: 12px 0;
  padding: ${SPACING.MD} ${SPACING.MD} 0;
  font-size: 24px;
  font-weight: 600;
`

const ButtonModalWrapper = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 70%;
`

const ProfilePage = () => {
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [receiveItem, setReceiveItem] = useState({})
  const user = useSelector((state) => state.user.user)
  const totalBookDonation = useSelector((state) => state.user.totalBookDonation)
  const dispatch = useDispatch()

  useEffect(() => {
    if (
      user?.donationHistory &&
      totalBookDonation !== user?.donationHistory?.length
    ) {
      dispatch(fetchCurrentUser())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalBookDonation, user?.donationHistory])

  const handleReceiveSubmit = () => {
    userService.cancelDonation(receiveItem?.bookId).then(() => {
      dispatch(
        updateUser({
          ...user,
          donationHistory: user.donationHistory.filter(
            (history) => history.book._id !== receiveItem?.bookId
          ),
        })
      )
      toast.success('ยกเลิกการบริจาคสำเร็จ')
      setShowCancelModal(false)
      setReceiveItem({})
    })
  }

  const handleShowModal = () => {
    setShowCancelModal(false)
    setReceiveItem({})
  }

  return (
    <>
      <Head>
        <title>Share my Book - ข้อมูลของฉัน</title>
      </Head>
      <ConfirmModal
        onSubmit={handleReceiveSubmit}
        onClose={handleShowModal}
        onShow={showCancelModal}
        header={`คุณได้รับหนังสือ ${receiveItem.bookName} แล้วใช่ไหม?`}
        icon={ICONS.faBook}
        iconBg={COLORS.GREEN_1}
      >
        <ButtonModalWrapper>
          <Button
            btnSize="sm"
            bgColor={COLORS.RED_1}
            onClick={handleShowModal}
            fullWidth
            borderRadius="4px"
          >
            ยกเลิก
          </Button>
          <Button
            btnSize="sm"
            onClick={handleReceiveSubmit}
            fullWidth
            borderRadius="4px"
          >
            ยืนยัน
          </Button>
        </ButtonModalWrapper>
      </ConfirmModal>

      <Title>ภาพรวมของบัญชีของคุณ</Title>

      <StatContainer>
        <StatItem>
          <Icon name={ICONS.faBookBookmark} />
          <p>ยืมไปแล้ว</p>
          <span>0 ครั้ง</span>
        </StatItem>
        <StatItem>
          <Icon name={ICONS.faHandHoldingHand} />
          <p>บริจาคไปแล้ว</p>
          <span>{totalBookDonation} เล่ม</span>
        </StatItem>
        <StatItem>
          <Icon name={ICONS.faBook} />
          <p>ถือหนังสืออยู่</p>
          <span>0 / 5 เล่ม</span>
        </StatItem>
      </StatContainer>

      <TopicHead>
        <h3>หนังสือที่กำลังยืมอยู่</h3>
      </TopicHead>

      {/* <EmptyState>ไม่พบหนังสือที่กำลังยืมอยู่</EmptyState> */}
      <SwiperContainer>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          breakpoints={{
            700: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          scrollbar={{
            hide: true,
          }}
          loopFillGroupWithBlank={true}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          <SwiperSlide>
            <BookBorrowingCard />
          </SwiperSlide>
          <SwiperSlide>
            <BookBorrowingCard />
          </SwiperSlide>
          <SwiperSlide>
            <BookBorrowingCard />
          </SwiperSlide>
        </Swiper>
      </SwiperContainer>

      <TopicHead>
        <h3>หนังสือที่จะได้รับ</h3>
      </TopicHead>
      <EmptyState>ไม่มีหนังสือที่คุณได้จะรับ</EmptyState>
      {/* <SwiperContainer>
        {user?.donationHistory?.length > 0 ? (
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              520: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              700: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 0,
              },
            }}
            scrollbar={{
              hide: true,
            }}
            loopFillGroupWithBlank={true}
            modules={[Scrollbar]}
            className="mySwiper"
          >
            {user?.donationHistory?.map((history) => (
              <SwiperSlide key={`donation-book-${history._id}`}>
                <BookOwnerCard
                  bookId={history.book?._id}
                  bookInfo={history.book?.bookShelf}
                  donationTime={formatDate(
                    history?.donationTime,
                    true,
                    true,
                    true
                  )}
                  canCancel={history.book?.currentHolder === user._id}
                  onReceive={(showModal, bookId) => {
                    setShowCancelModal(showModal)
                    setReceiveItem(bookId)
                  }}
                ></BookOwnerCard>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <EmptyState>คุณยังไม่เคยบริจาคหนังสือ</EmptyState>
        )}
      </SwiperContainer> */}

      <TopicHead>
        <h3> หนังสือที่ต้องส่งต่อ</h3>{' '}
        {/* <ViewAll onClick={() => router.push('/profile/borrowhistory')}>
              <span> ดูทั้งหมด </span>
              <Icon name={ICONS.faChevronRight} />
            </ViewAll> */}
      </TopicHead>
      <EmptyState>คุณยังไม่เคยยืมหนังสือ</EmptyState>
    </>
  )
}

ProfilePage.Layout = ProfileLayout

export default ProfilePage
