import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {SwiperSlide, Swiper} from 'swiper/react'
import {BackgroundContainer, Icon} from '../../components'
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
import shelfService from '../../api/request/shelfService'

const UserProfile = styled.div`
  padding: ${SPACING.SM};
  border-radius: ${SPACING.MD};
  display: flex;
  gap: ${SPACING.MD};
`

const Circle = styled.div`
  width: 60px;
  height: 60px;
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
  font-size: 20px;
  font-weight: 800;
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
  background-color: ${(props) => props.bgColor ?? COLORS.SECONDARY};
  padding: ${SPACING.MD};
  border-radius: ${SPACING.MD};
  color: ${COLORS.WHITE};
  width: 100%;
  height: 100px;
  align-items: start;

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

> h3 {
  flex-grow: 1;
  font-size: 20px;
  font-weight: 600;
}


> span {
  text-align-right;
  flex-shrink:0;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
}
`

const SwiperContainer = styled.div`
  width: 100%;
  margin-bottom: ${SPACING.MD};

  > div div.swiper-slide > div {
    margin: 5px;
    max-width: 90%;
  }
`

const ProfilePage = () => {
  const [myBooks, setMyBooks] = useState([])

  useEffect(() => {
    shelfService.getAllShelf().then((res) => {
      setMyBooks(res.data)
    })
  }, [])

  console.log(myBooks)

  return (
    <BackgroundContainer link={Background.src}>
      <ContentWrapper alignItems="start">
        <UserProfile>
          <Circle></Circle>
          <UserNameContainer>
            <span>Hello here,</span>
            <UserName>test</UserName>
          </UserNameContainer>
        </UserProfile>
        <StatContainer>
          <StatItem>
            <Icon name={ICONS.faBookBookmark} />
            <p>ยืมไปแล้ว</p>
            <span>50 ครั้ง</span>
          </StatItem>
          <StatItem>
            <Icon name={ICONS.faHandHoldingHand} />
            <p>บริจาคไปแล้ว</p>
            <span>50 เล่ม</span>
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
          <h3>หนังสือที่บริจาค</h3> <span>ดูทั้งหมด</span>
        </TopicHead>
        <SwiperContainer>
          <Swiper
            slidesPerView={1}
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
            {myBooks.map((book) => (
              <SwiperSlide key={`donation-book-${book._id}`}>
                <BookOwnerCard bookInfo={book}></BookOwnerCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>

        <TopicHead>
          <h3> ประวัติการยืม</h3> <span>ดูทั้งหมด</span>
        </TopicHead>
      </ContentWrapper>
    </BackgroundContainer>
  )
}

export default ProfilePage
