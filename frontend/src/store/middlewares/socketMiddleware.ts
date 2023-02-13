import { Middleware } from 'redux'
import { socketActions } from 'src/store/constants/socketConstants'
import { Socket, io } from 'socket.io-client'
import { socketConnected, socketConnecting } from 'src/store/slice/socketSlice'

export const socketMiddleware: Middleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log({ socketAction: action })
    //@ts-ignore
    let socket: Socket = null
    if (socketActions.includes(action.type)) {
      if (socket !== null) {
        socket?.close()
      }

      socket = io('http://localhost:8000', {
        reconnection: true,
        path: '/ws/socket.io',
      })

      socket.on('connect', () => {
        dispatch(socketConnected(socket))
        console.log('socket connected!!')
      })
      socket.on('disconnect', () => {
        socket.close()
        //@ts-ignore
        socket = null
        console.log('socket disconnected!!')
      })
    }
    const result = next(action)
    return result
  }
