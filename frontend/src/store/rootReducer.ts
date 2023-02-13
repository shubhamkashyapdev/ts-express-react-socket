import { combineReducers } from '@reduxjs/toolkit'
import { socketSliceReducer } from 'src/store/slice/socketSlice'

const rootReducer = combineReducers({
  socket: socketSliceReducer,
})

export default rootReducer
