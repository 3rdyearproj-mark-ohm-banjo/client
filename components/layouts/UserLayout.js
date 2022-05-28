import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCurrentUser} from '../../redux/feature/UserSlice'
import NavigationBar from '../NavigationBar'

const UserLayout = ({children}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return (
    <>
      <NavigationBar />
      {children}
    </>
  )
}

export default UserLayout
