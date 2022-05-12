import {createContext, useState} from 'react'
import PropTypes from 'prop-types'

const UserContext = createContext()

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({})

  const updateUser = (userData) => {
    setUser(userData)
  }

  const context = {
    user,
    updateUser,
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

UserContextProvider.propTypes = {
  children: PropTypes.node,
}

export default UserContext
