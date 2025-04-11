import { useDispatch, useSelector, useStore } from 'react-redux'

import { tasksReducer } from '@/store/slices'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

const rootReducer = combineReducers({
  tasks: tasksReducer,
})

export const makeStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: rootReducer,
  })
}

setupListeners(makeStore().dispatch)

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
