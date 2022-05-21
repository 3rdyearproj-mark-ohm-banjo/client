import {createContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import userService, {logout} from '../api/request/userService'
import {useRouter} from 'next/router'

const UserContext = createContext()

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)
  const [totalBookDonation, setTotalBookDonation] = useState(0)
  const router = useRouter()

  useEffect(() => {
    userService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data.data[0])
        setIsAuth(true)
        setTotalBookDonation(res.data.data[0].donationHistory.length)
      })
      .catch(() => {})
  }, [])

  const logoutHandler = () => {
    logout()
    setUser({})
    setIsAuth(false)
    setTotalBookDonation(0)
    if (
      router.pathname.includes('profile') ||
      router.pathname.includes('admin')
    ) {
      router.push('/')
    }
  }

  const context = {
    user,
    setUser,
    isAuth,
    logoutHandler,
    setIsAuth,
    totalBookDonation,
    setTotalBookDonation,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
}

export default UserContext
