import { WSCONNECTED } from 'src/store/constants/socketConstants'
import { Reducer } from 'redux'
import { createSlice, Slice } from '@reduxjs/toolkit'

type InitialState = {
  isConnecting: boolean
  isConnected: boolean
  socket: null
}

const initialState = {
  isConnecting: false,
  isConnected: false,
  socket: null,
}

export const socketSlice: Slice = createSlice({
  name: 'socketSlice',
  initialState,
  reducers: {
    socketConnected: (state, action) => {
      const { payload } = action
      return {
        ...state,
        isConnected: true,
        isConnecting: false,
        socket: payload,
      }
    },
    socketDisconnected: (state, action) => {
      return {
        ...state,
        isConnected: false,
        isConnecting: false,
        socket: null,
      }
    },
    socketConnecting: (state, action) => {
      const { payload } = action
      return { ...state, isConnecting: true, socket: null, isConnected: false }
    },
  },
})

export const { socketConnected, socketConnecting } = socketSlice.actions
export const socketSliceReducer = socketSlice.reducer
