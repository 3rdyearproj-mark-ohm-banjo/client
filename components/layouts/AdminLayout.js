import React, {useEffect} from 'react'
import SideBar from '../SideBar'
import styled from 'styled-components'
import {SPACING} from '../../styles/spacing'
import {useDispatch} from 'react-redux'
import {fetchCurrentUser} from '../../redux/feature/UserSlice'

const AdminPageLayout = styled.div`
  display: flex;
  justify-content: stretch;
  gap: ${SPACING.MD};
  min-height: 100vh;
`

const ContentLayout = styled.div`
  margin: 0 auto;
  padding: ${SPACING.LG} ${SPACING.MD};
  width: 100%;
`

const AdminLayout = ({children}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <AdminPageLayout>
      <SideBar />
      <ContentLayout>{children}</ContentLayout>
    </AdminPageLayout>
  )
}

export default AdminLayout
