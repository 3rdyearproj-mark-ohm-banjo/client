import React from 'react'
import {AdminTitle} from '../../components/Admin'
import AdminLayout from '../../components/layouts/AdminLayout'

const NewAdminPage = () => {
  return (
    <div>
      <AdminTitle>เพิ่ม Admin ใหม่</AdminTitle>
    </div>
  )
}

export default NewAdminPage
NewAdminPage.Layout = AdminLayout
