import React from 'react'
import styled from 'styled-components'
import useAllReport from '../../api/query/useAllReport'
import {Button} from '../../components'
import {AdminTitle} from '../../components/Admin'
import AdminLayout from '../../components/layouts/AdminLayout'
import {COLORS} from '../../styles/colors'
import {SPACING} from '../../styles/spacing'
import {formatDate} from '../../utils/format'

const Table = styled.table`
  width: 100%;
`

const Thead = styled.thead`
  background-color: ${COLORS.GRAY_LIGHT_2};

  > tr > td {
    border: none;
  }
`

const Td = styled.td`
  padding: ${SPACING.MD};
  border-style: solid;
  border-color: ${COLORS.GRAY_LIGHT};
  max-width: 250px;
  font-size: 14px;
`

const Tbody = styled.tbody`
  > tr:not(:last-child) > td {
    border-width: 0 0 1px;
  }
`

const ReportPage = () => {
  const reportTypes = {
    bookId: 'หนังสือชำรุดเสียหาย',
    bookHistoryId: 'ไม่ได้รับหนังสือ',
    bookShelfId: 'ข้อมูลหนังสือไม่ถูกต้อง',
  }

  const {data: reportList} = useAllReport()

  console.log(reportList?.data?.data)
  return (
    <div>
      <AdminTitle>การรายงานทั้งหมด</AdminTitle>

      <Table>
        <Thead>
          <tr>
            <th>หัวข้อ</th>
            <th>วันที่รายงาน</th>
            <th>รายละเอียด</th>
            <th>สถานะ</th>
            <th>รหัสผู้รายงาน</th>
            <th></th>
          </tr>
        </Thead>
        <Tbody>
          {reportList?.data?.data.map((row) => (
            <tr key={row?._id}>
              <Td>{reportTypes[row?.idType]}</Td>
              <Td>{formatDate(row?.reportTime, true, true, true)}</Td>
              <Td>{row?.message}</Td>
              <Td>{row?.status}</Td>
              <Td>{row?.userWhoReport}</Td>
              <Td>
                <Button btnSize="sm">รายละเอียด</Button>
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </div>
  )
}

export default ReportPage
ReportPage.Layout = AdminLayout
