import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import appReducer from '@/redux/features/app-slice'
import mapReducer from '@/redux/features/map-slice'
import userReducer from '@/redux/features/user-slice'
import widgetReducer from '@/redux/features/widget-slice'
import { api } from '@/redux/services/api'
import { internalApi } from '@/redux/services/api-internal'

const persistConfig = {
    key: 'tripadvancer:store:v4',
    storage,
    whitelist: ['map', 'user', 'widget'],
}

const reducers = combineReducers({
    app: appReducer,
    map: mapReducer,
    user: userReducer,
    widget: widgetReducer,
    [api.reducerPath]: api.reducer,
    [internalApi.reducerPath]: internalApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }).concat([api.middleware, internalApi.middleware]),
    devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
