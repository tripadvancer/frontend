import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import appReducer from '@/redux/features/app-slice'
import mapReducer from '@/redux/features/map-slice'
import userReducer from '@/redux/features/user-slice'
import widgetReducer from '@/redux/features/widget-slice'
import { api } from '@/redux/services/api'
import { internalAPI } from '@/redux/services/internal/internal.api'

const createNoopStorage = () => {
    return {
        getItem(_key: string) {
            return Promise.resolve(null)
        },
        setItem(_key: string, value: string) {
            return Promise.resolve(value)
        },
        removeItem(_key: string) {
            return Promise.resolve()
        },
    }
}

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local')

const persistConfig = {
    key: 'tripadvancer:store:v5.3',
    storage,
    whitelist: ['map', 'user', 'widget'],
}

const reducers = combineReducers({
    app: appReducer,
    map: mapReducer,
    user: userReducer,
    widget: widgetReducer,
    [api.reducerPath]: api.reducer,
    [internalAPI.reducerPath]: internalAPI.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware, internalAPI.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
