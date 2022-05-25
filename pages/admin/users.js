import React from 'react'
import {AdminTitle} from '../../components/Admin'
import AdminLayout from '../../components/layouts/AdminLayout'

const UserPage = () => {
  return (
    <div>
      <AdminTitle>จัดการข้อมูลของผู้ใช้</AdminTitle>
    </div>
  )
}

export default UserPage
UserPage.Layout = AdminLayout
