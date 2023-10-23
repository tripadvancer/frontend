import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from '@/redux/features/user-slice'
import { apiSliceWithCredentials } from '@/redux/services/api-slice-with-credentials'
import { authAPI } from '@/redux/services/auth-api'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
}

const reducers = combineReducers({
    user: userReducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([apiSliceWithCredentials.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
