import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from 'src/store/middlewares/socketMiddleware'
import rootReducer from 'src/store/rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: [socketMiddleware],
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
