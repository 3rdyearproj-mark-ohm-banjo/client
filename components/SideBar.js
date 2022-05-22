import styled, {css} from 'styled-components'
import {COLORS} from '../styles/colors'
import {SPACING} from '../styles/spacing'
import {useDispatch} from 'react-redux'
import {clearUser} from '../redux/feature/UserSlice'
import {logout} from '../api/request/userService'
import {useRouter} from 'next/router'

const SideBarStyled = styled.div`
  background-color: ${COLORS.PURPLE_3};
  padding: ${SPACING.MD};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.MD};
`

const ActiveItemStyled = css`
  background-color: ${COLORS.PURPLE_2};
  cursor: pointer;
`

const SideBarItem = styled.div`
  color: ${COLORS.WHITE};
  padding: ${SPACING.MD};
  border-radius: ${SPACING.MD};
  transition: 0.2s;
  ${(props) => props.isActive && ActiveItemStyled}

  &:hover {
    ${ActiveItemStyled}
  }
`

const SideBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const logoutHandler = async () => {
    logout()
    dispatch(clearUser())
    router.push('/')
  }

  return (
    <SideBarStyled>
      <SideBarItem
        onClick={() => router.push('/admin/newadmin')}
        isActive={router.pathname === '/admin/newadmin'}
      >
        เพิ่ม Admin
      </SideBarItem>
      <SideBarItem
        onClick={() => router.push('/admin/search')}
        isActive={router.pathname === '/admin/search'}
      >
        ค้นหาหนังสือ
      </SideBarItem>
      <SideBarItem
        onClick={() => router.push('/admin/types')}
        isActive={router.pathname === '/admin/types'}
      >
        จัดการประเภทหนังสือ
      </SideBarItem>
      <SideBarItem
        onClick={() => router.push('/admin/publishers')}
        isActive={router.pathname === '/admin/publishers'}
      >
        จัดการข้อมูลสำนักพิมพ์
      </SideBarItem>
      <SideBarItem
        onClick={() => router.push('/admin/users')}
        isActive={router.pathname === '/admin/users'}
      >
        จัดการผู้ใช้
      </SideBarItem>
      <SideBarItem
        onClick={() => router.push('/admin/report')}
        isActive={router.pathname === '/admin/report'}
      >
        ข้อมูลการรายงาน
      </SideBarItem>
      <SideBarItem onClick={logoutHandler}>ออกจากระบบ</SideBarItem>
    </SideBarStyled>
  )
}

export default SideBar
