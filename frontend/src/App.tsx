import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'
import { RootState } from 'src/store/store'
import { useDispatch } from 'react-redux'
import { socketConnecting, socketGreet } from 'src/store/slice/socketSlice'

function App() {
  const dispatch = useDispatch()
  const greet = () => {
    console.log('try to greet')
    dispatch(socketGreet(''))
  }

  useEffect(() => {
    dispatch(socketConnecting(''))
  }, [])

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="h-[200px] w-[200px] shadow-md rounded-sm border border-gray-200 shadow-gray-500 flex justify-center items-center">
        <button
          onClick={greet}
          className="py-2 px-6 bg-gray-300 rounded-sm shadow-md shadow-gray-500"
        >
          Greeting
        </button>
      </div>
    </div>
  )
}

export default App
