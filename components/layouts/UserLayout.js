import React from 'react'
import NavigationBar from '../NavigationBar'

const UserLayout = ({children}) => {
  return (
    <main>
      <NavigationBar />
      {children}
    </main>
  )
}

export default UserLayout
