import { Middleware } from 'redux'
import { Socket, io } from 'socket.io-client'
import {
  socketConnected,
  socketConnecting,
  socketGreet,
  socketActions,
} from 'src/store/slice/socketSlice'

export const socketMiddleware: Middleware = ({ dispatch, getState }) => {
  let socket: Socket
  return (next) => (action) => {
    // Socket
    const isConnected = getState().socket.isConnected && socket

    if (socketActions.socketConnecting.match(action)) {
      socket = io('http://localhost:8000', {
        path: '/ws/socket.io',
      })
      socket.on('connect', () => {
        dispatch(socketConnected(''))
        console.log('socket connected!!')
      })
    }

    if (socketActions.socketDisconnected.match(action)) {
      socket.on('disconnect', () => {
        socket.close()
        //@ts-ignore
        socket = null
        console.log('socket disconnected!!')
      })
    }

    if (socketActions.socketGreet.match(action) && isConnected) {
      socket.emit('greet', action.payload)
      if (!socket.hasListeners('greet')) {
        socket.on('greet', (data) => console.log(data))
      }
    }

    // Socket Ends
    next(action)
  }
}
