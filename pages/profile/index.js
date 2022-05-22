import {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {SwiperSlide, Swiper} from 'swiper/react'
import {BackgroundContainer, Button, Icon} from '../../components'
import BookBorrowingCard from '../../components/BookBorrowingCard'
import {ContentWrapper} from '../../components/Layout'
import {ICONS} from '../../config/icon'
import Background from '../../public/static/images/background-default.png'
import {COLORS} from '../../styles/colors'
import {FONTS} from '../../styles/fonts'
import {SPACING} from '../../styles/spacing'
import 'swiper/css'
import 'swiper/css/scrollbar'
import {Scrollbar} from 'swiper'
import BookOwnerCard from '../../components/BookOwnerCard'
import {useRouter} from 'next/router'
import {formatDate} from '../../utils/format'
import ConfirmModal from '../../components/ConfirmModal'
import userService from '../../api/request/userService'
import {useDispatch, useSelector} from 'react-redux'
import {fetchCurrentUser, updateUser} from '../../redux/feature/UserSlice'
import Head from 'next/head'

const UserProfile = styled.div`
  padding: ${SPACING.SM};
  border-radius: ${SPACING.MD};
  display: flex;
  gap: ${SPACING.MD};
  width: 100%;
`

const Circle = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${COLORS.PRIMARY};
  border-radius: 50%;
`

const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: ${FONTS.SARABUN};
`

const UserName = styled.h2`
  font-size: 22px;
  font-weight: 800;
`

const StatContainer = styled.div`
  display: flex;
  gap: ${SPACING.MD};
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin: ${SPACING.LG};

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
    margin: 5px;
    max-width: 90%;
  }
`

const EmptyState = styled.div`
  height: 200px;
  line-height: 200px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  background-color: ${COLORS.GRAY_LIGHT};
  border-radius: ${SPACING.MD};
`

const ViewAll = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

const NavActive = css`
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};
`

const NavMenu = styled.ul`
  display: flex;
  flex-wrap: wrap;
  background-color: ${COLORS.GRAY_LIGHT};
  width: 100%;
  border-radius: ${SPACING.MD};
  gap: ${SPACING.LG};
  padding: ${SPACING.MD};
`

const NavItem = styled.li`
  ${(props) => props.isActive && NavActive}
  padding: ${SPACING.SM} ${SPACING.LG};
  border-radius: ${SPACING.MD};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    ${NavActive}
  }
`

const ProfilePage = () => {
  const router = useRouter()
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [deleteItem, setDeleteItem] = useState({})
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

  const handleDeleteSubmit = () => {
    userService.cancelDonation(deleteItem?.bookId).then(() => {
      dispatch(
        updateUser({
          ...user,
          donationHistory: user.donationHistory.filter(
            (history) => history.book._id !== deleteItem?.bookId
          ),
        })
      )
      setShowCancelModal(false)
      setDeleteItem({})
    })
  }

  const handleShowModal = () => {
    setShowCancelModal(false)
    setDeleteItem({})
  }

  return (
    <>
      <Head>
        <title>Share my Book - ข้อมูลของฉัน</title>
      </Head>
      <ConfirmModal
        onSubmit={handleDeleteSubmit}
        onClose={handleShowModal}
        onShow={showCancelModal}
        header={`คุณต้องการยกเลิกการบริจาค ${deleteItem.bookName} จริงๆ หรอ?`}
        icon={ICONS.faFaceSadTear}
        iconBg={COLORS.RED_1}
      >
        <div
          style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            width: '70%',
          }}
        >
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
            onClick={handleDeleteSubmit}
            fullWidth
            borderRadius="4px"
          >
            ยืนยัน
          </Button>
        </div>
      </ConfirmModal>

      <BackgroundContainer link={Background.src}>
        <ContentWrapper>
          <UserProfile>
            <Circle></Circle>
            <UserNameContainer>
              <span>สวัสดี, คุณ</span>
              <UserName>{user?.firstname}</UserName>
            </UserNameContainer>
          </UserProfile>
          <NavMenu>
            <NavItem isActive={true}>ข้อมูลโดยรวม</NavItem>
            <NavItem>หนังสือที่กำลังยืมอยู่</NavItem>
            <NavItem>หนังสือที่บริจาค</NavItem>
            <NavItem>ประวัติการยืม</NavItem>
            <NavItem>ตั้งค่าบัญชี</NavItem>
          </NavMenu>

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
            <h3>หนังสือที่บริจาค</h3>
            {user?.donationHistory?.length > 0 && (
              <ViewAll onClick={() => router.push('/profile/mydonation')}>
                <span> ดูทั้งหมด </span>
                <Icon name={ICONS.faChevronRight} />
              </ViewAll>
            )}
          </TopicHead>
          <SwiperContainer>
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
                {user?.donationHistory?.map((history) => (
                  <SwiperSlide key={`donation-book-${history._id}`}>
                    <BookOwnerCard
                      bookId={history.book?._id}
                      bookInfo={history.book?.bookShelf}
                      donationTime={formatDate(history?.donationTime)}
                      canCancel={history.book?.currentHolder === user._id}
                      onCancel={(showModal, bookId) => {
                        setShowCancelModal(showModal)
                        setDeleteItem(bookId)
                      }}
                    ></BookOwnerCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <EmptyState>คุณยังไม่เคยบริจาคหนังสือ</EmptyState>
            )}
          </SwiperContainer>

          {/* <TopicHead>
            <h3> ประวัติการยืม</h3>{' '}
            <ViewAll onClick={() => router.push('/profile/borrowhistory')}>
              <span> ดูทั้งหมด </span>
              <Icon name={ICONS.faChevronRight} />
            </ViewAll>
          </TopicHead> */}
        </ContentWrapper>
      </BackgroundContainer>
    </>
  )
}

export default ProfilePage
