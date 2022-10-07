import React from 'react'
import useReportInfo from '../../../api/query/useReportInfo'
import AdminLayout from '../../../components/layouts/AdminLayout'
import Button from '../../../components/Button'
import {formatDate} from '../../../utils/format'
import styled from 'styled-components'
import Icon from '../../../components/Icon'
import {ICONS} from '../../../config/icon'
import {SPACING} from '../../../styles/spacing'
import {COLORS} from '../../../styles/colors'
import useAcceptReport from '../../../api/query/useAcceptReport'
import {reportTypes} from '../../../config/reportType'
import {Divider} from '../../../components'
import {useSelector} from 'react-redux'
import useRejectReport from '../../../api/query/useRejectReport'
import useBookCanRead from '../../../api/query/useBookCanRead'
import useBookCantRead from '../../../api/query/useBookCantRead'
import useBookNotSendCantContact from '../../../api/query/useBookNotSendCantContact'
import useBookNotSendCanContact from '../../../api/query/useBookNotSendCanContact'
import useReportBookInfoEdit from '../../../api/query/useReportBookInfoEdit'

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const ReportId = styled.h1`
  font-size: 24px;
`

const TimeWrapper = styled.div`
  display: flex;
  gap: ${SPACING.LG};
  margin: ${SPACING.LG} 0;
`

const TimeBox = styled.div`
  width: max-content;
  display: flex;
  align-items: center;
  gap: ${SPACING.MD};
  padding: ${SPACING.SM};
  border: 1px solid ${COLORS.PRIMARY};
  border-radius: ${SPACING.XS};
  font-size: 20px;
`

const MessageHead = styled.span`
  font-size: 28px;
`

const Message = styled.p`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};
  font-size: 24px;
  margin: ${SPACING.LG} 0;
`

const ReportCase = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};
  width: max-content;
  font-size: 20px;
  margin: ${SPACING.LG} 0;
`

const AdminHandler = styled.span`
  color: ${COLORS.RED_2};
  font-size: 22px;
`

const Reporter = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;

  margin: ${SPACING.LG} 0;
`

const ReportName = styled.div`
  font-size: 22px;
`

const ReporterContact = styled.div`
  display: flex;
  gap: ${SPACING.XL};
  font-size: 18px;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.MD};
  margin: 0 auto;
`

const ButtonHead = styled.header`
  text-align: center;
  font-size: 18px;
  margin: ${SPACING.MD} 0;
`

