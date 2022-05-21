import React from 'react'
import SideBar from '../SideBar'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'

const FlexLayout = styled.div`
  display: flex;
  justify-content: stretch;
  gap: ${SPACING.MD};
  min-height: 100vh;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  padding: ${SPACING.LG} 0;
`

const AdminLayout = ({children}) => {
  return (
    <FlexLayout>
      <SideBar />
      <ContentLayout>{children}</ContentLayout>
    </FlexLayout>
  )
}

export default AdminLayout