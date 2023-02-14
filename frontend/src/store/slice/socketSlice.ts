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
      return state
    },
    startConnecting: (state) => {
      state.isEstablishingConnection = true
    },
    socketGreet: (state, action) => {
      return state
    },
  },
})

export const { socketConnected, socketConnecting, socketGreet } =
  socketSlice.actions
export const socketActions = socketSlice.actions

export const socketSliceReducer = socketSlice.reducer
