import {useContext, createContext, useState, useEffect} from 'react'
import {io} from 'socket.io-client'

const SocketContext = createContext({})

export const SocketProvider = (props) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(process.env.NEXT_PUBLIC_SERVER_URL))
  }, [])

  useEffect(() => {
    console.log(socket,process.env.NEXT_PUBLIC_SERVER_URL)
  }, [socket])

  return (
    <SocketContext.Provider
      value={{
        socket,
        setSocket: (state) => setSocket(state),
        clearSocket: () => setSocket(null),
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)
