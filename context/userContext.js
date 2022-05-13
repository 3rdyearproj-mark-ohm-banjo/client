import {createContext, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'
import userService, {logout} from '../api/request/userService'

const UserContext = createContext()
const cookies = new Cookies()

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({})
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    userService
      .getCurrentUser()
      .then((res) => {
        setUser(res.data.data[0])
        setIsAuth(true)
      })
      .catch(() => {})
  }, [])

  const updateUser = (userData) => {
    setUser(userData)
  }

  const updateIsAuth = (auth) => {
    setIsAuth(true)
  }

  const logoutHandler = () => {
    logout()
    setUser({})
    setIsAuth(false)
  }

  const context = {
    user,
    updateUser,
    isAuth,
    logoutHandler,
    updateIsAuth,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
}

export default UserContext
