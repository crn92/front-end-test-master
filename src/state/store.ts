import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import { queueReducer } from 'Queue/state'
import { fetchCustomersData } from 'Queue/state/action-creators'

export const actionCreators = { fetchCustomersData }

const rootReducer = combineReducers({
  queue: queueReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
