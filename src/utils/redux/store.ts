import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import appReducer from '@/utils/redux/features/app-slice'
import mapReducer from '@/utils/redux/features/map-slice'
import userReducer from '@/utils/redux/features/user-slice'
import widgetReducer from '@/utils/redux/features/widget-slice'
import { api } from '@/utils/redux/services/api'
import { internalAPI } from '@/utils/redux/services/internal/internal.api'

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