const ReportInfoPage = ({reportId}) => {
  const {data} = useReportInfo(reportId)
  const user = useSelector((state) => state.user.user)
  const reportInfo = data?.data?.data
  const isMyCase = user?._id === reportInfo?.adminWhoManage?._id
  const {mutate: acceptCase} = useAcceptReport()
  const {mutate: rejectCase} = useRejectReport()
  const {mutate: bookCanRead} = useBookCanRead()
  const {mutate: bookCantRead} = useBookCantRead()
  const {mutate: bookNotSendCanContact} = useBookNotSendCanContact()
  const {mutate: bookNotSendCantContact} = useBookNotSendCantContact()
  const {mutate: bookInfoEdit} = useReportBookInfoEdit()
  console.log(reportInfo)

  const buttonSwitch = () => {
    if (reportInfo?.status === 'reject') {
      return (
        <Button btnType="orangeGradient" onClick={() => {}}>
          รายงานนี้ถูกยกเลิกแล้ว
        </Button>
      )
    }

    if (reportInfo?.status === 'success') {
      return (
        <Button btnType="secondary" onClick={() => {}}>
          รายงานนี้สำเร็จแล้ว
        </Button>
      )
    }

    switch (reportInfo?.idType) {
      case 'bookHistoryId':
        return (
          <>
            {isMyCase ? (
              <ButtonWrapper>
                <Button
                  onClick={() => bookNotSendCantContact(reportId)}
                  btnType="orangeGradient"
                >
                  ไม่สามารถติดต่อผู้ส่งได้
                </Button>
                <Button onClick={() => bookNotSendCanContact(reportId)}>
                  ติดต่อผู้ส่งได้และผู้ส่งจัดส่งแล้ว
                </Button>
              </ButtonWrapper>
            ) : (
              <Button isDisabled={true}>
                คุณไม่ได้เป็นผู้รับดูแลเรื่องนี้
              </Button>
            )}
          </>
        )
      case 'bookShelfId':
        return (
          <>
            {isMyCase ? (
              <ButtonWrapper>
                <Button
                  onClick={() =>
                    window.open(
                      `/admin/editbook/${reportInfo?.reportItem?.ISBN}`
                    )
                  }
                  btnType="secondary"
                >
                  ไปแก้ไขข้อมูลหนังสือ
                </Button>
                <Button onClick={() => bookInfoEdit(reportId)}>
                  แก้ไขข้อมูลเรียบร้อยแล้ว
                </Button>
              </ButtonWrapper>
            ) : (
              <Button isDisabled={true}>
                คุณไม่ได้เป็นผู้รับดูแลเรื่องนี้
              </Button>
            )}
          </>
        )
      case 'bookId':
        return (
          <>
            {isMyCase ? (
              <>
                <ButtonHead>
                  **หลังจากติดต่อเพื่อส่งข้อมูลที่จัดส่งกับผู้รายงานและได้รับหนังสือจากผู้รายงานแล้ว
                </ButtonHead>
                <ButtonWrapper>
                  <br />
                  <Button
                    onClick={() => bookCantRead(reportId)}
                    btnType="orangeGradient"
                  >
                    ยืนยันสภาพหนังสือยังไม่สามารถอ่านได้
                  </Button>
                  <Button onClick={() => bookCanRead(reportId)}>
                    ยืนยันสภาพหนังสือยังสามารถอ่านได้
                  </Button>
                </ButtonWrapper>
              </>
            ) : (
              <Button isDisabled={true}>
                คุณไม่ได้เป็นผู้รับดูแลเรื่องนี้
              </Button>
            )}
          </>
        )
      default:
        return <div></div>
    }
  }

  const reportSwitch = () => {
    switch (reportInfo?.idType) {
      case 'bookHistoryId':
        return (
          <>
            <span>
              หนังสือ
              {reportInfo?.reportItem?.book?.bookShelf?.bookName} (
              {reportInfo?.reportItem?.book?.bookShelf?.ISBN})
            </span>{' '}
            <span>
              วันที่จับคู่{' '}
              {formatDate(reportInfo?.reportItem?.matchTime, true, true, true)}{' '}
              สถานะการยืม {reportInfo?.reportItem?.status}
            </span>
            {reportInfo?.reportItem?.borrowerNeedToCancel
              ? 'ผู้ใช้เคยส่งคำขอยกเลิกการยืม'
              : ''}
            <Divider lineColor={COLORS.GRAY_LIGHT} />
            <span>
              ข้อมูลผู้ส่ง
              <br /> ชื่อ {reportInfo?.reportItem?.senderInfo?.firstname}{' '}
              {reportInfo?.reportItem?.senderInfo?.lastname} <br />
              อีเมล {reportInfo?.reportItem?.senderInfo?.email} <br />
              โทร {reportInfo?.reportItem?.senderInfo?.tel}
            </span>
          </>
        )
      case 'bookShelfId':
        return (
          <>
            <span>
              หนังสือ {reportInfo?.reportItem?.bookName} (
              {reportInfo?.reportItem?.ISBN})
            </span>{' '}
          </>
        )
      case 'bookId':
        return (
          <>
            <span>
              หนังสือ {reportInfo?.reportItem?.bookShelf?.bookName} (
              {reportInfo?.reportItem?.bookShelf?.ISBN})
            </span>
            <span>สถานะหนังสือ {reportInfo?.reportItem?.status}</span>
          </>
        )

      default:
        return <div>ไม่มีข้อมูล</div>
    }
  }

  return (
    <PageWrapper>
      <ReportId>
        หัวข้อ {reportTypes[reportInfo?.idType] ?? ''} <br /> รหัสรายงาน{' '}
        {reportInfo?.reportId}
      </ReportId>
      <TimeWrapper>
        <TimeBox>
          <span>
            การแก้ไขล่าสุด{' '}
            {formatDate(reportInfo?.accessTime, true, true, true)}
          </span>
          <Icon name={ICONS.faClock} />
        </TimeBox>
        <TimeBox>
          <span>
            วันที่รายงาน {formatDate(reportInfo?.reportTime, true, true, true)}
          </span>
          <Icon name={ICONS.faClock} />
        </TimeBox>
      </TimeWrapper>

      <AdminHandler>
        {reportInfo?.adminWhoManage?._id ? (
          <>
            รับเรื่องโดย {reportInfo?.adminWhoManage?.email} สถานะการรายงาน{' '}
            {reportInfo?.status}
          </>
        ) : (
          <>ยังไม่มีผู้รับรายงานนี้</>
        )}
      </AdminHandler>

      <Reporter>
        <MessageHead>รายงานโดย</MessageHead>
        <ReportName>
          {reportInfo?.userWhoReport?.firstname}{' '}
          {reportInfo?.userWhoReport?.lastname}
        </ReportName>
        <ReporterContact>
          <span> อีเมล {reportInfo?.userWhoReport?.email}</span>
          <span> โทร {reportInfo?.userWhoReport?.tel ?? '-'}</span>
        </ReporterContact>
      </Reporter>
      <Divider lineColor={COLORS.GRAY_LIGHT}></Divider>
      <Message>
        <MessageHead>รายละเอียดการรายงานจากผู้รายงาน</MessageHead>
        <span>“{reportInfo?.message}”</span>
      </Message>
      <Divider lineColor={COLORS.GRAY_LIGHT}></Divider>
      <ReportCase>
        <MessageHead>ข้อมูลเพิ่มเติม</MessageHead>
        {reportSwitch()}
      </ReportCase>
      {!reportInfo?.adminWhoManage?._id ? (
        <ButtonWrapper>
          <Button onClick={() => acceptCase(reportId)}>รับรายงาน</Button>
          <Button btnType="orangeGradient" onClick={() => rejectCase(reportId)}>
            ยกเลิกรายงานนี้
          </Button>
        </ButtonWrapper>
      ) : (
        buttonSwitch()
      )}
    </PageWrapper>
  )
}

export default ReportInfoPage
ReportInfoPage.Layout = AdminLayout

export async function getServerSideProps({params}) {
  const reportId = params.reportId

  return {
    props: {
      reportId,
    },
  }
}
