import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {fetchCurrentUser} from '../../redux/feature/UserSlice'
import NavigationBar from '../NavigationBar'
import Cookies from 'universal-cookie'

const UserLayout = ({children}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cookies = new Cookies()
    if (cookies.get('jwt')) {
      dispatch(fetchCurrentUser())
    }
  }, [dispatch])

  return (
    <>
      <NavigationBar />
      {children}
    </>
  )
}

export default UserLayout
