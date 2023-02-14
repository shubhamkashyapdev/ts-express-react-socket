import { Middleware } from 'redux'
import { Socket, io } from 'socket.io-client'
import { socketConnected, socketActions } from 'src/store/slice/socketSlice'
import { socketListeners } from './util'

export const socketMiddleware: Middleware = ({ dispatch, getState }) => {
  let socket: Socket
  return (next) => {
    socket = io('http://localhost:8000', {})
    socket.on('connect', () => {
      dispatch(socketConnected(''))
      console.log('socket connected!!')
    })

    // Register All Listeners Here
    if (socket) {
      for (let listner of socketListeners) {
        if (!socket.hasListeners(listner)) {
          socket.on(listner, (data) => console.log(data))
        }
      }
    }
    return (action) => {
      // Socket
      const isConnected = getState().socket.isConnected && socket

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
      }

      // Socket Ends
      next(action)
    }
  }
}
