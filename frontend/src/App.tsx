import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { socketConnected, socketConnecting } from 'src/store/slice/socketSlice'

const socket = io('http://localhost:8000', {
  reconnection: true,
  path: '/ws/socket.io',
})

function App() {
  const dispatch = useDispatch()
  const isConnected = useSelector<RootState>((state) => state.socket)
  console.log(isConnected)
  useEffect(() => {
    socket.on('greet', (data) => {
      console.log(data)
    })
    return () => {
      socket.off('greet')
    }
  }, [])
  useEffect(() => {
    dispatch(socketConnecting())
  }, [])

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="h-[200px] w-[200px] shadow-md rounded-sm border border-gray-200 shadow-gray-500 flex justify-center items-center">
        <button
          onClick={() => socket.emit('greet', 'Hi Server')}
          className="py-2 px-6 bg-gray-300 rounded-sm shadow-md shadow-gray-500"
        >
          Greeting
        </button>
      </div>
    </div>
  )
}

export default App
